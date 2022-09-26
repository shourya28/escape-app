import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  readonly baseUrl = "http://localhost:3000";

  getAllCities() {
    return this.http.get(this.baseUrl)
  }

  getMatchingCities(text: String) {
    return this.http.get(this.baseUrl + '/' + text)
  }

  getPath(text: String) {
    return this.http.get(this.baseUrl + '/generatePath/' + text)
  }
}
