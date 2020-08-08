import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from 'src/app/_services/global-settings.service';

@Injectable()
export class LoginService {
  constructor(
    private http: HttpClient,
    private apiService: GlobalSettingsService
  ) { }

  // to sign in 
  signUp(postObj: any): Observable<any> {
    return this.http.post(`${this.apiService.getApiUrl()}/signUp`, postObj);
  }

  // to login
  login(postObj: any): Observable<any> {
    return this.http.post(`${this.apiService.getApiUrl()}/login`, postObj);
  }
}
