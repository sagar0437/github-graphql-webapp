import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  public getSampleData(): Observable<any> {
    return this.http.get(
      'https://www.omdbapi.com/?i=tt3896198&apikey=f17df20b'
    );
  }
}
