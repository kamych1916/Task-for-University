from peewee import *

db = SqliteDatabase('Chempionat.db')

class BaseModel(Model):
    class Meta:
        database = db

class Gorod(BaseModel):
    Nazvanie = CharField(unique=True)

class Sudiya(BaseModel):
    Name = CharField()
    NameGorodSud = ForeignKeyField(Gorod, field='Nazvanie')

class Komanda(BaseModel):
    Naimenovanie = CharField(unique=True)
    NameGorodKom = ForeignKeyField(Gorod, field='Nazvanie')


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

# Функции для работы с таблицей Городов
def input_Gorod():
    for g in goroda:
        Gorod.create(Nazvanie=g['NameGorod'])

def delete_Gorod(NameGorod):
    Gorod.delete().where(Gorod.Nazvanie == NameGorod).execute()




# Функции для работы с таблицей Судей
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





# Функции для работы с таблицей Команд
def input_Komanda():
    for k in komandi:
        Komanda.create(Naimenovanie=k['NamimenKom'], NameGorodKom=k['NGK'])

def delete_Komanda(NameKomanda):
    Komanda.delete().where(Komanda.Naimenovanie == NameKomanda).execute()


db.connect()
db.create_tables([Gorod, Sudiya, Komanda], safe=True)

# delete_Sudiya('')
# delete_Gorod('')
# delete_Komanda('')

# input_Gorod()
# input_Sudiya()
# input_Komanda()
