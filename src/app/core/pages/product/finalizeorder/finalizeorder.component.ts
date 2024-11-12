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

order: Order = {
  productId: 0,
  status: '',
  shippingAddress: ''
};

product: Product = {
  name: '',
  description: '',
  price: 0,
  stockQuantity: 0,
  categoryId: 0,
  imageUrl: ''
};

id: number = 0;

constructor(private productService: ProductService,private activatedRouter: ActivatedRoute,private orderService: OrderService,private router: Router) { }

ngOnInit(): void {
  console.log('Finalize Order Component');
  const idParam = this.activatedRouter.snapshot.paramMap.get('id');
  console.log('ID do produto:', idParam);
  if (idParam) {
    this.id = +idParam;  
    console.log('ID do produto:', this.id);
    this.productService.GetById(this.id).subscribe(
      (response) => {
        console.log(response);
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


addToCart() {
  console.log('Produto adicionado ao carrinho!');
}

buyNow() {
  console.log('Produto comprado!');
  this.orderService.DoOrder(this.order).subscribe(
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


  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;

    
  }
}
