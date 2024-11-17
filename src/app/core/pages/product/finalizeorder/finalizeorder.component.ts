import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../Model/Product';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { ProductService } from '../../../service/Product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { Order } from '../../../Model/Order';
import { CardInfo } from '../../../Model/CardInfo';

@Component({
  selector: 'app-finalizeorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finalizeorder.component.html',
  styleUrl: './finalizeorder.component.css'
})
export class FinalizeorderComponent {

  selectedPaymentMethod: string | null = null;
  savedCards: CardInfo[] = [];

  order: Order = {
    productId: 0,
    status: '',
    shippingAddress: '',
    addressId: 0
  };

  product: Product = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    id: 0,
    images: []
  };

  id: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
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
    if(this.selectedPaymentMethod === 'pix') {
    this.orderService.DoPixOrder(this.order).subscribe(
      (response) => {
        this.router.navigate(['pix-payment', response.transactionId]);
      },
      (error) => {
        console.error('Erro ao finalizar pedido:', error);
      }
    );
  }else if(this.selectedPaymentMethod === 'boleto'){
    console.log('Boleto');
    this.orderService.DoBoletoOrder(this.order).subscribe(
      (response) => {
        const boletoUrl = response.ticketUrl;
        console.log('Boleto URL:', boletoUrl);
        console.log('Resposta:', response);
        window.location.href = boletoUrl;
      },
      (error) => {
        console.error('Erro ao finalizar pedido:', error);
      }
    );
  }
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  getCards() 
  {
    this.orderService.GetPaymentMethod().subscribe(
      (response) => {
        console.log('Cartões Salvos:', response);
        this.savedCards = response;
      },
      (error) => {
        console.error('Erro ao carregar cartões:', error);
      }
    );
  }

  selectSavedCard(card: any) {
    console.log('Cartão Selecionado:', card);
  }
}
