import { Component, OnDestroy, OnInit } from '@angular/core';
import { NorthwindSwaggerService } from '../../services/northwind-swagger.service';
import { Observable, Subject, shareReplay, take, takeUntil } from 'rxjs';
import { CustomerDto, OrderDto } from '../../model';
import { IgxCheckboxComponent, IgxColumnComponent, IgxColumnMaxLengthValidatorDirective, IgxGridComponent, IgxGridDetailTemplateDirective, IgxSimpleComboComponent } from 'igniteui-angular';
import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grid-demo',
  standalone: true,
  imports: [IgxCheckboxComponent, IgxSimpleComboComponent, IgxGridComponent, IgxColumnComponent, IgxColumnMaxLengthValidatorDirective, NgIf, AsyncPipe, IgxGridDetailTemplateDirective],
  templateUrl: './grid-demo.component.html',
  styleUrl: './grid-demo.component.css',
  providers: [HttpClient]
})
export class GridDemoComponent implements OnInit, OnDestroy{ 

  private destroy$ = new Subject<void>();
  public northwindSwaggerCustomerDto: CustomerDto[] = [];
  public selectedOrders = new Map<string, OrderDto>();

  constructor(private northwindSwaggerService: NorthwindSwaggerService) {} 

  ngOnInit() { 
  this.northwindSwaggerService 
    .getCustomerDtoList() 
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => (this.northwindSwaggerCustomerDto = data)); 
  }

  private ordersCache = new Map<string, Observable<OrderDto[]>>(); 

  getOrders(customerId: string): Observable<OrderDto[]> { 
    if (!this.ordersCache.has(customerId)) { 
      const request$ = this.northwindSwaggerService 
        .getOrderDtoList(customerId) 
        .pipe(take(1), shareReplay(1)); 
      this.ordersCache.set(customerId, request$); 
    } 
    return this.ordersCache.get(customerId)!; 
  }

  onOrderSelectionChange(customerId: string, order: OrderDto) { 
    this.selectedOrders.set(customerId, order); 
  } 

  getSelectedOrder(customerId: string): OrderDto | undefined { 
    return this.selectedOrders.get(customerId); 
  }

  refreshOrders(customerId: string) { 
    const request$ = this.northwindSwaggerService.getOrderDtoList(customerId).pipe(take(1), shareReplay(1)); 
    this.ordersCache.set(customerId, request$); 
} 

  ngOnDestroy() { 
    this.destroy$.next(); 
    this.destroy$.complete();
    this.ordersCache.clear();
  } 
}
