import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { PathUtility } from '../basic/path-utility';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';

@Injectable()
export class ApiService {

  private currentUser;
  private apiEndpoint: string = 'http://localhost:3000';
  private _authToken: string;

  constructor(
    private http: HttpClient,
  ) {
    this.init();
  }

  /**
   * Get API endpoint
   *
   * @returns {string}
   */
  public get apiHost(): string {

    return this.apiEndpoint;
  }

  // token is initialised only once
  public async init() {
    this._authToken = await localStorage.getItem('token');
    this._authToken = 'adasd';
  }

  /**
   * GET request
   *
   * @param {string} url
   * @param {any} options
   * @returns {Observable<any>}
   */
  public get<T>(url: string, options?: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json' | 'text';
    withCredentials?: boolean;
  }): Observable<any> {

    options = this.appendAuthorizationHeader((options as any));
    url = PathUtility.concatPath(this.apiEndpoint, url) as string;
    return this.http.get<T>(url, (options as any))
      .catch((error: any) => {
        this.handleError(error);
        return Observable.throwError(error);
      });
  }

  /**
   * GET request with params
   *
   * @param url
   * @param params
   */
  public getWithParams<T>(url: string, params: { name: string, value: string }[]): Observable<T> {
    const options = {headers: new HttpHeaders()};
    for (const param of params) {
      options.headers = options.headers.set(param.name, param.value);
    }
    return this.get<T>(url, options);
  }

  /**
   * POST request
   *
   * @param url
   * @param body
   * @param options
   * @param handle
   */
  public post<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } = null, handle: boolean = true): Observable<T> {

    options = this.appendAuthorizationHeader(options);

    let promise = this.http.post<T>(PathUtility.concatPath(this.apiEndpoint, url), body, options);
    if (handle) {
      promise = promise.catch((error: any) => {
        return Observable.throwError(" Invalid file name. To download a file, you must rename the file.");
      });
    }
    return promise;
  }

  /**
   * PUT request
   *
   * @param url
   * @param body
   * @param options
   * @param handle
   */
  public put<T>(url: string, body: any | null, options: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  } = null, handle: boolean = true): Observable<T> {

    options = this.appendAuthorizationHeader(options);

    let promise = this.http.put<T>(PathUtility.concatPath(this.apiEndpoint, url), body, options);
    if (handle) {
      promise = promise.catch((error: any) => {
        this.handleError(error);
        return Observable.throwError(error);
      });
    }
    return promise;
  }

  /**
   * DELETE request
   *
   * @param url
   * @param options
   */
  public delete<T>(url: string, options?: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<T> {

    options = this.appendAuthorizationHeader(options);

    return this.http.delete<T>(PathUtility.concatPath(this.apiEndpoint, url), options)
      .catch((error: any) => {
        this.handleError(error);
        return Observable.throwError(error);
      });
  }


  /**
   * Append authorization header
   *
   * @param {any} options
   * @returns {any}
   */
  private appendAuthorizationHeader(options: {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean
  }) {
    if (!options) options = {};
    if (!options.headers) options.headers = new HttpHeaders();
    // options.headers = options.headers.set('Authorization', this._authToken);
    options.headers.append('Access-Control-Allow-Origin' , '*');
    options.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    options.headers.append('Accept','application/json');
    options.headers.append('content-type','application/json');
    return options;
  }

  /**
   * Handle CRUD request error
   *
   * @param error
   */
  private handleError(error: any) {
    console.log(error);
    // this.toastr.error(error);
  }
}
