from flask import Flask, jsonify, request, json, Response
import mysql.connector
import uuid
import requests

app = Flask(__name__)

incomes = [
    { 'description': 'salary', 'amount': 5000 }
]


@app.route('/incomes')
def get_incomes():
    return jsonify(incomes)


@app.route('/api/favorites', methods=['POST'])
def get_favorites():
    response = []
    data = request.get_json()
    print(data)
    TOKEN = data['TOKEN']

    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    # Preparing SQL query to INSERT a record into the database.
    sql = f"""SELECT LOCATION, IMAGE, NAME, ADDRESS FROM favorites WHERE TOKEN = '{TOKEN}'"""

    try:
        # Executing the SQL command
        cursor.execute(sql)
        sqlresponse = cursor.fetchall()
        print(sqlresponse)
        for tuples in sqlresponse:
            temparray=[]
            temparray.append(tuples[0])
            temparray.append(tuples[1])
            temparray.append(tuples[2])
            temparray.append(tuples[3])
            response.append(temparray)

        print(response)

    except mysql.connector.Error as e:
        # Print the error message for debugging
        print("Error:", e)

    return jsonify(response)

@app.route('/api/addfavorite', methods=['POST'])
def add_favorite():
    data = request.get_json()
    print(data)
    TOKEN = data['TOKEN']
    LOCATION = data['LOCATION']
    IMAGE = data['IMAGE']
    NAME = data['NAME']
    ADDRESS = data['ADDRESS']

    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    # Preparing SQL query to INSERT a record into the database.
    sql = f"SELECT TOKEN, LOCATION, IMAGE, NAME, ADDRESS FROM favorites"

    try:
        # Executing the SQL command
        cursor.execute(sql)
        sqlresponse = cursor.fetchall()
        print(sqlresponse)
        for tuples in sqlresponse:
            if (TOKEN, LOCATION, IMAGE, NAME, ADDRESS) == tuples:
                return '', 204

    except:
        print("FAILURE")

    sql = f"""INSERT INTO favorites(
                           TOKEN, LOCATION, IMAGE, NAME, ADDRESS)
                           VALUES ('{TOKEN}', '{LOCATION}', '{IMAGE}', '{NAME}', '{ADDRESS}')"""

    try:
        # Executing the SQL command
        cursor.execute(sql)

        # Commit your changes in the database
        conn.commit()
        RESPONSE_MSG = "SUCCESS"
        print("SUCCESS")

    except mysql.connector.Error as e:
        # Print the error message for debugging
        print("Error:", e)
        # Rolling back in case of error
        conn.rollback()

    # Closing the connection
    conn.close()

    return '', 204


@app.route('/api/removefavorite', methods=['POST'])
def remove_favorite():
    data = request.get_json()
    print(data)
    TOKEN = data['TOKEN']
    LOCATION = data['LOCATION']
    IMAGE = data['IMAGE']
    NAME = data['NAME']
    ADDRESS = data['ADDRESS']

    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")
    print("CONNECTION")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    sql = f"""DELETE FROM favorites WHERE TOKEN = '{TOKEN}' AND LOCATION = '{LOCATION}' AND IMAGE ='{IMAGE}' AND NAME = '{NAME}' AND ADDRESS = '{ADDRESS}'"""

    try:
        # Executing the SQL command
        cursor.execute(sql)

        # Commit your changes in the database
        conn.commit()
        RESPONSE_MSG = "SUCCESS"
        print("SUCCESS")

    except mysql.connector.Error as e:
        # Print the error message for debugging
        print("Error:", e)
        # Rolling back in case of error
        conn.rollback()

    # Closing the connection
    conn.close()

    return '', 204


@app.route('/api/images', methods=['POST'])
def image_search():
    data = request.get_json()
    print(data)
    id = data['ID']
    #                                                          location ID           API key
    # url = "https://api.content.tripadvisor.com/api/v1/location/17597950/photos?key=3EF0658EA2074AFD980A9729D442BE00&language=en"
    url = f"https://api.content.tripadvisor.com/api/v1/location/{id}/photos?key=3EF0658EA2074AFD980A9729D442BE00&language=en"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.json())
    return jsonify(response.json())


@app.route('/api/reviews', methods=['POST'])
def review_search():
    data = request.get_json()
    id = data['ID']

    url = f"https://api.content.tripadvisor.com/api/v1/location/{id}/reviews?key=3EF0658EA2074AFD980A9729D442BE00&language=en"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.json)
    return jsonify(response.json())


@app.route('/api/details', methods=['POST'])
def detail_search():
    data = request.get_json()
    id = data['ID']

    url = f"https://api.content.tripadvisor.com/api/v1/location/{id}/details?key=3EF0658EA2074AFD980A9729D442BE00&language=en&currency=USD"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.json())
    return jsonify(response.json())


@app.route('/api/location', methods=['POST'])
def location_search():
    data = request.get_json()
    id = data['ID']

    # Get details from tripadvisor about location
    url = f"https://api.content.tripadvisor.com/api/v1/location/{id}/details?key=3EF0658EA2074AFD980A9729D442BE00&language=en&currency=USD"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.json())
    responsedict = response.json()

    # Get images from tripadvisor about location
    imageurl = f"https://api.content.tripadvisor.com/api/v1/location/{id}/photos?key=3EF0658EA2074AFD980A9729D442BE00&language=en"
    headers = {"accept": "application/json"}
    imageresponse = requests.get(imageurl, headers=headers)
    print(imageresponse.json())
    imagedict = imageresponse.json()

    # Combine both responses into one for building the Location.js page in react
    largeURLs = []
    for item in imagedict['data']:
        large_url = item['images']['large']['url']
        largeURLs.append(large_url)

    responsedict['images'] = largeURLs


    return jsonify(responsedict)


