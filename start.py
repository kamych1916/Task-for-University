from flask import Flask, render_template, request, jsonify
import json
from models import *


app = Flask(__name__)


@app.route('/')
def start_page():
    return render_template('index.html')


@app.route("/sign_in", methods=["POST"])
def sign_in():
    data = request.get_json()
    print(data)
    if Admin.select().where(Admin.Login == data["username"] and Admin.Password == data["password"]).count() > 0:
        return json.dumps({"code": "0"})
    else:
        return json.dumps({"code": "1"})

#------
# ТАБЛИЦА КОМАНДА
#------
@app.route("/initializeTableKomanda", methods=["GET"])
def initializeTableKomanda():
    response = []
    for k in Komanda.select():
        tmp = {
            'id': k.id,
            'NameTeam': str(k.Naimenovanie),
            'NameGorod': str(k.NameGorodKom.Nazvanie),
        }

        response.append(tmp)
    return json.dumps({"meth": response})

@app.route("/initializeGorodKomanda", methods=["GET"])
def initializeGorodKomanda():
    response = []
    for g in Gorod.select():
        gor = str(g.Nazvanie)

        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/add_comanda", methods=["POST"])
def add_komanda():
    data = request.get_json()

    Komanda.create(id=data['s_id'], Naimenovanie=data['s_NameTeam'], NameGorodKom=data['s_NameGorod'])
    return json.dumps('lol')

@app.route("/edit_comanda", methods=["POST"])
def edit_komanda():
    data = request.get_json()

    Komanda.update(Naimenovanie = data['s_NameTeam']).where(Komanda.id == data['s_id']).execute()
    return json.dumps('lol')

@app.route("/delete_comanda", methods=["POST"])
def delete_komanda():
    data = request.get_json()

    Komanda.delete().where(Komanda.id == data['s_id']).execute()
    return json.dumps('lol')
#------
# /ТАБЛИЦА КОМАНДА
#------




#------
# ТАБЛИЦА СУДЬЯ
#------
@app.route("/initializeTableSudia", methods=["GET"])
def initializeTableSudia():
    response = []
    for k in Sudiya.select():
        tmp = {
            'id': k.id,
            'NameReferee': str(k.Name),
            'NameGorod': str(k.NameGorodSud.Nazvanie),
        }

        response.append(tmp)
    return json.dumps({"meth": response})
#
@app.route("/initializeGorodSudia", methods=["GET"])
def initializeGorodSudia():
    response = []
    for g in Gorod.select():
        gor = str(g.Nazvanie)

        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/add_sudia", methods=["POST"])
def add_sudia():
    data = request.get_json()

    Sudiya.create(id=data['s_id'], Name=data['s_NameReferee'], NameGorodSud=data['s_NameGorod'])
    return json.dumps('lol')

@app.route("/edit_sudia", methods=["POST"])
def edit_sudia():
    data = request.get_json()
    Sudiya.update(Name = data['s_NameReferee']).where(Sudiya.id == data['s_id']).execute()
    return json.dumps('lol')

@app.route("/delete_sudia", methods=["POST"])
def delete_sudia():
    data = request.get_json()
    Sudiya.delete().where(Sudiya.id == data['s_id']).execute()
    return json.dumps('lol')
#------
# /ТАБЛИЦА СУДЬЯ
#------



#------
# ТАБЛИЦА ГОРОД
#------
@app.route("/initializeTableGorod", methods=["GET"])
def initializeTableGorod():
    response = []
    for k in Gorod.select():
        tmp = {
            'id': k.id,
            'NameGorod': str(k.Nazvanie),
        }

        response.append(tmp)
    return json.dumps({"meth": response})

@app.route("/add_gorod", methods=["POST"])
def add_gorod():
    data = request.get_json()

    Gorod.create(id=data['g_id'], Nazvanie=data['g_NameGorod'])
    return json.dumps('lol')

@app.route("/edit_gorod", methods=["POST"])
def edit_gorod():
    data = request.get_json()

    Gorod.update(Nazvanie = data['g_NameGorod']).where(Gorod.id == data['g_id']).execute()
    return json.dumps('lol')

@app.route("/delete_gorod", methods=["POST"])
def delete_gorod():
    data = request.get_json()

    Gorod.delete().where(Gorod.id == data['g_id']).execute()
    return json.dumps('lol')
#------
# /ТАБЛИЦА ГОРОД
#------




