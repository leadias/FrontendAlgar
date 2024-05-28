import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListResponse } from './list-response';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  endpoint: string = `${ environment.api }`;

  constructor(
    private http: HttpClient
  ) { }


  get() {
    return this.http.get<ListResponse>(environment.api  + "getListProducts" ).pipe(
            map((data: any) => data)
    )
  }
  
  createItem(item:any={}){
    return this.http.post(environment.api + 'Store', item);
  }


}
