import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../core/pages/product/product-card/product-card.component';
import { ProductService } from '../../service/Product/product.service';
import { product } from '../../Model/ShortProduct';
import { Subscription } from 'rxjs';
import { CategoryCommunicationService } from '../../service/category-communication.service';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() categoryId!: number;  
  private categorySubscription: Subscription = Subscription.EMPTY;
  listProducts: product[] = [];
  homeSections: any;
  promos: any[] = [];

  bestSellers: product[] = [];

  constructor(private service: ProductService, private categoryCommunicationService: CategoryCommunicationService,private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.GetHomeSections().subscribe({
      next: (data) => {
        this.homeSections = data;
        this.promos = this.homeSections;
        console.log('Seções da home:', this.promos);
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.categorySubscription = this.categoryCommunicationService.category$.subscribe(
      (categoryId) => {
        this.filterByCategory(categoryId);
      }
    );

    this

    this.service.GetAll().subscribe({
      next: (data: product[]) => {
        this.listProducts = data;
        console.log('Produtos:', this.listProducts);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  filterByCategory(categoryId: number): void {
    if (categoryId) {
      this.service.FilterByCategory(categoryId).subscribe({
        next: (response) => {
          this.listProducts = response;
          console.log('Produtos filtrados:', this.listProducts);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      this.service.GetAll().subscribe({
        next: (response) => {
          this.listProducts = response;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}