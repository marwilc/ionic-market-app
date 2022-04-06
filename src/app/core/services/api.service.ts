import {
    HttpClient,
    HttpHeaders,
    HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient) {}

    get<T>(path?: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}${path}`, {
            headers: this.headers,
            withCredentials: true,
            params,
        });
    }

    put<T>(path: string, body: any = {}): Observable<T> {
        return this.http.put<T>(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            { headers: this.headers, withCredentials: true }
        );
    }

    post<T>(path: string, body: any = {}): Observable<T> {
        return this.http.post<T>(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            {
                headers: this.headers,
                withCredentials: true,
            }
        );
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.apiUrl}${path}`, {
            headers: this.headers,
            withCredentials: true,
        });
    }

    patch<T>(path: string, body: any = {}): Observable<T> {
        return this.http.patch<T>(
            `${environment.apiUrl}${path}`,
            JSON.stringify(body),
            {
                headers: this.headers,
                withCredentials: true,
            }
        );
    }

    setHeaders(name: string, value: string) {
        if (!this.headers.has(name)) {
            this.headers = this.headers.append(name, value);
        }
        return this;
    }
}
