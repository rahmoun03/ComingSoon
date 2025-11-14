from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Depends
from pydantic import EmailStr
from datetime import datetime
from sqlalchemy.orm import Session
from colorama import Fore
from models import Candidates
from linkdb import localSession, Base, engine
import string, random, shutil, dotenv, os
from sendmail import sendTheMail

dotenv.load_dotenv()
UPLOAD_PATH=os.getenv('UPLOAD_PATH')
EMAIL_SENDER=os.getenv('EMAIL_SENDER')
EMAIL_TO=os.getenv('EMAIL_TO')
COMMON_MAIL=os.getenv('COMMON_MAIL')
REPLYTO=os.getenv('REPLYTO')
MAIL_PORT=os.getenv('MAIL_PORT')
MAIL_SERVER=os.getenv('MAIL_SERVER')
APP_PASSWORD=os.getenv('APP_PASSWORD')

app = FastAPI(root_path='/api/candidate')
cvType:list = ["application/pdf", "application/msword", 
                               "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

Base.metadata.create_all(bind=engine)

def get_db():
    db = localSession()
    try:
        yield db
    finally:
        db.close()

@app.get('/health')
async def serverHealth():
    print(Fore.GREEN + "\t\t>> Server is active")
    return {'Status': 'Active', 'Date': datetime.now()}

@app.post('/upload-cv')
async def uploadCandidateCv(email:EmailStr=Form(...),
                            firstname:str=Form(...),
                            lastname:str=Form(...),
                            phone:str=Form(...),
                            cv:UploadFile=File(...),
                            database:Session = Depends(get_db)):
    print(Fore.MAGENTA + "\t\t>>> Start Uploading...")
    if len(firstname) == 0:
        return HTTPException(status_code=400, detail="Firstname may not be blank")
    if len(lastname) == 0:
        return HTTPException(status_code=400, detail="Lastname may not be blank")
    if len(phone) == 0:
        return HTTPException(status_code=400, detail="Phone may not be blank")
    if phone[0] != '+' and not phone[0].isdigit():
        return HTTPException(status_code=400, detail="Invalid phone number")
    if not phone[1:].isdigit():
        return HTTPException(status_code=400, detail="Invalid phone number")
    if cv.content_type not in cvType:
        return HTTPException(status_code=400, detail="CV must be pdf or word document")
    try:
        print(Fore.GREEN + "\t\t-- DATA IS FINE --")
        print(Fore.MAGENTA + "\t\t>>> Save Information Into Database...")
        cv_name = cv.filename + firstname + lastname + ''.join(random.choices(string.digits, k=8))
        newCandidate = Candidates(firstname=firstname, lastname=lastname, email=email, phone=phone, cv_name=cv_name)
        database.add(newCandidate)
        database.commit()
        database.refresh(newCandidate)
        print(Fore.GREEN + "\t\t-- DATA SAVED --")
        print(Fore.MAGENTA + "\t\t>>> Save CV on server...")
        with open(UPLOAD_PATH+cv_name, "wb") as buffer:
            shutil.copyfileobj(cv.file, buffer)
        print(Fore.GREEN + "\t\t-- CV FILE SAVED --")
        collected:dict = {'status': "Successful", 'data': {'fullname': f"{firstname} {lastname}",
                                                            'phone': phone,
                                                            'email': email}
                        }
        try:
            await sendTheMail(EMAIL_SENDER, EMAIL_TO, APP_PASSWORD,
                      COMMON_MAIL, REPLYTO,
                      MAIL_PORT, MAIL_SERVER,
                      firstname, lastname,
                      email, cv_name)
        except Exception as e:
            print(f"{Fore.RED}\t\t!!! Warn: Saved But No Notification Sended.")
        return collected
    except Exception as e:
        print(f"{Fore.RED}\t\t!!! Error: {e}")
        return HTTPException(status_code=400,
                             detail="Email Invalid or already exist")
    