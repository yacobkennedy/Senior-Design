import mysql.connector

#establishing the connection
conn = mysql.connector.connect(
   user='root', password='1234', host='127.0.0.1', database="userinfo")

#Creating a cursor object using the cursor() method
cursor = conn.cursor()

# Preparing SQL query to INSERT a record into the database.
sql = """INSERT INTO userinfo(
   USERNAME, PASSWORD)
   VALUES ('testuser', 'testpass')"""

try:
   # Executing the SQL command
   cursor.execute(sql)

   # Commit your changes in the database
   conn.commit()

except:
   # Rolling back in case of error
   conn.rollback()

# Closing the connection
conn.close()