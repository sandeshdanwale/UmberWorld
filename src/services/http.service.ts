import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

/*
* Minerva wrapper for Angular's HTTP service to add headers for common requests.
*/

@Injectable()
export class HttpService {

	headers:IHeaders;

	constructor(private http:Http) {
		this.constructHeaders()
	}

	private constructHeaders() {
		let headers:Headers = new Headers();
		headers.set('Content-Type', 'application/json');
		this.headers = { headers: headers }
	}

	public post(url:string, options:any) {
	    this.constructHeaders();
		return (<any>this.http.post(url, options, this.headers))
	}

	public get(url:string) {
		return (<any>this.http.get(url, this.headers))
	}

}

interface IHeaders {
	headers:Headers
}

export const HTTP_SERVICE_BINDINGS = [
    HttpService
];
