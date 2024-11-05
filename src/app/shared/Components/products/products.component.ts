import { Component, Input } from '@angular/core';
import { ProductService } from '../../../core/service/Product/product.service';
import { product } from '../../../core/Model/ShortProduct';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

constructor(private service: ProductService) { }

@Input() product: product = {
  name: 'Andrey',
  price: 1,
  imageUrl: 'imagem.com'
};

}
