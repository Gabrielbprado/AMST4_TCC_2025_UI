import { Component, Input } from '@angular/core';
import { product } from '../../../core/Model/ShortProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  
  @Input() product: product = {
    name: 'Andrey',
    price: 1,
    imageUrl: 'imagem.com',
    id: 0
  };

  constructor(private router: Router) { }
  
  OpenProduct(id: number)	 
  {
    this.router.navigate(['product-details', id]);
  }
}
