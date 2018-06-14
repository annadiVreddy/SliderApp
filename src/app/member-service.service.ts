import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MemberServiceService {

    // Resolve HTTP using the constructor
    constructor (private http: Http) {}

    getMemberData () {
    return this.http.get('/assets/offlineJson/mockRes.json') //
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
} 


}
