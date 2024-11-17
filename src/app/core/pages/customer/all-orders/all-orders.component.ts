import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Model/Order';
import { Product } from '../../../Model/Product';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/Product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../service/order.service';
import { ResponseOrder } from '../../../Model/ResponseOrder';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
    orders: ResponseOrder[] = [];
    products: Product[] = [];  
    loading: boolean = true;
  
    constructor(private router: Router, private productService: ProductService,private orderService: OrderService) {}
  
    ngOnInit(): void {
      this.loadOrders();  
    }
  
    loadOrders() {
      this.orderService.GetOrders().subscribe({
        next: (orders) => {
          this.orders = orders;
          console.log('Pedidos:', this.orders);
          for (const order of this.orders) {
            this.products = order.product;
            console.log('Produtos:', this.products);
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
      this.loading = false;
    }
  
   
  
    getProductName(productId: number): string {
      const product = this.products.find(p => p.id === productId);
      return product ? product.name : 'Produto não encontrado';
    }
  
    getProductPrice(productId: number): number {
      const product = this.products.find(p => p.id === productId);
      return product ? product.price : 0;
    }
  
    viewOrderDetails(productId: number) {
      this.router.navigate([`/order-details/${productId}`]);
    }
  }
  