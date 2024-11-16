import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../service/Product/product.service';
import { GptService } from '../../../service/gpt.service';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.css'
})
export class ProductRegistrationComponent {
  isActive: boolean = false;
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService,private gptService: GptService) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [null]
    });
  }

  toggleAutoDescription(): void {
    this.isActive = !this.isActive;
  
    if (this.isActive) {
      const productName: string = this.orderForm.get('name')?.value;
      console.log('Nome do produto:', productName);
  
      if (productName) {
        this.gptService.GenerateDescription(productName).subscribe({
          next: (response) => {
            console.log('Descrição gerada:', response.description);
            this.orderForm.patchValue({ description: response.description });
          },
        });
      } else {
        console.error('O nome do produto é necessário para gerar a descrição.');
        this.isActive = false; // Desativa o toggle caso o nome esteja vazio
      }
    } else {
      this.orderForm.patchValue({ description: '' });
    }
  }
  

  RegisterProduct(): void {
    if (this.orderForm.valid) {
      const formData = new FormData();
  
      const price = this.orderForm.get('price')?.value;
      const priceWithDot = price ? price.toString().replace(',', '.') : null;
  
      this.orderForm.patchValue({ price: priceWithDot });
  
      Object.entries(this.orderForm.value).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append('image', value as File);
        } else {
          formData.append(key, value as string);
        }
      });
  
      this.service.RegisterProduct(formData).subscribe({
        next: (response) => console.log('Produto cadastrado:', response),
        error: (error) => console.error('Erro ao cadastrar produto:', error)
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.orderForm.patchValue({ image: file });
    } else {
      this.orderForm.patchValue({ image: null });
    }
  }
  

}
