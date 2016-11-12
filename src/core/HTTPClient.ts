declare var require:any;
declare var process:any;
export class HTTPClient {

    public static post(url, data, callback:(err:any, res:any)=>void){
        let request = require("superagent");
        request.post(url)
            .send(data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end(callback);
    }

    public static postSync(url, data):any{
        let request = require("superagent-sync");
        let res = request.post(url)
            .send(data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end();
        return res;
    }

}