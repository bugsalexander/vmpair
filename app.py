from flask import Flask
import mysql.connector
import json

app = Flask(__name__)

@app.route("/")
def hello_world():
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        print("I connected to the database that was created after I ran 'docker-compose up -d'!")
        
        mycursor = mydb.cursor()
        mycursor.execute("select * from users;")
        
        result = mycursor.fetchall()
        print("the result of the query is", result)
        return json.dumps(str(result)) 
    

if __name__ == "__main__":
    app.run(debug=True)


