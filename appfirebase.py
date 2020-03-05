import requests
import os, sys
from random import randint
import uuid
import time
from time import mktime, strptime
import email.utils
from datetime import datetime
#import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
# Import the Firebase service
from firebase_admin import auth
from appbase import app
from flask import Flask, request, render_template, \
    json, jsonify, redirect, url_for
from werkzeug import secure_filename
from mailhtml import *

################################################################
########################## firebase ############################
################################################################
url = ""
cred = credentials.Certificate("secure/automatons-c6871-firebase-adminsdk-50b1p-810a407871.json")
# firebase_admin.initialize_app(cred)
config = '[DEFAULT]';
default_app = firebase_admin.initialize_app(cred, name=config)
print("--- default_app firebase ---")
print(default_app.name)
print("--- default_app firebase end ---")

print("--- default_app firebase db ---")
db = firestore.client()
print(db)
print("--- default_app firebase db end ---")
################################################################
########################## firebase end ########################
################################################################


################################################################
########################## firebase info #######################
################################################################
@app.route('/get_storage_link', methods=['GET', 'POST', 'PUT', 'DELETE'])
def get_storage_link():
    print("see data in https://console.cloud.google.com/firestore/data?project=automatons-c6871")
    return("https://console.cloud.google.com/firestore/data?project=automatons-c6871")
################################################################
########################## firebase info end ###################
################################################################


################################################################
########################## firebase test #######################
################################################################
@app.route('/db/collection/test', methods=['GET', 'POST', 'PUT', 'DELETE'])
def db_collection_test():
    print("--- default_app firebase db users_ref ---")
    test_ref = db.collection(u'test')
    print(test_ref)
    print(test_ref.__dict__)
    docs = test_ref.stream()
    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))
    print("--- default_app firebase db test_ref end ---")
    return test_ref
################################################################
########################## firebase test end ###################
################################################################



################################################################
########################## firebase auth user ##################
################################################################
def on_snapshot(col_snapshot, changes, read_time):
    print(u'Callback received query snapshot.')
    print(u'Current cities in California:')
    for doc in col_snapshot:
        print(u'{}'.format(doc.id))

@app.route('/checkuser', methods=['GET','POST'])
def check_user():
    try:

        _request = request.get_json(force=True)
        register2 = {
        	"status": 401,
        	"message": "Unauthorized",
        	"token":""
        }
        user =  _request.get("user")
        pwd =  _request.get("pwd")
        register2.update({"_request": _request})

        if len(user) > 0 and len(pwd) > 0:
            #user = auth.get_user_by_phone_number(phone)

            print("--- default_app firebase db users_ref checkuser ---")
            docs = db.collection(u'users') \
            .where(u'status', u'==', 1).where(u'user', u'==', user) \
            .where(u'pwd', u'==', pwd).stream()

            print("docs >>")
            print(docs)
            docuser = {}
            for doc in docs:
                docuser = doc.to_dict()
                print(u'{} => {}'.format(doc.id, doc.to_dict()))
            register2 = check_email2(docuser)
            print("--- default_app firebase db test_ref checkuser end ---")
            # return test_ref
        return register2

    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        #return "<p>Error: %s</p>" % str(e)
        return {
        	"status": 401,
        	"message": "Unauthorized",
        	"debugger": str(e),
        	"token":""
        }

@app.route('/checkemail', methods=['GET','POST'])
def check_email():
    try:

        _request = request.get_json(force=True)
        register2 = {
        	"status": 401,
        	"message": "Unauthorized",
        	"token":""
        }
        email =  _request.get("email")
        register2.update({"_request": _request})

        if email.find("@") > -1:
            #user = auth.get_user_by_phone_number(phone)
            user = auth.get_user_by_email(email)
            register2.update({"disabled": user.disabled})
            if ( user.disabled ):
                return register2

            custom_token = auth.create_custom_token(user.uid)
            # b = custom_token.decode()
            b = "wait..."
            #register2.update({"UserRecord": user.__dict__})
            register2.update({"token": '{}'.format(b)})
            register2.update({"status": 200})
            register2.update({"message": 'You has login successful!'})

        return register2

    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        #return "<p>Error: %s</p>" % str(e)
        return {
        	"status": 401,
        	"message": "Unauthorized",
        	"debugger": str(e),
        	"token":""
        }

