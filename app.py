from flask import Flask, Response, session, request, redirect
import json
import config
import mysql.connector

from datetime import datetime

app = Flask(__name__)
app.secret_key = 'This is not a secure secret. Remember to change me in the future!'

@app.route("/api/v1/test")
def hello_world():
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        print("I connected to the database that was created after I ran 'docker-compose up -d'!")
        
        mycursor = mydb.cursor()
        mycursor.execute("select * from users where email = 'bsusan@vmware.com';")
        
        result = mycursor.fetchall()
        print("the result of the query is", result)
        print(type(result))
        return json.dumps(str(result)) 

@app.route("/api/v1/login", methods=["POST"])
def login():
    ''' Update stored info about person currently logged in
    email: string
    password: string
    '''
    session['email'] = request.form['email']

    # redirect the user to the home page after "logging in"
    return "hi"
    # return redirect('/welcome')

@app.route("/api/v1/welcome", methods=['GET'])
def get_welcome():
    ''' Return information for welcome page
    name: string
    nextMeeting:
    name: string
    date: DateTime
    partnerStatus: string
    nextPairing: DateTime
    '''
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        mycursor = mydb.cursor()
        # Query name from the Users table using email
        mycursor.execute(f"select full_name from users where email = '{session['email']}';")
        result = mycursor.fetchall()
        print("the result of the first query is", result)
        name = result[0][0]

        # Query next meeting info from Meetings table using email
        mycursor.execute(f"select user_2_email, meeting_date, user_2_attending from meetings where user_1_email = '{session['email']}';")
        result = mycursor.fetchall()
        print("the result of the second query is", result)
        (partnerEmail, nextMeetingTime, partnerStatus) = result[0]
        
        # Query partner's name from the Users table using their email
        mycursor.execute(f"select full_name from users where email = '{partnerEmail}';")
        result = mycursor.fetchall()
        print("the result of the third query is", result)
        partnerName = result[0][0]
        
        result = {
            "name": name,
            "nextMeeting": {
                "partnerName": partnerName,
                "time": nextMeetingTime.strftime("%m/%d/%Y"),
                "partnerStatus": partnerStatus,
            },
            "nextPairing": 7 - datetime.now().weekday()
        }
        return Response(
            json.dumps(result),
            status=200,
            mimetype='application/json'
        )

@app.route("/api/v1/welcome", methods=['POST'])
def set_welcome():
    email = config.EMAIL
    # enter willBeAttending from welcome page into Meetings table using email

@app.route("/api/v1/preferences", methods=['GET'])
def get_preferences():
    ''' Return existing preferences
    name: string
    preferredPronouns: string
    email: string
    doesWantMatching: boolean
    daysFreeToMeet: string[]
    availabilityByDay: weekDayAvail[]
    Fields in weekDayAvail object
        times: string[] e.g. Monday: [“12pm”, “1pm”]
        canVirtual: boolean
        canInPerson: boolean
    maxMeetingsPerWeek: number
    '''
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        email = config.EMAIL

        # Query name, preferredPronouns, doesWantMatching from Users table

        # From availability table:
        # Query daysFreeToMeet, then use that to get availabilityByDay
        # Query maxMeetingsPerWeek

        result = {
            "name": name,
            "preferredPronouns": string,
            "email": string,
            "doesWantMatching": boolean,
            "daysFreeToMeet": [string],
            "availabilityByDay": {
                "times": [string],
                "canVirtual": boolean,
                "canInPerson": boolean
            },
            "maxMeetingsPerWeek": number
        }
        return Response(
            json.dumps(result),
            status=200,
            mimetype='application/json'
        )

@app.route("/api/v1/preferences", methods=['POST', 'PUT'])
def set_preferences(preferences):
    ''' Update existing preferences
    name: string
    preferredPronouns: string
    email: string
    doesWantMatching: boolean
    daysFreeToMeet: string[]
    availabilityByDay: weekDayAvail[]
    Fields in weekDayAvail object
    times: string[]
    Monday: [“12pm”, “1pm”] or [10:15, 10:30, 12:00, 1:00]
    canVirtual: boolean
    canInPerson: boolean
    maxMeetingsPerWeek: number
    '''
    email = config.EMAIL
    # enter name, preferredPronouns, doesWantMatching into Users table
    # enter availabilityByDay, maxMeetingsPerWeek into Availability table
    return

@app.route("/api/v1/stats", methods=['GET'])
def get_stats():
    ''' Return information for stats page
    totalPeopleMet: number
    totalMeetings: number
    peopleMet: map<string<string>>
        name (string): date (DateTime)
    '''
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        # get all meetings that have happened for this person where both people said yes

        mycursor = mydb.cursor()
        mycursor.execute(f'''SELECT meetings.meeting_date AS meeting_dates, users.full_name AS acquaintance_names
        FROM meetings 
        INNER JOIN users ON meetings.user_2_email = users.email
        WHERE (meetings.user_1_email = '{session['email']}' OR meetings.user_2_email = '{session['email']}')
            AND meetings.user_1_attending = TRUE 
            AND meetings.user_2_attending = TRUE 
            AND meetings.meeting_date < CURDATE();''')

        all_people_met = mycursor.fetchall()

        # create a map that maps an acquaintance's name to the last date they were met as a string
        unique_people_met = {}
        for person in all_people_met:
            unique_people_met[person[1]] = str(person[0])

        result = {
            "totalPeopleMet": len(unique_people_met),
            "totalMeetings": len(all_people_met),
            "peopleMet": unique_people_met
        }
        return Response(
            json.dumps(result),
            status=200,
            mimetype='application/json'
        )

if __name__ == "__main__":
    app.run(debug=True)