@app.route('/api/selection', methods=['POST'])
def do_search():
    userinfo = request.get_json()
    LOCATION = userinfo['LOCATION']
    #url = "https://api.content.tripadvisor.com/api/v1/location/search?language=en"
    url = f"https://api.content.tripadvisor.com/api/v1/location/search?key=3EF0658EA2074AFD980A9729D442BE00&language=en&searchQuery={LOCATION}&language=en"
    #url = "https://api.content.tripadvisor.com/api/v1/location/search?key=3EF0658EA2074AFD980A9729D442BE00&searchQuery=
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    print(response.json())

    responsedict = response.json()
    for row in responsedict['data']:
        locationid = row['location_id']

        ## Adds the image link to each object in the response
        try:
            imageurl = f"https://api.content.tripadvisor.com/api/v1/location/{locationid}/photos?key=3EF0658EA2074AFD980A9729D442BE00&language=en"
            imageheaders = {"accept": "application/json"}
            imageresponse = requests.get(imageurl, headers=headers)
            imagedict = imageresponse.json()
            #print(imagedict)
            image = imagedict['data'][0]['images']['large']['url']
            row['image'] = image
        except:
            row['image'] = '../images/placeholder.png'

    print(responsedict)

    return jsonify(responsedict)


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
    RESPONSE_MSG = add_userinfo(FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN)
    print(RESPONSE_MSG)

    data = {
        "RESPONSE": RESPONSE_MSG
    }

    return jsonify(data)


def add_userinfo(FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN):
    # Boolean for tracking if username is allowed or not
    ALLOWED_USER = True

    # establishing the connection
    conn = mysql.connector.connect(
        user='root', password='1234', host='127.0.0.1', database="userinfo")

    # Creating a cursor object using the cursor() method
    cursor = conn.cursor()

    # Preparing SQL query to INSERT a record into the database.
    sql = f"SELECT USERNAME FROM userinfo"

    try:
        # Executing the SQL command
        cursor.execute(sql)
        sqlresponse = cursor.fetchall()


    except mysql.connector.Error as e:
        # Print the error message for debugging
        print("Error:", e)
        # Rolling back in case of error
        conn.rollback()

    # Iterates through usernames and if sign up username already exists, sign up will fail
    for tuples in sqlresponse:
        print(tuples[0])
        if USERNAME == tuples[0]:
            RESPONSE_MSG = "FAILURE"
            print("FAILURE")
            ALLOWED_USER = False
            break
        # Else it will set boolean to true
        else:
            ALLOWED_USER = True

    # If boolean is true then sign up will work
    if ALLOWED_USER == True:
        sql = f"""INSERT INTO userinfo(
                       FIRSTNAME, LASTNAME, USERNAME, PASSWORD, TOKEN)
                       VALUES ('{FIRSTNAME}', '{LASTNAME}', '{USERNAME}', '{PASSWORD}', '{TOKEN}')"""

        try:
            # Executing the SQL command
            cursor.execute(sql)

            # Commit your changes in the database
            conn.commit()
            RESPONSE_MSG = "SUCCESS"

        except:
            # Rolling back in case of error
            conn.rollback()

        # Closing the connection
        conn.close()

    return RESPONSE_MSG


@app.route('/api/login', methods=['POST'])
def login_user():
    userinfo = request.get_json()
    USERNAME = userinfo['USERNAME']
    PASSWORD = userinfo['PASSWORD']

    TOKEN, RESPONSE_MSG, FIRSTNAME = check_userinfo(USERNAME, PASSWORD)
    data = {
        "TOKEN": TOKEN,
        "RESPONSE": RESPONSE_MSG,
        "FIRSTNAME": FIRSTNAME
    }

    return jsonify(data)


def check_userinfo(USERNAME, PASSWORD):
    ## Vars to track if the user exists and then to track if password exists/is entered correctly
    ACCURATE_USER = False
    ACCURATE_PASS = False

    ## Set default values for token and response message
    TOKEN = ""
    RESPONSE_MSG = ""
    FIRSTNAME = ""

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
                    f"""SELECT TOKEN,FIRSTNAME FROM userinfo WHERE (USERNAME='{current_user[0]}' AND PASSWORD='{current_user[1]}')""")
                response = cursor.fetchall()
                TOKEN = response[0][0] # Gets returned as a tuple in a list so just need the token string
                FIRSTNAME = response[0][1] # Need the name value out of the tuple
                RESPONSE_MSG = "SUCCESS"
                print("GOT TOKEN")
                break
            except:
                print("FAILED TO FETCH TOKEN")

        # Secondary case where username is correct but password is incorrect
        elif current_user[0] == usertuple[0]:
            TOKEN = "error"
            RESPONSE_MSG = "INCORRECT PASSWORD"
            FIRSTNAME = ""

        # Everything else where user and password aren't recognized
        else:
            TOKEN = "error"
            RESPONSE_MSG = "UNKNOWN USER"
            FIRSTNAME = ""
    # Closing the connection
    conn.close()

    print("TOKEN: ", TOKEN, " RESPONSE: ", RESPONSE_MSG)
    return TOKEN, RESPONSE_MSG, FIRSTNAME

if __name__ == '__main__':
    #app.debug = True
    app.run(host='0.0.0.0', port=8000)