def check_email2(data):
    try:
        _request = data
        register2 = {
        	"status": 401,
        	"message": "Unauthorized",
        	"token":""
        }
        email =  _request.get("email")
        _request.update({"pwd": "********"})
        register2.update({"_request": _request})

        if email.find("@") > -1:
            #user = auth.get_user_by_phone_number(phone)
            user = auth.get_user_by_email(email)
            register2.update({"disabled": user.disabled})
            if ( user.disabled ):
                return register2

            custom_token = auth.create_custom_token(user.uid)
            b = custom_token.decode()
            #register2.update({"UserRecord": user.__dict__})
            register2.update({"token": '{}'.format(b)})
            register2.update({"status": 200})
            register2.update({"message": 'You has login successful!'})

        return register2

    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        #return "<p>Error: %s</p>" % str(e)
        return {
        	"status": 401,
        	"message": "Unauthorized",
        	"debugger": str(e),
        	"token":""
        }



@app.route('/delete_user', methods=['GET', 'POST', 'PUT', 'DELETE'])
def delete_user():
    try:
        # user = auth.get_user_by_phone_number(phone)
        user = auth.get_user_by_email('dennisserocuts@gmail.com')
        auth.delete_user(user.uid)
        print('Successfully deleted user')
        return 'Successfully deleted user'
    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        return "<p>Error: %s</p>" % str(e)


@app.route('/create_user', methods=['GET', 'POST', 'PUT', 'DELETE'])
def create_user():
    try:
        # user = auth.get_user_by_phone_number(phone)
        # user = auth.get_user_by_email('dennisserocuts@gmail.com')
        # auth.delete_user(user.uid)
        # print('Successfully deleted user')
        user = auth.create_user(
            email='dennisserocuts@gmail.com',
            email_verified=False,
            phone_number='+573007330703',
            password='secretPassword',
            display_name='Dennisse Rocuts',
            photo_url='https://scontent.fbog4-1.fna.fbcdn.net/v/t1.0-1/c0.0.375.375a/69002801_2703142469906222_702382235575123968_n.jpg?_nc_cat=108&_nc_eui2=AeFhOyy9gQkIqR3g03x8Qn6dAQfurdZmjAciNRzgZ7PSWRGzDJqXHJOv4io2LUn-zRXnYINoa3q-2xm-OHqs_t_5weuay0T3SFu7ddIEhypEnA&_nc_ohc=ZMoXMPwdhBsAQm6spB3mC6SV8-NCy62nJKLH6rPQyHh6H0xP3ReycWB3Q&_nc_ht=scontent.fbog4-1.fna&oh=03c6cc68ba8baced10e573aebb51e921&oe=5E780E99',
            disabled=False)
        print('Sucessfully created new user: {0}'.format(user.uid))
        return user.__dict__["_data"]
    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        return "<p>Error: %s</p>" % str(e)


@app.route('/update_user', methods=['GET', 'POST', 'PUT', 'DELETE'])
def update_user():
    try:
        # auth.delete_user(uid)
        # print('Successfully deleted user')
        # user = auth.get_user_by_phone_number(phone)
        # user = auth.get_user_by_email(email)
        # user = auth.get_user_by_phone_number("+573227309677")
        user = auth.get_user_by_email('dennisserocuts@gmail.com')
        user = auth.update_user(
            uid=user.uid,
            email_verified=False,
            phone_number='+573007330704',
            disabled=False)
        print('Sucessfully update new user: {0}'.format(user.uid))
        return user.__dict__["_data"]
    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        return "<p>Error: %s</p>" % str(e)


@app.route('/list_users', methods=['GET', 'POST', 'PUT', 'DELETE'])
def list_users():
    try:
        # Start listing users from the beginning, 1000 at a time.
        # page = auth.list_users()
        # while page:
            # for user in page.users:
                # print('User: ' + user.uid)
            # Get next batch of users.
            # page = page.get_next_page()

        # Iterate through all users. This will still retrieve users in batches,
        # buffering no more than 1000 users in memory at a time.
        users = {}
        for user in auth.list_users().iterate_all():
            print('User: ' + user.uid)
            #print(user.__dict__)
            print(user.__dict__["_data"].items())
            users[user.uid] = user.__dict__["_data"]
        return users
    except Exception as e:
        print("--- exception ---")
        print("<p>Error: %s</p>" % str(e) )
        print("--- exception end ---")
        return "<p>Error: %s</p>" % str(e)


@app.route('/auth2', methods=['GET', 'POST', 'PUT', 'DELETE'])
def auth2():
    try:
        # data = request.get_json(force=True)
        user = auth.get_user_by_email('dennisserocuts@gmail.com')
        response = {
            "status":"success",
            "token":user.uid
        }
        print("----- auth -----")
        print(user.uid)
        print("----- auth end -----")
        #subcredential = firebase.auth.EmailAuthProvider.credential('dennisserocuts@gmail.com', 'secretPassword');
        #print(subcredential)
        return response
    except Exception as e:
        response = {
            "status":"fail",
            "token":""
        }
        return response
