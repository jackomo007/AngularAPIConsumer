import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Contact } from './contact';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/contacts';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  API_ENDPOINT = 'http://127.0.0.1:8080/api';
  constructor(private http: HttpClient) { }


  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(apiUrl)
      .pipe(
        tap(contacts => console.log('Fetch contacts')),
        catchError(this.handleError('getContacts', []))
      );
  }

  getContact(id: number): Observable<Contact> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(_ => console.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

  addContact(contact): Observable<Contact> {
    return this.http.post<Contact>(apiUrl, contact, httpOptions).pipe(
      tap((contact: Contact) => console.log(`added contact w/ id=${contact._id}`)),
      catchError(this.handleError<Contact>('addContact'))
    );
  }

  updateContact(id, contact): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap(_ => console.log(`updated contact id=${id}`)),
      catchError(this.handleError<any>('updateContact'))
    );
  }

  deleteContact(id): Observable<Contact> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted contact id=${id}`)),
      catchError(this.handleError<Contact>('deleteContact'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      return of(result as T);
    };
  }
}
