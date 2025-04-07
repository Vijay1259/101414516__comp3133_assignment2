import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {}

  get token(): string | null {
    return this.tokenSubject.value;
  }

  get user(): any {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password }
    }).pipe(
      map(result => result),
      tap(response => {
        if (response.data?.login?.token) {
          this.saveToken(response.data.login.token);
          this.saveUser(response.data.login.user);
        }
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  saveUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
      variables: {
        input: { name, email, password }
      }
    }).pipe(
      map(result => result.data?.signup),
      tap(data => {
        if (data) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.tokenSubject.next(data.token);
          this.userSubject.next(data.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.apollo.client.resetStore();
    this.router.navigate(['/login']);
  }
} 