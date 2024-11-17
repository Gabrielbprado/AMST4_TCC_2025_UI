import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from "../product/product.component";
import { ProductCardComponent } from '../../../core/pages/product/product-card/product-card.component';
import { ProductsComponent } from '../../../core/pages/product/products/products.component';
import { ProductService } from '../../service/Product/product.service';
import { product } from '../../Model/ShortProduct';
import { Subscription } from 'rxjs';
import { CategoryCommunicationService } from '../../service/category-communication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy
{
  @Input() categoryId!: number;  
  constructor(private service: ProductService, private categoryCommunicationService: CategoryCommunicationService
  ) { }
  private categorySubscription: Subscription = Subscription.EMPTY;
  listProducts: product[] = [];
  categories: product[] = [
    {
      name: 'Eletrônicos', imageUrl: 'https://th.bing.com/th?id=OIP.RYZ8pbxjqQNQ50ytCgXpDAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      price: 0,
      id: 0
    },
    {
      name: 'Roupas', imageUrl: "https://th.bing.com/th?id=OIP.RYZ8pbxjqQNQ50ytCgXpDAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      price: 0,
      id: 0
    },
    {
      name: 'Casa e Decoração', imageUrl: "https://th.bing.com/th?id=OIP.RYZ8pbxjqQNQ50ytCgXpDAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
      price: 0,
      id: 0
    },
    {
      name: 'Beleza e Cuidados', imageUrl: "https://th.bing.com/th/id/OIP.TkKSLZWvAaRw5W_aB8p6lQHaDt?w=346&h=174&c=7&r=0&o=5&pid=1.7",
      price: 0,
      id: 0
    }
  ];

  featuredProducts : product[] = [
    {
      name: 'Produto 1', price: 199.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    },
    {
      name: 'Produto 2', price: 399.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    },
    {
      name: 'Produto 3', price: 99.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    }
  ];

  bestSellers: product[] = [
    {
      name: 'Produto 4', price: 149.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    },
    {
      name: 'Produto 5', price: 299.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    },
    {
      name: 'Produto 6', price: 89.99, imageUrl: "https://th.bing.com/th/id/OIP.n56ikgbhdSg1N5M0wt8-GwHaEK?w=312&h=180&c=7&r=0&o=5&pid=1.7",
      id: 0
    }
  ];


  ngOnInit(): void {
    // Se inscreve para escutar mudanças no categoryId
    this.categorySubscription = this.categoryCommunicationService.category$.subscribe(
      (categoryId) => {
        console.log('Categoria selecionada:', categoryId); // Para depuração
        this.filterByCategory(categoryId);
      }
    );
    
    // Carrega os produtos inicialmente sem filtro
    this.service.GetAll().subscribe(
      (data: product[]) => {
        this.listProducts = data;
        this.categories = data;
        this.featuredProducts = data;
        this.bestSellers = data;  
        
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  filterByCategory(categoryId: number): void {
    if (categoryId) {
      this.service.FilterByCategory(categoryId).subscribe(
        (response) => {
          this.featuredProducts = response;
          console.log('Produtos filtrados:', this.listProducts); 
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.service.GetAll().subscribe(
        (response) => {
          this.listProducts = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
}

}
