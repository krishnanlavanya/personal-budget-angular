import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    if (!this.data) {
      // Make HTTP call only if data is empty
      return this.http.get<any>('YOUR_BACKEND_API_ENDPOINT');
    } else {
      // If data exists, return it as an observable
      return new Observable(observer => {
        observer.next(this.data);
        observer.complete();
      });
    }
  }

  setData(data: any) {
    this.data = data;
  }
}
