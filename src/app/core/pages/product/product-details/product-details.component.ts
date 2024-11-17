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
    imageUrl: 'https://amsnewsapi.blob.core.windows.net/e56a6ee0-cd01-46bc-a602-a0bf1efe36f6/38d06445-2716-475b-86b3-cc2c9d8a5dbd.jpg?sv=2024-11-04&se=2024-11-11T21%3A26%3A40Z&sr=b&sp=r&sig=5KPs3Sl0m0Ul5HeHn0UgypZA6ru1U3bQPl2F8hIwlX4%3D',
    id: 0
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
  swapImages(event: Event): void {
    const clickedThumbnail = event.target as HTMLImageElement;
    const mainImage = document.getElementById('main-image') as HTMLImageElement;
  
    if (clickedThumbnail && mainImage) {
      // Troca os src entre a miniatura clicada e a imagem principal
      const tempSrc = mainImage.src;
      mainImage.src = clickedThumbnail.src;
      clickedThumbnail.src = tempSrc;
  
      // Atualiza a classe 'active' na miniatura clicada
      const thumbnails = document.querySelectorAll('.thumbnail-images img');
      thumbnails.forEach((img) => img.classList.remove('active'));
      clickedThumbnail.classList.add('active');
    }
  }
  
}
