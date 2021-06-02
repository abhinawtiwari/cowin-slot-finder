import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlotServiceService {

  constructor(
    private http: HttpClient
  ) { }

  findByDistrictSunflower(date: string) {
    // district_id should be a number as given by api
    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=123&date=" + date;
    return this.http.get<any>(url);
  }

  findByDistrictForFriend(date: string) {
    // district_id should be a number as given by api
    const url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=123&date=" + date;
    return this.http.get<any>(url);
  }
}
