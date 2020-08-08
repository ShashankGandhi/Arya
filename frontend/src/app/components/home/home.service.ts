import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from 'src/app/_services/global-settings.service';

@Injectable()
export class HomeService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: GlobalSettingsService
  ) { }

}
