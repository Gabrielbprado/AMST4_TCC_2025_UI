import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../Model/Product';
import { ProductService } from '../../../service/Product/product.service';
import { CommonModule } from '@angular/common';
import { CartCardComponent } from "../../../../shared/Components/cart-card/cart-card.component";

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, CartCardComponent],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {
products: Product[] = [];
totalPrice = 0;


  constructor(private router: Router,private service: ProductService) { }
  ngOnInit(): void 
  {
    this.service.GetCart().subscribe(data => {
      this.products = data;
    this.totalPrice = this.products.reduce((sum, product) => sum + product.price, 0);
    });
  }
  
  buyNow(id: number)	 
  {
    this.router.navigate(['finalize-order', id]);
  }
  
}
