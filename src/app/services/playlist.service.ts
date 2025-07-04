import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private API_URL = 'http://localhost:8080/lists';

   private httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin123'),
    'Content-Type': 'application/json' 
  }),
  withCredentials: true
};
  constructor(private http: HttpClient) { }

   create(playlist: any): Observable<any> {
    return this.http.post(this.API_URL, playlist, this.httpOptions);
  }

  list(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL, this.httpOptions);
  }

  searchById(nombre: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${nombre}`, this.httpOptions);
  }

  deleteById(nombre: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${nombre}`, this.httpOptions);
  }
}