#------
# ТАБЛИЦА МАТЧ
#------
@app.route("/initializeTableMatch", methods=["GET"])
def initializeTableMatch():
    response = []
    for k in Match.select():
        tmp = {
            'id': k.id,
            'NameGorod': str(k.NameGorodMatch.Nazvanie),
            'Hoz': str(k.NameKomandaHozMatch.Naimenovanie),
            'Gos': str(k.NameKomandaGosMatch.Naimenovanie),
            'Sud': str(k.NameSudiaMatch.Name),
            'Dat': str(k.DateMatch),
            'RezH': str(k.ResultHozMatch),
            'RezG': str(k.ResultGosMatch),
            'Stat': str(k.StatusMatch),
        }
        response.append(tmp)
    return json.dumps({"meth": response})

@app.route("/initializeGorodMatch", methods=["GET"])
def initializeGorodMatch():

    response = []
    for g in Gorod.select():
        gor = str(g.Nazvanie)
        response.append(gor)
    return json.dumps({"meth": response})


@app.route("/initializeHozMatch", methods=["GET"])
def initializeHozMatch():
    response = []
    for g in Komanda.select():
        gor = str(g.Naimenovanie)
        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/initializeGosMatch", methods=["GET"])
def initializeGozMatch():
    response = []
    for g in Komanda.select():
        gor = str(g.Naimenovanie)
        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/initializeSudMatch", methods=["GET"])
def initializeSudMatch():
    response = []
    for g in Sudiya.select():
        gor = str(g.Name)
        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/delete_match", methods=["POST"])
def delete_match():
    data = request.get_json()
    Match.delete().where(Match.id == data['m_id']).execute()
    return json.dumps('lol')

@app.route("/edit_match", methods=["POST"])
def edit_match():
    data = request.get_json()
    print(data)
    Match.update(NameSudiaMatch = data['m_NameReferee']).where(Match.id == data['m_id']).execute()
    Match.update(ResultHozMatch = data['m_RezH']).where(Match.id == data['m_id']).execute()
    Match.update(ResultGosMatch = data['m_RezG']).where(Match.id == data['m_id']).execute()
    return json.dumps('lol')
#
@app.route("/add_match", methods=["POST"])
def add_match():
    data = request.get_json()
    print(data)
    Match.create(  id=data['m_id'],
                    NameGorodMatch = data['m_Gorod'],
                    NameKomandaHozMatch = data['m_Hoz'],
                    NameKomandaGosMatch = data['m_Gos'],
                    NameSudiaMatch = data['m_NameReferee'],
                    DateMatch = data['m_Dat'],
                    ResultHozMatch = data['m_RezH'],
                    ResultGosMatch = data['m_RezG'],
                    StatusMatch = data['m_Stat']
    )
    return json.dumps('lol')

@app.route("/exclusion_match", methods=["POST"])
def exclusion_match():
    data = request.get_json()
    print(data)
    if Match.select().where(Match.NameKomandaHozMatch == data['m_Hoz']).count() > 0:
        Test = Match.select().where(Match.id == data['m_id']).get()
        if Test.StatusMatch == 'Не завершен':
            print('lol')
            Match.update(ResultHozMatch='0').where(Match.id == data['m_id']).execute()
            Match.update(ResultGosMatch='10').where(Match.id == data['m_id']).execute()
            Match.update(StatusMatch='Завершен').where(Match.id == data['m_id']).execute()
        else:
            Match.update(ResultHozMatch='0').where(Match.id == data['m_id']).execute()
            print('kek')
    else:
        pass
    if Match.select().where(Match.NameKomandaGosMatch == data['m_Gos']).count() > 0:
        Test = Match.select().where(Match.id == data['m_id']).get()
        if Test.StatusMatch == 'Не завершен':
            print('lol')
            Match.update(ResultGosMatch='0').where(Match.id == data['m_id']).execute()
            Match.update(ResultHozMatch='10').where(Match.id == data['m_id']).execute()
            Match.update(StatusMatch='Завершен').where(Match.id == data['m_id']).execute()
        else:
            Match.update(ResultGosMatch='0').where(Match.id == data['m_id']).execute()
            print('kek')
    else:
        pass

    if Match.select().where(Match.NameSudiaMatch == data['m_NameReferee']).count() > 0:
        Match.update(NameSudiaMatch=None).where(Match.id == data['m_id']).execute()
    else:
        pass
    return json.dumps('lol')

#------
# /ТАБЛИЦА МАТЧ
#------


#------
# ТАБЛИЦА СТАТУС
#------
@app.route("/initializeDate", methods=["GET"])
def initializeDate():
    response = []
    for g in Match.select():
        gor = str(g.DateMatch)
        response.append(gor)
    return json.dumps({"meth": response})

