import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../Model/Product';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { ProductService } from '../../../service/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../Model/Order';

@Component({
  selector: 'app-finalizeorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalizeorder.component.html',
  styleUrl: './finalizeorder.component.css'
})
export class FinalizeorderComponent {
  selectedPaymentMethod: string | null = null;
  savedCards = [
    { id: 1, maskedNumber: '**** **** **** 1234', name: 'João Silva' },
    { id: 2, maskedNumber: '**** **** **** 5678', name: 'Maria Oliveira' },
  ];

  order: Order = {
    productId: 0,
    status: '',
    shippingAddress: '',
  };

  product: Product = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    imageUrl: '',
    id: 0,
  };

  id: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRouter.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.productService.GetById(this.id).subscribe(
        (response) => {
          this.order.productId = this.id;
          this.order.status = 'PENDING';
          this.order.shippingAddress = 'Rua dos Bobos, 0';
          this.product = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  buyNow() {
    this.orderService.DoOrder(this.order).subscribe(
      (response) => {
        this.router.navigate(['pix-payment', response.transactionId]);
      },
      (error) => {
        console.error('Erro ao finalizar pedido:', error);
      }
    );
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  selectSavedCard(card: any) {
    console.log('Cartão Selecionado:', card);
  }
}
