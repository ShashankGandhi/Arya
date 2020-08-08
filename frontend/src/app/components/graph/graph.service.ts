import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSettingsService } from 'src/app/_services/global-settings.service';

@Injectable()
export class GraphService {
  constructor(
    private http: HttpClient,
    private apiService: GlobalSettingsService
  ) { }

  getGraphData(postObj) : Observable<any> {
    return this.http.post(`${this.apiService.getApiUrl()}/api/graph/getGraphData`, postObj);
  }
}
