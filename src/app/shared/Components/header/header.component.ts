import { Component, NgModule, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/service/category.service';
import { CategoryCommunicationService } from '../../../core/service/category-communication.service';
import { Category } from '../../../core/Model/Category';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private categoryCommunicationService: CategoryCommunicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.GetAll().subscribe(
      (response) => {
        this.categories = response;
        console.log("this.categories");
        console.log(this.categories);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onCategorySelect(categoryId: number): void {
    console.log('Categoria selecionada:', categoryId); // Para depuração
    this.categoryCommunicationService.setCategory(categoryId);  // Atualiza o valor no serviço
  }

  
  buyNow() {
    this.router.navigate(['cart-details']);
  }
  profileUser() {
    this.router.navigate(['user-profile']);
  }
}