################################################################
########################## firebase auth user end ##############
################################################################

def forecast_diff(forecast_date, forecast_time):
    forecast = forecast_date[:16] + forecast_time[16:]
    forecastts = mktime(email.utils.parsedate(forecast))
    forecastdtiso = datetime.fromtimestamp(forecastts)

    today = datetime.now()
    todayts = int(mktime(today.timetuple()))
    todaydtiso = datetime.fromtimestamp(todayts)


    diff_date = today - forecastdtiso  # timedelta object
    diff_date2 = todayts - forecastts  # timedelta object
    itstime = diff_date2 > 0
    return itstime

def diff_date_sting(forecast):
    print("diff_date_sting")
    # if forecast_datedt and  forecast_time are String
    forecastdt = datetime.strptime(forecast, '%Y-%m-%d %H:%M:%S')
    #forecastdtiso = datetime.timestamp(forecastdt)
    forecastts = int(mktime(forecastdt.timetuple()))
    forecastdtiso =datetime.fromtimestamp(forecastts)

    today = datetime.now()
    todayts = int(mktime(today.timetuple()))
    todaydtiso = datetime.fromtimestamp(todayts)

    diff_date = today - forecastdtiso  # timedelta object
    itstime = int(todayts - forecastts) > 0
    return itstime

def diff_date_sting2(forecast):
    print("diff_date_sting")
    # if forecast_datedt and  forecast_time are String
    forecastdt = datetime.strptime(forecast, '%Y-%m-%d %H:%M:%S')
    #forecastdtiso = datetime.timestamp(forecastdt)
    forecastts = int(mktime(forecastdt.timetuple()))
    forecastdtiso =datetime.fromtimestamp(forecastts)

    today = datetime.now()
    todayts = int(mktime(today.timetuple()))
    todaydtiso = datetime.fromtimestamp(todayts)

    diff_date = today - forecastdtiso  # timedelta object
    itstime = int(todayts - forecastts) > 86400
    return itstime


@app.route('/checkroute', methods=['GET', 'POST', 'PUT', 'DELETE'])
def checkroute():
    print("--- default_app firebase checkroute ---")

    _request = request.get_json(force=True)
    register2 = {
    	"status": 200,
    	"message": "waiting...",
    	"route":"routeended",
    	# "route2":"e9d974b520074478b201f8ca33136b7b"
    }
    link =  _request.get("link")
    nit =  _request.get("nit")
    invoiceid =  _request.get("invoiceid")

    if (link is not None):
        os.remove("static/temporarily/{}.json".format(link))
        link = ""
        print("Link Removed!")

    if (nit is None or invoiceid is None):
        return {}

    docs = db.collection(u'orders') \
    .where(u'nit', u'==', nit) \
    .where(u'invoiceid', u'==', invoiceid).stream()

    row = {}
    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))
        row = doc.to_dict();
        break;

    diff = False
    if(row.get("uid") is not None):
        text2 = ""
        route = ""
        forecast_date = str(row.get('forecast_date'))
        forecast_time = str(row.get('forecast_time'))
        diff = diff_date_sting(forecast_date[:10] + forecast_time[10:19])

    if diff == True and row.get('status') == 0:
        text2 = "Agradecemos su compra. Le informamos que su pedido ha sido entregado satisfactoriamente. Lo invitamos a dejarnos cualquier comentario o sugerencia en el campo inferior."
        route = "routeended"
        showmap = 1
    elif diff == True and row.get('status') == 1:
        text2 = "Agradecemos su compra.  Le informamos que su pedido esta en camino."
        if (row.get('unit') == 13077207):
            route = "716b6eeb1d9319bb1e5d5b4328bd69d3"
        elif (row.get('unit') == 13077320):
            route = "1b4c8ebf032028933be85527f32fb2e3"
        elif (row.get('unit') == 13077364):
            route = "2666125efca6b5162b2917664bda6d77"
        else:
            route = "routeended"
        showmap = 1
    elif diff == False and row.get('status') == 1:
        text2 = "Agradecemos su compra.  Le informamos que nuestro equipo de logística se encuentra en proceso de alistamiento de su pedido."
        route = "routeended"
        showmap = 0
    else:
        text2 = "Lo sentimos, no hay pedidos con esa información, le solicitamos contactarnos al sitio web https://comercializadoragyl.com/contactenos/."
        route = "error"
        showmap = 0

    print("--- default_app firebase checkroute end ---")
    # ts = int(mktime(datetime.now().timetuple()))
    link = uuid.uuid4()

    objRoute = {
        "_request": _request,
        "raw": {} if route == "error" else row,
        "status": 404 if route == "error" else 200,
    	"message": text2,
    	"route": route,
        "showmap": showmap,
        "link": "" if route == "error" else link,
    }

    if (route != "error"):
        """
        with open("static/temporarily/{}.json".format(link), 'w') as outfile:
            json.dump(objRoute, outfile)
        print("save file.")
        objRoute.update({"raw":{}})
        """
        file = "static/temporarily/{}.json".format(link)
        save_to_json_file(objRoute, file)
        # objRoute.update({"raw":{}})

    return objRoute


