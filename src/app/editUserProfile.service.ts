import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user/1';

  constructor(private http: HttpClient) {}

  updateUser(user: any): Observable<any> {
    return this.http.put(this.apiUrl, user);
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
