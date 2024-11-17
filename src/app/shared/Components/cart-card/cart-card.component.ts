import { Component, Input } from '@angular/core';
import { Product } from '../../../core/Model/Product';
import { ProductService } from '../../../core/service/Product/product.service';

@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
})
export class CartCardComponent  {

  @Input() product: Product = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
    id: 0,
    images: []
  };

  constructor(private service: ProductService) {}

  quantity = 1;

  lessQuantity() {
    this.quantity--;
  }

  addQuantity() {
    this.quantity++;
  }

  removeItem(id: number)
   {
    console.log('Remove item:', id);
    this.service.RemoveItem(id).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    }
}
