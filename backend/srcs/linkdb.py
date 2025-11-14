from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import dotenv, os
from colorama import Fore

dotenv.load_dotenv()

POSTGRES_PASSWORD=os.getenv('POSTGRES_PASSWORD')
POSTGRES_USER=os.getenv('POSTGRES_USER')
POSTGRES_DB=os.getenv('POSTGRES_DB')
POSTGRES_HOST=os.getenv('POSTGRES_HOST')
POSTGRES_PORT=os.getenv('POSTGRES_PORT')
DB_TYPE=os.getenv('DB_TYPE')

databaseUrl = f"{DB_TYPE}://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
# print(Fore.BLUE + f"DB-URL: {databaseUrl}")

engine = create_engine(databaseUrl)
localSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()