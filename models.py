from peewee import *

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


# Функция для работы с таблицей Городов
def input_Gorod(kek):
    Gorod.create(Nazvanie=kek)

def delete_Gorod(NameGorod):
    Gorod.delete().where(Gorod.Nazvanie == NameGorod).execute()


# Функция для работы с таблицей Судей
def input_Sudiya(NameSudiya):
    Sudiya.create(Name= NameSudiya, NameGorodSud=NameSudiya)

def delete_Sudiya(NameSudiya):
    Sudiya.delete().where(Sudiya.Name == NameSudiya).execute()


# Функция для работы с таблицей Команд
def input_Komanda(NameKomanda):
     Komanda.create(Naimenovanie= NameKomanda, NameGorodKom=NameKomanda)

def delete_Komanda(NameKomanda):
    Komanda.delete().where(Komanda.Naimenovanie == NameKomanda).execute()


# Функция для работы с таблицей Городов
def input_Admin(NameAdmin, PassAdmin):
    Admin.create(Login=NameAdmin, Password=PassAdmin)

def delete_Admin(NameAdmin):
    Admin.delete().where(Admin.Login == NameAdmin).execute()


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
        DateMatch='22-08-2019',
        ResultHozMatch=0,
        ResultGosMatch=0,
        StatusMatch='Не Завершен, Исключен Судья Матча, Возможна Замена Судьи'
    )


db.create_tables([Gorod, Sudiya, Komanda, Match, Admin], safe=True)

# delete_Sudiya('')
# delete_Gorod('')
# delete_Komanda('')

# Match.delete().where(Match.id == 8).execute()


# kek = Match.select().group_by(Match).having(Match.StatusMatch == 'Завершен')
# print(kek)

# kik = Match.select().group_by(Match.NameKomandaHozMatch)
# print(kik)


# for i in kik:
#     print(i)

# response = []
# for k in Match.select().group_by(Match.NameKomandaHozMatch):
#     komHoz = str(k.NameKomandaHozMatch.Naimenovanie)
#
#     response.append(komHoz)
#
# print(response)


#
# selectWinTeam = Match.select().group_by(Match).having(Match.StatusMatch == 'Завершен')
# winTeam = []
# for i in selectWinTeam:
#     winTeam.append(i.NameKomandaHozMatch.Naimenovanie)
# print(winTeam)
#
# groupTeam = Match.select().group_by(Match.NameKomandaHozMatch)
#
# j = 0
# response = []
# response2 = [0]*groupTeam.count()
# for k in groupTeam:
#     komHoz = str(k.NameKomandaHozMatch.Naimenovanie)
#     print(komHoz)
#     response.append(komHoz)
#     for i in range(len(winTeam)):
#         if winTeam[i] == komHoz:
#             response2[j]+=1
#     j+=1
#
# print(response2)



# lol= []
# for i in kek:
#     lol.append(i.NameKomandaHozMatch.Naimenovanie)
# print(lol)
#
# for k in lol:
#     print(k)
#
# result = {i: lol.count(i) for i in lol}
#
# print(list(result.values()))



# test2 = []
# test = Match.select().where(Match.NameKomandaHozMatch == lol[1])
# print(str(lol[1]))
# for i in test:
#     test1 = Match.select().where(Match.NameKomandaHozMatch == lol[1]).count()
#     test2.append(test1.NameKomandaHozMatch.Naimenovanie)
#     print(test2)

# input_Match()
# input_Gorod()
# input_Sudiya()
# input_Komanda()
# input_Admin()

