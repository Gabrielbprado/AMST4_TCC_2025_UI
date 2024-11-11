import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Model/Product';
import { OrderService } from '../../../service/order.service';
import { RequestCreateOrder } from '../../../Model/RequestCreateOrder';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {
    name: 'AIFONE',
    description: 'CELULAR POTENTE',
    price: 1,
    stockQuantity: 1,
    categoryId: 1,
    imageUrl: 'https://amsnewsapi.blob.core.windows.net/e56a6ee0-cd01-46bc-a602-a0bf1efe36f6/38d06445-2716-475b-86b3-cc2c9d8a5dbd.jpg?sv=2024-11-04&se=2024-11-11T21%3A26%3A40Z&sr=b&sp=r&sig=5KPs3Sl0m0Ul5HeHn0UgypZA6ru1U3bQPl2F8hIwlX4%3D'
  };
  requestCreateOrder: RequestCreateOrder = 
  {
    productId: 1,
    status: 'PENDING',
    shippingAddress: 'Rua dos Bobos, 0',
  };
  responseCreatePix: CreatePixResponse = 
  {
    transactionId: 1,
    transactionAmount: 1,
    status: 'PENDING',
    description: 'Compra de um AIFONE',
    qrCode: '',
    qrCodeBase64: '',
    expirationDate: '',
    ticketUrl: ''
  }

  constructor(private service: OrderService,private router: Router) { }

  ngOnInit(): void {
  }

  addToCart() {
    console.log('Produto adicionado ao carrinho!');
  }

  buyNow() {
    this.service.DoOrder(this.requestCreateOrder).subscribe(
      (response) => {
        console.log("response",response);
        console.log(response);
        this.router.navigate(['pix-payment',response.transactionId]);



      },
      (error) => {
        console.error('Error posting news:', error);
      }
    );
  }

}
