import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const baseUrl = environment.supabaseUrl + '/rest/v1';
const authHeaders = {
  apikey: environment.supabaseKey,
  Authorization: 'Bearer ' + environment.supabaseKey,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  get<T>(key: string) {
    return this.http.get<T>(baseUrl + key, { headers: authHeaders });
  }

  post<T>(key: string, body: T) {
    // https://axtwfwfjuxhnnxuelwyg.supabase.co/rest/v1/people
    return this.http.post<T>(baseUrl + key, body, {
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json; charset=utf-8',
        Prefer: 'return=representation',
      },
    });
  }

  delete<T>(key: string) {
    return this.http.delete<T>(baseUrl + key, { headers: authHeaders });
  }

  patch<T>(key: string, body: T) {
    return this.http.patch<T>(baseUrl + key, body, {
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json; charset=utf-8',
        Prefer: 'return=representation',
      },
    });
  }
}
