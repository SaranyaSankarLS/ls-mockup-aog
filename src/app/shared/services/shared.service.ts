import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  getCurrentWeather() {
    return this.http.get(`https://api.weatherapi.com/v1/current.json?key=1ca97bb83b3e4cb0a0091344202511&q=Tokyo`);
  }
}
