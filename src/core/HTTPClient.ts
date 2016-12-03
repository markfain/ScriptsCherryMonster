declare var require:any;
/**
 * TODO: get rid of require and find typings for superagent-sync
 */
export class HTTPClient {

    public static post(url:string, data:any, callback:(err:any, res:any)=>void){
        let request = require("superagent");
        request.post(url)
            .send(data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end(callback);
    }

    public static postSync(url:string, data:any):any{
        let request = require("superagent-sync");
        let res = request.post(url)
            .send(data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end();
        return res;
    }

}