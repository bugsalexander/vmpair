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
        session['email'] = config.EMAIL

        mycursor.execute(
            f"select * from meetings where (user_1_email = '{session['email']}' \
            or user_2_email = '{session['email']}') and meeting_date > current_date;")
        
        result = mycursor.fetchall()
        print("the result of the query is", result)
        print(type(result))
        return json.dumps(str(result)) 

@app.route("/api/v1/login", methods=["POST", "OPTIONS"])
def login():
    ''' Update stored info about person currently logged in
    email: string
    password: string
    '''

    if request.method == "OPTIONS":
        return Response(
            headers={"Access-Control-Allow-Origin": "*"},
            status=200,
        )

    session['email'] = request.json['email']
    # redirect the user to the home page after "logging in"
    # return redirect('/welcome')
    return Response(     
            headers={"Access-Control-Allow-Origin": "*"},
            status=200,
            mimetype='application/json'
        )

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
        print(session['email'])

        # Query next meeting info from Meetings table using email
        mycursor.execute(f"select user_2_email, meeting_date, user_2_attending from meetings where user_1_email = '{session['email']}';")
        result = mycursor.fetchall()
        mycursor.execute(f"select user_1_email, meeting_date, user_1_attending from meetings where user_2_email = '{session['email']}';")
        result.extend(mycursor.fetchall())
        print("the result of the second query is", result)
        if result != []:
            (partnerEmail, nextMeetingTime, partnerStatus) = result[0]
            print(nextMeetingTime.strftime("%m/%d/%Y"))
        
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
                headers={"Access-Control-Allow-Origin": "*"},
                status=200,
                mimetype='application/json'
            )

@app.route("/api/v1/welcome", methods=['POST'])
def set_welcome():
    willBeAttending = request.json.get('willBeAttending')
    # enter willBeAttending status from welcome page into Meetings table
    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        mycursor = mydb.cursor()
        mycursor.execute(f"update meetings set user_1_attending = {willBeAttending} where user_1_email = '{session['email']}' \
            and meeting_date > current_date;")
        mycursor.execute(f"update meetings set user_2_attending = {willBeAttending} where user_2_email = '{session['email']}' \
            and meeting_date > current_date;")
        mydb.commit()
        return Response(
            json.dumps({"willBeAttending":willBeAttending}),
            headers={"Access-Control-Allow-Origin": "*"},
            status=200,
            mimetype='application/json'
        )

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
        # Query name, preferredPronouns, doesWantMatching from Users table

        # From availability table:
        # Query daysFreeToMeet, then use that to get availabilityByDay
        # Query maxMeetingsPerWeek

        with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
            mycursor = mydb.cursor()
            mycursor.execute(f'''SELECT *
            FROM users
            INNER JOIN days_of_week_availability AS avail ON users.email = avail.email 
            WHERE users.email = '{session['email']}';''')

            preferences_record = mycursor.fetchone()
            print('preferences_record is', preferences_record)
            fullName, preferredPronouns, email, role, team, dateStarted, doesWantMatching, sameEmail, maxMeetingsPerWeek, mondayTimesStr, mondayCanVirtual, mondayCanInPerson, tuesdayTimesStr, tuesdayCanVirtual, tuesdayCanInPerson, wednesdayTimesStr, wednesdayCanVirtual, wednesdayCanInPerson, thursdayTimesStr, thursdayCanVirtual, thursdayCanInPerson, fridayTimesStr, fridayCanVirtual, fridayCanInPerson = preferences_record

        print(mondayTimesStr)
        result = {
            "name": fullName,
            "preferredPronouns": preferredPronouns,
            "email": email,
            "doesWantMatching": doesWantMatching,
            "availabilityByDay": [
                    {
                        "times": json.loads(mondayTimesStr),
                        "canVirtual": True if mondayCanVirtual == 1 else False,
                        "canInPerson": True if mondayCanInPerson == 1 else False
                    },
                    {
                        "times": json.loads(tuesdayTimesStr),
                        "canVirtual": True if tuesdayCanVirtual == 1 else False,
                        "canInPerson": True if tuesdayCanInPerson == 1 else False
                    },
                    {
                        "times": json.loads(wednesdayTimesStr),
                        "canVirtual": True if wednesdayCanVirtual == 1 else False,
                        "canInPerson": True if wednesdayCanInPerson == 1 else False
                    },
                    {
                        "times": json.loads(thursdayTimesStr),
                        "canVirtual": True if thursdayCanVirtual == 1 else False,
                        "canInPerson": True if thursdayCanInPerson == 1 else False
                    },
                    {
                        "times": json.loads(fridayTimesStr),
                        "canVirtual": True if fridayCanVirtual == 1 else False,
                        "canInPerson": True if fridayCanInPerson == 1 else False
                    }             
                ],
            "maxMeetingsPerWeek": maxMeetingsPerWeek
        }
        return Response(
            json.dumps(result),
            headers={"Access-Control-Allow-Origin": "*"},
            status=200,
            mimetype='application/json'
        )

