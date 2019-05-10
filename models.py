from peewee import *
import json

db = SqliteDatabase('Chempionat.db')
db.connect()

class BaseModel(Model):
    class Meta:
        database = db

class Gorod(BaseModel):
    Nazvanie = CharField(unique=True, null=True)

class Sudiya(BaseModel):
    Name = CharField(null=True)
    NameGorodSud = ForeignKeyField(Gorod, field='Nazvanie')

class Komanda(BaseModel):
    Naimenovanie = CharField(unique=True)
    NameGorodKom = ForeignKeyField(Gorod, field='Nazvanie')

class Match(BaseModel):
    NameGorodMatch = ForeignKeyField(Gorod, field='Nazvanie')
    NameKomandaHozMatch = ForeignKeyField(Komanda, field='Naimenovanie')
    NameKomandaGosMatch = ForeignKeyField(Komanda, field='Naimenovanie')
    NameSudiaMatch = ForeignKeyField(Sudiya, null=True, field='Name')
    DateMatch = DateField(formats=['%d-%b-%Y'])
    ResultHozMatch = IntegerField()
    ResultGosMatch = IntegerField()
    StatusMatch = CharField()

class Admin(BaseModel):
    Login = CharField(unique=True)
    Password = CharField()


goroda = [
    {
      'NameGorod': 'Москва'
    },
    {
      'NameGorod': 'Питер'
    },
    {
      'NameGorod': 'Ярославль'
    },
    {
      'NameGorod': 'Казань'
    }
]

sudii = [
    {
      'NameSudiya': 'Игорь',
      'NGS': 'Казань'
    },
    {
      'NameSudiya': 'Виктор',
      'NGS': 'Москва'
    }
]

komandi = [
    {
      'NamimenKom': 'ЦСКА',
      'NGK': 'Москва'
    },
    {
      'NamimenKom': 'УНИКС',
      'NGK': 'Питер'
    },
    {
      'NamimenKom': 'АЛЬБА',
      'NGK': 'Казань'
    },
    {
      'NamimenKom': 'Валенсия',
      'NGK': 'Ярославль'
    }
]

admins = [
    {
      'LoginAdmin': 'Kamol',
      'PasswordAdmin': 'qwerty'
    }

]




# Функция для работы с таблицей Городов
def input_Gorod():
    for g in goroda:
        Gorod.create(Nazvanie=g['NameGorod'])

def delete_Gorod(NameGorod):
    Gorod.delete().where(Gorod.Nazvanie == NameGorod).execute()



# Функция для работы с таблицей Судей
def input_Sudiya():
    # for g in Gorod.select():
    #     for s in sudii:
    #         if g.Nazvanie == s['NGS']:
    #             print(s)
    #             Sudiya.create(Name=s['NameSudiya'], NameGorodSud=s['NGS'])
    #         else:
    #             print('error Gorod')
    for s in sudii:
        Sudiya.create(Name=s['NameSudiya'], NameGorodSud=s['NGS'])

def delete_Sudiya(NameSudiya):
    Sudiya.delete().where(Sudiya.Name == NameSudiya).execute()



# Функция для работы с таблицей Команд
def input_Komanda():
    for k in komandi:
        Komanda.create(Naimenovanie=k['NamimenKom'], NameGorodKom=k['NGK'])

def delete_Komanda(NameKomanda):
    Komanda.delete().where(Komanda.Naimenovanie == NameKomanda).execute()



# Функция для работы с таблицей Городов
def input_Admin():
    for a in admins:
        Admin.create(Login=a['LoginAdmin'], Password=a['PasswordAdmin'])

def delete_Admin(NameAdmin):
    Admin.delete().where(Admin.Login == NameAdmin).execute()


# for k in Match.select():
#     print(k.DateMatch)


# Функция для работы с таблицей Команд
def input_Match():
    # Match.create(
    #     NameGorodMatch='Москва',
    #     NameKomandaHozMatch='ЦСКА',
    #     NameKomandaGosMatch='АЛЬБА',
    #     NameSudiaMatch='Игорь',
    #     DateMatch='21-03-2019',
    #     ResultHozMatch='90',
    #     ResultGosMatch='87',
    #     StatusMatch='Завершен'
    # )
    Match.create(
        NameGorodMatch='Питер',
        NameKomandaHozMatch='УНИКС',
        NameKomandaGosMatch='Валенсия',
        NameSudiaMatch='Сергей',
        DateMatch='29-04.2019',
        ResultHozMatch=0,
        ResultGosMatch=0,
        StatusMatch='Не завершен'
    )

# def delete_Match(NameMatch):
#     Komanda.delete().where(Komanda.Naimenovanie == NameKomanda).execute()


    # NameGorodMatch = ForeignKeyField(Gorod, field='Nazvanie')
    # NameKomandaMatch = ForeignKeyField(Komanda, field='Naimenovanie')
    # NameSudiaMatch = ForeignKeyField(Sudiya, field='Name')
    # ResultHozMatch = IntegerField()
    # ResultGosMatch = IntegerField()
    # StatusMatch = CharField()

db.create_tables([Gorod, Sudiya, Komanda, Match, Admin], safe=True)

# delete_Sudiya('')
# delete_Gorod('')
# delete_Komanda('')

# LOL = Match.select().where(Match.id == 2).get()
#
# if LOL.StatusMatch == 'Завершен':
#     Match.update(StatusMatch='Не завершен').where(Match.id == 2).execute()


# Komanda.update(Naimenovanie='ЦСКА').where(Komanda.id == 1).execute()
#
# input_Match()
# input_Gorod()
# input_Sudiya()
# input_Komanda()
# input_Admin()

