import { Component, OnInit } from '@angular/core';
import { Order } from '../../../Model/Order';
import { Product } from '../../../Model/Product';
import { Router } from '@angular/router';
import { ProductService } from '../../../service/Product/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit{
    orders: Order[] = [];
    products: Product[] = [];  // Lista de produtos para associar com os pedidos
    loading: boolean = true;
  
    constructor(private router: Router, private productService: ProductService) {}
  
    ngOnInit(): void {
      this.loadOrders();  // Carregar os pedidos
      this.loadProducts(); // Carregar os produtos
    }
  
    loadOrders() {
      // Aqui você deve carregar os pedidos de algum serviço ou API
      this.orders = [
        { productId: 1, status: 'PENDING', shippingAddress: 'Rua dos Bobos, 0' },
        { productId: 2, status: 'COMPLETED', shippingAddress: 'Avenida Paulista, 1000' },
        { productId: 3, status: 'CANCELLED', shippingAddress: 'Rua Fictícia, 123' }
      ];
      this.loading = false;
    }
  
    loadProducts() {
      // Aqui você deve carregar os produtos de um serviço ou API
      this.products = [
        { id: 1, name: 'iPhone 13 Pro', description: 'Smartphone Apple', price: 9999.99, stockQuantity: 10, categoryId: 1, images: [] },
        { id: 2, name: 'MacBook Pro', description: 'Laptop Apple', price: 14999.99, stockQuantity: 5, categoryId: 1,images: [] },
        { id: 3, name: 'AirPods Pro', description: 'Fones de ouvido Apple', price: 1599.99, stockQuantity: 20, categoryId: 2, images: [] }
      ];
    }
  
    // Método para buscar o nome do produto
    getProductName(productId: number): string {
      const product = this.products.find(p => p.id === productId);
      return product ? product.name : 'Produto não encontrado';
    }
  
    // Método para buscar o preço do produto
    getProductPrice(productId: number): number {
      const product = this.products.find(p => p.id === productId);
      return product ? product.price : 0;
    }
  
    // Método para redirecionar para os detalhes do pedido
    viewOrderDetails(productId: number) {
      this.router.navigate([`/order-details/${productId}`]);
    }
  }
  