@app.route("/initializeTableMatchStatKomanda", methods=["POST"])
def initializeTableMatchStatKomanda():
    data = request.get_json()
    if Match.select().where(Match.NameKomandaHozMatch == data["m_nameTeame"]).count() or Match.select().where(Match.NameKomandaGosMatch == data["m_nameTeame"]).count() > 0:
        response = []
        for k in Match.select().where(Match.NameKomandaHozMatch == data["m_nameTeame"]) or Match.select().where(Match.NameKomandaGosMatch == data["m_nameTeame"]):
            tmp = {
                'id': k.id,
                'NameGorod': str(k.NameGorodMatch.Nazvanie),
                'Hoz': str(k.NameKomandaHozMatch.Naimenovanie),
                'Gos': str(k.NameKomandaGosMatch.Naimenovanie),
                'Sud': str(k.NameSudiaMatch.Name),
                'Dat': str(k.DateMatch),
                'RezH': str(k.ResultHozMatch),
                'RezG': str(k.ResultGosMatch),
                'Stat': str(k.StatusMatch),
            }
            response.append(tmp)
        return json.dumps({"meth": response})
    else:
        return json.dumps({"code": "1"})

@app.route("/initializeTableMatchStatGorod", methods=["POST"])
def initializeTableMatchStatGorod():
    data = request.get_json()
    if Match.select().where(Match.NameGorodMatch == data["m_nameGorod"]).count() > 0:
        response = []
        for k in Match.select().where(Match.NameGorodMatch == data["m_nameGorod"]):
            tmp = {
                'id': k.id,
                'NameGorod': str(k.NameGorodMatch.Nazvanie),
                'Hoz': str(k.NameKomandaHozMatch.Naimenovanie),
                'Gos': str(k.NameKomandaGosMatch.Naimenovanie),
                'Sud': str(k.NameSudiaMatch.Name),
                'Dat': str(k.DateMatch),
                'RezH': str(k.ResultHozMatch),
                'RezG': str(k.ResultGosMatch),
                'Stat': str(k.StatusMatch),
            }
            response.append(tmp)
        return json.dumps({"meth": response})
    else:
        return json.dumps({"code": "1"})

@app.route("/initializeTableMatchStatSud", methods=["POST"])
def initializeTableMatchStatSud():
    data = request.get_json()
    if Match.select().where(Match.NameSudiaMatch == data["m_nameSud"]).count() > 0:
        response = []
        for k in Match.select().where(Match.NameSudiaMatch == data["m_nameSud"]):
            tmp = {
                'id': k.id,
                'NameGorod': str(k.NameGorodMatch.Nazvanie),
                'Hoz': str(k.NameKomandaHozMatch.Naimenovanie),
                'Gos': str(k.NameKomandaGosMatch.Naimenovanie),
                'Sud': str(k.NameSudiaMatch.Name),
                'Dat': str(k.DateMatch),
                'RezH': str(k.ResultHozMatch),
                'RezG': str(k.ResultGosMatch),
                'Stat': str(k.StatusMatch),
            }
            response.append(tmp)
        return json.dumps({"meth": response})
    else:
        return json.dumps({"code": "1"})

@app.route("/initializeTableMatchStatDate", methods=["POST"])
def initializeTableMatchStatDate():
    data = request.get_json()
    if Match.select().where(Match.DateMatch == data["m_nameDate"]).count() > 0:
        response = []
        for k in Match.select().where(Match.DateMatch == data["m_nameDate"]):
            tmp = {
                'id': k.id,
                'NameGorod': str(k.NameGorodMatch.Nazvanie),
                'Hoz': str(k.NameKomandaHozMatch.Naimenovanie),
                'Gos': str(k.NameKomandaGosMatch.Naimenovanie),
                'Sud': str(k.NameSudiaMatch.Name),
                'Dat': str(k.DateMatch),
                'RezH': str(k.ResultHozMatch),
                'RezG': str(k.ResultGosMatch),
                'Stat': str(k.StatusMatch),
            }
            response.append(tmp)
        return json.dumps({"meth": response})
    else:
        return json.dumps({"code": "1"})


# @app.route("/sign_in", methods=["POST"])
# def sign_in():
#     data = request.get_json()
#     print(data)
#     if Admin.select().where(Admin.Login == data["username"] and Admin.Password == data["password"]).count() > 0:
#         return json.dumps({"code": "0"})
#     else:
#         return json.dumps({"code": "1"})

#------
# /ТАБЛИЦА СТАТУС
#------


if __name__ == '__main__':
    app.run(debug=True)