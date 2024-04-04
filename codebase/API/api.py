from flask import Flask, jsonify, request, json, Response
import mysql.connector
import uuid
import requests

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]
@app.route('/api/selection', methods=['POST'])
def do_search():
    userinfo = request.get_json()
    LOCATION = userinfo['LOCATION']
    #url = "https://api.content.tripadvisor.com/api/v1/location/search?language=en"
    url = f"https://api.content.tripadvisor.com/api/v1/location/search?key=3EF0658EA2074AFD980A9729D442BE00&language=en&searchQuery={LOCATION}&language=en"
    #url = "https://api.content.tripadvisor.com/api/v1/location/search?key=3EF0658EA2074AFD980A9729D442BE00&searchQuery=
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.text)
    print(response.json())
    return jsonify(response.json())
@app.route('/incomes')
def get_incomes():
    return jsonify(incomes)

@app.route('/api/signup', methods=['POST'])
def add_user():
    userinfo = request.get_json()
    FIRSTNAME = userinfo['FIRSTNAME']
    LASTNAME = userinfo['LASTNAME']
    USERNAME = userinfo['USERNAME']
    PASSWORD = userinfo['PASSWORD']
    TOKEN = str(uuid.uuid4())

    ## DELETE LATER
    print(FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN)

    ## NEED TO ADD CHECK FOR DUPLICATE USERS
    ## ALSO, ENSURE THAT INPUT IS VALID
    ## THIS INVOLVES NO EMPTY INPUT ETC.
    add_userinfo(FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN)

    return '', 204

def add_userinfo(FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN):
    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    # Preparing SQL query to INSERT a record into the database.
    sql = f"""INSERT INTO userinfo(
           FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN)
           VALUES ('{FIRSTNAME}', '{LASTNAME}', '{USERNAME}', '{PASSWORD}', '{TOKEN}')"""

    try:
        # Executing the SQL command
        cursor.execute(sql)

        # Commit your changes in the database
        conn.commit()
        print("SUCCESS")

    except:
        # Rolling back in case of error
        conn.rollback()

    # Closing the connection
    conn.close()


@app.route('/api/login', methods=['POST'])
def login_user():
    userinfo = request.get_json()
    USERNAME = userinfo['USERNAME']
    PASSWORD = userinfo['PASSWORD']

    TOKEN, RESPONSE_MSG = check_userinfo(USERNAME, PASSWORD)
    data = {
        "TOKEN": TOKEN,
        "RESPONSE": RESPONSE_MSG
    }

    return jsonify(data)

def check_userinfo(USERNAME, PASSWORD):
    ## Vars to track if the user exists and then to track if password exists/is entered correctly
    ACCURATE_USER = False
    ACCURATE_PASS = False

    ## Set default values for token and response message
    TOKEN = ""
    RESPONSE_MSG = ""

    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    # Preparing SQL query to INSERT a record into the database.
    sql = f"SELECT USERNAME,PASSWORD FROM userinfo"

    try:
        # Executing the SQL command
        cursor.execute(sql)

        ## sqlresponse is a list of tuples (username, password)
        sqlresponse = cursor.fetchall()
        print("GOT TUPLES")
    except:
        print("FAILURE")

    current_user = (USERNAME, PASSWORD)
    ## Logic for parsing through sql response to verify user
    for usertuple in sqlresponse:

        # Base case where user has entered all details correctly and is in the system already
        if current_user == usertuple:
            try:
                cursor.execute(
                    f"""SELECT TOKEN FROM userinfo WHERE (USERNAME='{current_user[0]}' AND PASSWORD='{current_user[1]}')""")
                token = cursor.fetchall()
                TOKEN = token[0][0] # Gets returned as a tuple in a list so just need the token string
                RESPONSE_MSG = "SUCCESS"
                print("GOT TOKEN")
                break
            except:
                print("FAILED TO FETCH TOKEN")

        # Secondary case where username is correct but password is incorrect
        elif current_user[0] == usertuple[0]:
            TOKEN = "error"
            RESPONSE_MSG = "INCORRECT PASSWORD"

        # Everything else where user and password aren't recognized
        else:
            TOKEN = "error"
            RESPONSE_MSG = "UNKNOWN USER"
    # Closing the connection
    conn.close()

    print("TOKEN: ", TOKEN, " RESPONSE: ", RESPONSE_MSG)
    return TOKEN, RESPONSE_MSG

if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=8000)