@app.route("/api/v1/preferences", methods=['POST'])
def set_preferences():
    ''' Update existing preferences
    name: string
    preferredPronouns: string
    email: string
    doesWantMatching: boolean
    availabilityByDay: weekDayAvail[]
        Fields in weekDayAvail object
            times: string[] e.g. Monday: [“12pm”, “1pm”]
            canVirtual: boolean
            canInPerson: boolean
    maxMeetingsPerWeek: number
    '''
    # enter name, preferredPronouns, doesWantMatching into Users table
    # enter availabilityByDay fields, maxMeetingsPerWeek into Availability table

    with mysql.connector.connect(host='localhost', user='root', port=3307, password='root', database='test_db') as mydb:
        # see if the user already has preferences set up
        mycursor = mydb.cursor()
        mycursor.execute(f'''SELECT full_name
        FROM users
        INNER JOIN days_of_week_availability ON users.email = days_of_week_availability.email 
        WHERE users.email = '{session['email']}';''')

        preferences_record = mycursor.fetchall()
        if len(preferences_record) > 1: 
            return Response(json.dumps({'msg': 'you cannot have more than one user per email'}), status=404, mimetyple='application/json')
        if len(preferences_record) == 1:
            print("len is", len(preferences_record))
            # update the user record
            mycursor = mydb.cursor()
            mycursor.execute(f'''UPDATE users
            SET users.full_name = '{request.json['name']}',
                users.preferred_pronouns = '{request.json['preferredPronouns']}',
                users.does_want_matching = {request.json['doesWantMatching']}
            WHERE users.email = '{session['email']}';''')

            mydb.commit()

            # update the days_of_week_availability record
            mycursor = mydb.cursor()
            mycursor.execute(f'''UPDATE days_of_week_availability
            SET days_of_week_availability.max_weekly_meetings = '{request.json['maxMeetingsPerWeek']}',

                days_of_week_availability.monday_times = '{json.dumps(request.json['availabilityByDay'][0]['times'])}',
                days_of_week_availability.monday_can_virtual = {request.json['availabilityByDay'][0]['canVirtual']},
                days_of_week_availability.monday_can_in_person = {request.json['availabilityByDay'][0]['canInPerson']},

                days_of_week_availability.tuesday_times = '{json.dumps(request.json['availabilityByDay'][1]['times'])}',
                days_of_week_availability.tuesday_can_virtual = {request.json['availabilityByDay'][1]['canVirtual']},
                days_of_week_availability.tuesday_can_in_person = {request.json['availabilityByDay'][1]['canInPerson']},

                days_of_week_availability.wednesday_times = '{json.dumps(request.json['availabilityByDay'][2]['times'])}',
                days_of_week_availability.wednesday_can_virtual = {request.json['availabilityByDay'][2]['canVirtual']},
                days_of_week_availability.wednesday_can_in_person = {request.json['availabilityByDay'][2]['canInPerson']},

                days_of_week_availability.thursday_times = '{json.dumps(request.json['availabilityByDay'][3]['times'])}',
                days_of_week_availability.thursday_can_virtual = {request.json['availabilityByDay'][3]['canVirtual']},
                days_of_week_availability.thursday_can_in_person = {request.json['availabilityByDay'][3]['canInPerson']},

                days_of_week_availability.friday_times = '{json.dumps(request.json['availabilityByDay'][4]['times'])}',
                days_of_week_availability.friday_can_virtual = {request.json['availabilityByDay'][4]['canVirtual']},
                days_of_week_availability.friday_can_in_person = {request.json['availabilityByDay'][4]['canInPerson']}
            WHERE days_of_week_availability.email = '{session['email']}';''')

            mydb.commit()
        else:
            # insert the record
            # TODO
            pass
    return Response(
        json.dumps({'msg': 'successfully updated preferences'}), 
        headers={"Access-Control-Allow-Origin": "*"},
        status=200, 
        mimetype='application/json'
    ) 

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
            headers={"Access-Control-Allow-Origin": "*"},
            status=200,
            mimetype='application/json'
        )

if __name__ == "__main__":
    app.run(debug=True)