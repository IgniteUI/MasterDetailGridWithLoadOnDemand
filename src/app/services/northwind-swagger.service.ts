import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { CustomerDto, OrderDto } from "../model";

const API_ENDPOINT = 'https://data-northwind.indigo.design'; 

@Injectable({ 
  providedIn: 'root' 
}) 

export class NorthwindSwaggerService { 

  constructor( 
  private http: HttpClient 
  ) { } 

  public getCustomerDtoList(): Observable<CustomerDto[]> { 
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`) 
      .pipe(catchError(this.handleError<CustomerDto[]>('getCustomerDtoList', []))); 
  }

  public getOrderDtoList(id: string): Observable<OrderDto[]> { 
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`) 
      .pipe(catchError(this.handleError<OrderDto[]>('getOrderDtoList', []))); 
  }

  private handleError<T>(operation = 'operation', result?: T) {  
    return (error: any): Observable<T> => {  
      console.error(`${operation} failed: ${error.message}`, error); 
      return of(result as T);  
  };
 }  
} 