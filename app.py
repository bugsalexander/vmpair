from flask import Flask, Response
import json
import config

app = Flask(__name__)

@app.route("/api/v1/welcome/", methods=['GET'])
def get_welcome():
    ''' Return information for welcome page
    name: string
    nextMeeting:
    name: string
    date: DateTime
    partnerStatus: string
    nextPairing: DateTime
    '''
    # In ideal implementation, get user's email from auth
    email = config.EMAIL

    # Query name from the Users table using email

    # Query next meeting info from Meetings table using email

    result = {
        "name": name,
        "nextMeeting": {
            "partnerName": partnerName,
            "time": nextMeetingTime,
            "partnerStatus": partnerStatus,
        },
        "nextPairing": timeUntilMonday
    }
    return Response(
        json.dumps(result),
        status=200,
        mimetype='application/json'
    )

@app.route("/api/v1/welcome/", methods=['POST'])
def set_welcome():
    email = config.EMAIL
    # enter willBeAttending from welcome page into Meetings table using email

@app.route("/api/v1/preferences/", methods=['GET'])
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

@app.route("/api/v1/preferences/", methods=['POST', 'PUT'])
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

@app.route("/api/v1/stats/", methods=['GET'])
def get_stats():
    ''' Return information for stats page
    totalPeopleMet: number
    totalMeetings: number
    peopleMet: object[] (only most recent 4)
        name: string
        date: DateTime
    '''
    email = config.EMAIL

    # Obtain the stats from Meetings table using email

    result = {
        "totalPeopleMet": number,
        "totalMeetings": number,
        "peopleMet": [{
            "name": string,
            "date": DateTime
        }]
    }
    return Response(
        json.dumps(result),
        status=200,
        mimetype='application/json'
    )