@app.route('/addcomment', methods=['GET', 'POST', 'PUT', 'DELETE'])
def addcomment():
    print("--- default_app firebase checkroute ---")

    _request = request.get_json(force=True)
    register2 = {
    	"status": 200,
    	"message": "mensaje en espera..."
    }

    inforel =  _request.get("inforel")
    stars =  _request.get("stars")
    comment =  _request.get("comment")

    if (inforel is not None or stars is not None or comment is not None):
        register2 = {
        	"status": 200,
        	"message": "error, no se pudo procesar el mensaje."
        }

    today = datetime.now()
    todayts = int(mktime(today.timetuple()))
    todaydtiso = datetime.fromtimestamp(todayts)

    messagehtml = "calificación: {}<br>comentario: {}<br><br><hr><br>Información relacionada con este mensaje:<br>cliente: {}<br>email: {}<br>nit: {}<br>factura: {}<br>unidad: {}" \
    .format(stars,comment,inforel.get("clientname"),inforel.get("email"),inforel.get("nit"),inforel.get("invoiceid"),inforel.get("unit"))

    dataMessageQueue = {
      "subject":"Nuevo comentario en sistema de seguimiento",
      "message":messagehtml,
      "email":"ventas@comercializadoragyl.com",
      "status": 1,
      "created": todaydtiso,
      "updated": todaydtiso,
      "datetimeToSend":todaydtiso
    }
    idm = str(uuid.uuid4())
    db.collection(u'queue').document(idm).set(dataMessageQueue)
    register2 = {
        "status": 200,
        "message": "Se envío el mensaje."
    }
    return register2

@app.route('/sendmail', methods=['GET', 'POST', 'PUT', 'DELETE'])
def sendMailBatch():
    print("--- sendMailBatch ---")

    today = datetime.now()
    todayts = int(mktime(today.timetuple()))
    todaydtiso = datetime.fromtimestamp(todayts)

    docs = db.collection(u'queue') \
    .where(u'status', u'==', 1).stream()

    for doc in docs:
        docqueue = doc.to_dict()
        print("<<<<<<<<<<< docqueue >>>>>>>>>>")
        print(docqueue)
        print("<<<<<<<<<<< docqueue end >>>>>>>>>>")
        try:
            sendmailhtml("contabilidad@comercializadoragyl.com", docqueue.get("email"), "{}".format(docqueue.get("subject")), 'Hi, The next message you see correctly with html format',docqueue.get("message"))
            docqueue.update({"status":0})
        except Exception as e:
            pass
        db.collection(u'queue').document(doc.id).set(docqueue)

    register2 = {
        "status": 200,
        "message": "Updated all availables mails."
    }
    return register2

def load_from_json_file(filename):
    """
    creates an Object from a "JSON file"
    """
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_to_json_file(my_obj, filename):
    """
    writes an Object to a text file, using a JSON representation
    """
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(my_obj, f)


@app.route('/closedoldorders', methods=['GET', 'POST', 'PUT', 'DELETE'])
def closedoldorders():
    print("--- default_app firebase closedoldorders ---")

    register2 = {
    	"status": 200,
    	"message": "updated status",
    }

    docs = db.collection(u'orders') \
    .where(u'status', u'==', 0).stream()

    row = {}
    for doc in docs:
        print(u'{} => {}'.format(doc.id, doc.to_dict()))
        row = doc.to_dict();
        forecast_date = str(row.get('forecast_date'))
        forecast_time = str(row.get('forecast_time'))
        diff = diff_date_sting2(forecast_date[:10] + forecast_time[10:19])
        if (diff == True):
            row.update({"status": 2})
            db.collection(u'orders').document(doc.id).set(row)

    print("--- default_app firebase closedoldorders end ---")
    # ts = int(mktime(datetime.now().timetuple()))

    return register2
