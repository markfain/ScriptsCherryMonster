import {Logger} from "../../core/Logger";
export class MailClient{
    public static sendMail(){
        const path = require('path');
        var DOMAIN = 'sandbox2957b480d98c4e058ba8270638ba1e3f.mailgun.org';
        var api_key = 'key-84710f40842adad3a9a1e9a2e2b0e922';
        var mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

        //var filepath = path.join(__dirname, 'sample.jpg');

        var data = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'markfainstein@gmail.com',
            subject: 'Complex',
            text: 'Testing cherrymonster Mail!',
            html: "<h1>Hello</h1>"
        };

        mailgun.messages().send(data, function (error, body) {
            Logger.log(body);
            Logger.log(error);
        });
    }

}