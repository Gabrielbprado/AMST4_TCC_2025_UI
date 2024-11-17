import { Component, OnInit } from '@angular/core';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/Product/product.service';
import { Order } from '../../../Model/Order';
import { Product } from '../../..//Model/Product';
import { Cart } from '../../../Model/Cart';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    name: 'AIFONE',
    description: 'CELULAR POTENTE',
    price: 1,
    stockQuantity: 1,
    categoryId: 1,
    id: 0,
    images: []
  };
  requestCreateOrder: Order = {
    productId: 1,
    status: 'PENDING',
    shippingAddress: 'Rua dos Bobos, 0',
  };
  responseCreatePix: CreatePixResponse = {
    transactionId: 1,
    transactionAmount: 1,
    status: 'PENDING',
    description: 'Compra de um AIFONE',
    qrCode: '',
    qrCodeBase64: '',
    expirationDate: '',
    ticketUrl: '',
  };

  id: number = 0;
  cart: Cart = 
{
  productId: 0,
  quantity: 1
}

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.activatedRouter.snapshot.paramMap.get('id');
    console.log('ID do produto:', idParam);
    if (idParam) {
      this.id = +idParam;
      this.cart.productId = this.id;
      console.log('ID do produto:', this.id);
      this.productService.GetById(this.id).subscribe(
        (response) => {
          console.log(response);
          this.product = response;
          console.log("this.product");
          console.log(this.product);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  addToCart() {
    console.log('Produto adicionado ao carrinho!');
    console.log(this.cart);
    this.productService.AddToCart(this.cart).subscribe(
      (response) => {
    console.log('Produto adicionado ao carrinho!',response);
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buyNow() {
    console.log('Finalizando Pedido...');
    this.router.navigate(['finalize-order', this.id]);
  }
}
