import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent {
  isActive: boolean = false;

  // Alterna entre ativo e inativo ao clicar no botão
  toggleAutoDescription(): void {
    this.isActive = !this.isActive;

  }
}



