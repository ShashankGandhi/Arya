import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class GlobalSettingsService {
  public SERVER_PORT: string = (window.location.hostname === 'localhost') ? ':8080' : '';

  // Generate the url to be used for all API calls
  public getApiUrl(): string {
    return `${window.location.protocol}//${window.location.hostname}${this.SERVER_PORT}`;
  }
}
