import urllib.request
#import pickle
import requests
import os.path
import uuid
import random
from flask import Flask, request, render_template, \
    json, jsonify, redirect, url_for
from flask_cors import CORS

################################################################
########################## flask setup #########################
################################################################
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'
debug = True
################################################################
########################## flask setup end #####################
################################################################


################################################################
########################## json setup ##########################
################################################################
data = {
    "app": "tracking",
    "forms": {
    },
    "labels": {
        "title": "Service for building Automated Actions - Beta FR",
        "msg_welcome": "Welcome, build your automation!",
        "author": "By Fesus Rocuts",
        "authorurl": "https://www.linkedin.com/in/fesus/",
        "btns": {
            "c": "create",
            "r": "read",
            "u": "update",
            "d": "delete",
            "s": "save",
            "c2": "continue",
            "a": "Add",
            "t": "Test",
            "f": "Finalize",
            "sm": "Send message"
        }
    },
    "cache_id": uuid.uuid4()
}
################################################################
########################## json setup end ######################
################################################################


################################################################
########################## default url of service ##############
################################################################
@app.route('/', methods=['GET', 'POST', 'PUT', 'DELETE'])
def index():
    return render_template("index.html", data=data)
