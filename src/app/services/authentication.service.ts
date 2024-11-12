import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly baseAPI = environment.API + '/';
  private readonly http = inject(HttpClient);

  constructor() {}

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(this.baseAPI + 'auth/login', {
      email,
      password,
    });
  }
}
