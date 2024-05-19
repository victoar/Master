from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class HomePage(Base):
    __tablename__ = 'home_page'


class PersonalInfoPage(Base):
    __tablename__ = 'personal_info_page'


class HobbiesPage(Base):
    __tablename__ = 'hobbies_page'