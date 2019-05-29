import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Coffee } from 'src/app/shared/interface';


@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }
AddToCoffeeList
  getAll() {
    return this.http.get<Coffee[]>('assets/list.json').pipe(
      delay(1000)
    );
  }

  getList() {
    return this.getAll().toPromise();
  }
}
