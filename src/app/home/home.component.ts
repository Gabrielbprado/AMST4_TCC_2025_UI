import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsComponent } from "../shared/Components/products/products.component";
import { product } from '../core/Model/ShortProduct';
import { ProductService } from '../core/service/Product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProductsComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit
{
  constructor(private service: ProductService) { }
 
  listProducts: product[] = [];

  ngOnInit(): void
  {
    this.service.GetAll().subscribe(
      (data) => {
        this.listProducts = data;
        console.log(data);
        console.log(this.listProducts);
      },
      (error) => {
        console.log(error);
      }
    );  
  }






}
