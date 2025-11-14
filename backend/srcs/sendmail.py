from smtplib import SMTP_SSL
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from colorama import Fore

async def sendTheMail(EMAIL_SENDER, EMAIL_TO, APP_PASSWORD,
                      COMMON_MAIL, REPLYTO,
                      MAIL_PORT, MAIL_SERVER,
                      FIRSTNAME, LASTNAME,
                      USER_EMAIL, CVNAME):

    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9fafc; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #0078D7; text-align: center;">📬 New CV Received!</h2>
          <p style="font-size: 16px; color: #333;">
            Hello team,<br><br>
            A new CV has been submitted on the <b>ComingSoon Platform</b> 🎉
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 120px;">Full Name:</td>
              <td style="padding: 8px;">{FIRSTNAME} {LASTNAME}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:{USER_EMAIL}" style="color: #0078D7;">{USER_EMAIL}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Saved As:</td>
              <td style="padding: 8px;"><code>{CVNAME}</code></td>
            </tr>
          </table>
          <p style="font-size: 13px; color: #666; margin-top: 30px; text-align: center;">
            This is an automated message from the ComingSoon platform.<br>
          </p>
        </div>
      </body>
    </html>
    """

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"ComingSoon Platform Update - New Cv Recivied"
        msg["From"] = EMAIL_SENDER
        msg["To"] = EMAIL_TO
        msg["Cc"] = COMMON_MAIL
        msg.add_header("Reply-To", REPLYTO)
        msg.attach(MIMEText(html_content, "html"))
    
        with SMTP_SSL(MAIL_SERVER, MAIL_PORT) as server:
            server.login(EMAIL_SENDER, APP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"{Fore.RED}\t\t!!! {e} !!!")
        raise Exception("Failed To send email")