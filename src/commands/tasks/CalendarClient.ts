import {Logger} from "../../core/Logger";
import * as fs from 'fs';
import {TextFiles} from "../../utils/TextFiles";
import {Files} from "../../utils/Files";

export class CalendarClient{
    private static TOKEN_PATH = 'credentials.json';
    private static pad(n){return n<10 ? '0'+n : n}

    private static ISODateString(d){

    return d.getUTCFullYear()+'-'
        + this.pad(d.getUTCMonth()+1)+'-'
        + this.pad(d.getUTCDate())+'T'
        + this.pad(d.getUTCHours())+':'
        + this.pad(d.getUTCMinutes())+':'
        + this.pad(d.getUTCSeconds())+'Z'
    }

    private static createEvent(auth){
        let dateStart = this.ISODateString(new Date(Date.now()));
        let dateEnd = this.ISODateString(new Date(Date.now()+3.6e+6));
        var event = {
            'summary': 'New Event Test',
            'location': 'Somewhere on the planet',
            'description': 'Baaaah',
            'start': {
                'dateTime': dateStart,
                'timeZone': 'Asia/Jerusalem',
            },
            'end': {
                'dateTime': dateEnd,
                'timeZone': 'Asia/Jerusalem',
            }
        };
        //noinspection TypeScriptValidateTypes
        let {google} = require("googleapis");
        const calendar = google.calendar({version: 'v3', auth});

        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
        }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.htmlLink);
        });
    }

    public static authorizeAndCreateEvent(){

        let secret = TextFiles.readJson(Files.file("$SCM$", "client_secret.json"));
        this.authorize(secret, (auth)=>{
            this.createEvent(auth)
        });

    }

    public static authorize(credentials, callback){
        const {google} = require('googleapis');
        var OAuth2Client = google.auth.OAuth2;
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(this.TOKEN_PATH, (err, token) => {
            if (err) return this.getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token.toString()));
            callback(oAuth2Client);
        });
    }

    public static getAccessToken(oAuth2Client, callback){
        const readline = require('readline');
        const SCOPES = ['https://www.googleapis.com/auth/calendar'];
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if (err) return callback(err);
                oAuth2Client.setCredentials(token);
                // Store the token to disk for later program executions
                fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) console.error(err);
                    console.log('Token stored to', this.TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }

}