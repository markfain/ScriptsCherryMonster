import {TextFiles} from "../../utils/TextFiles";
import {Files} from "../../utils/Files";
import {Logger} from "../../core/Logger";
export class MailClient{

    public static getTokenFile(){
        return Files.file("$SCM_TASKS$", "tokens/token.json");
    }

    public static authorize(credentials, callback){
        const { OAuth2Client } = require("google-auth-library");
        var clientSecret = credentials.installed.client_secret;
        var clientId = credentials.installed.client_id;
        var redirectUrl = credentials.installed.redirect_uris[0];
        var oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        let token = this.getTokenFile();
        if (!token.exists()){
            this.getNewToken(oauth2Client, callback)
        }
        else {
            let tokenContent = TextFiles.readJson(token);
            oauth2Client.credentials = tokenContent;

            callback(oauth2Client);
        }
    }

    public static getNewToken(oauth2Client, callback){
        var readline = require('readline');
        var SCOPES = ['https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.compose'];
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        console.log('Authorize this app by visiting this url: ', authUrl);
        var rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', (code)=> {
            rl.close();
            oauth2Client.getToken(code, (err, token)=> {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                this.storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    public static storeToken(token){
        TextFiles.write(this.getTokenFile(), token);
    }

    public static sendMail(message){
        let auth = TextFiles.readJson(Files.file("$SCM$", "gmail.json"));
        this.authorize(auth, (authClient)=>{this.sendMessage(authClient, message)});
    }

    public static sendMessage(auth, message){
        var google = require('googleapis');
        var gmail = google.gmail('v1');
        var raw = this.constructBody('markfainstein@gmail.com', 'markfainstein@gmail.com', 'ScriptsMonster Tasks', message);
        gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            resource: {
                raw: raw
            }
        }, function(err, res) {
            if (err){
                Logger.error(err);
            }
            else {
                Logger.log("Email sent successfully")
            }
        });
    }

    public static constructBody(to, from, subject, message){
        var str = ["Content-Type: text/html; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", to, "\n",
            "from: ", from, "\n",
            "subject: ", subject, "\n\n",
            "<h1>"+message+"</h1>"
        ].join('');

        var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
        return encodedMail;
    }

}