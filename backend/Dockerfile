FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN mkdir cvteque

RUN pip install --upgrade pip
RUN pip install colorama
RUN pip install fastapi
RUN pip install uvicorn
RUN pip install dotenv
RUN pip install pydantic[email]
RUN pip install python-multipart
RUN pip install sqlalchemy
RUN pip install psycopg2-binary
RUN pip install fastapi-mail

WORKDIR /work
COPY ./srcs .
COPY ./run .
RUN chmod +x run.sh

CMD [ "./run.sh" ]