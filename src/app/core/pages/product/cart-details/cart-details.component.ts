import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent {
product: any;
  constructor(private router: Router) { }
  
  buyNow(id: number)	 
  {
    this.router.navigate(['finalize-order', id]);
  }
}
