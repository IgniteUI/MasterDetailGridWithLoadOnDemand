export interface AddressDto { 
  street?: string; 
  city?: string; 
  region?: string; 
  postalCode?: string; 
  country?: string; 
  phone?: string; 
} 

export interface CustomerDto { 
  customerId?: string; 
  companyName: string; 
  contactName?: string; 
  contactTitle?: string; 
  address?: AddressDto; 
} 

export interface OrderDto { 
  orderId: number; 
  customerId: string; 
  employeeId: number; 
  shipperId?: number; 
  orderDate?: Date; 
  requiredDate?: Date; 
  shipVia?: string; 
  freight: number; 
  shipName?: string; 
  completed: boolean; 
  shipAddress?: AddressDto; 
} 