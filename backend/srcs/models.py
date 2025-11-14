from linkdb import Base
from sqlalchemy import Column, String
class Candidates(Base):
    __tablename__ = "candidates"
    email = Column(String, unique=True, nullable=False, primary_key=True)
    phone = Column(String, nullable=False)
    cv_name = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    firstname = Column(String, nullable=False)
    