import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../service/Product/product.service';
import { GptService } from '../../../service/gpt.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.css'],
})
export class ProductRegistrationComponent {
  isActive = false;
  orderForm: FormGroup;
  imageFiles: File[] = []; 
  imagePreviews: string[] = []; 

  constructor(private fb: FormBuilder, private service: ProductService, private gptService: GptService) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
    });
  }

  toggleAutoDescription(): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
      const productName: string = this.orderForm.get('name')?.value;
      if (productName) {
        this.gptService.GenerateDescription(productName).subscribe((response) => {
          this.orderForm.patchValue({ description: response.description });
        });
      } else {
        this.isActive = false;
      }
    }
  }

RegisterProduct(): void {
  if (this.orderForm.valid) {
    const formData = new FormData();
    
    // Append the product data
    Object.keys(this.orderForm.value).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, this.orderForm.get(key)?.value);
      }
    });

    // Append the images as IFormFile
    this.imageFiles.forEach((file, index) => {
      formData.append('images', file, file.name);
      // You can also append 'isMain' for the first image
      if (index === 0) {
        formData.append('isMain', 'true');
      } else {
        formData.append('isMain', 'false');
      }
    });

    console.log('Formulário válido! Enviando dados:', formData);
    this.service.RegisterProduct(formData).subscribe({
      next: (response) => console.log('Produto cadastrado:', response),
      error: (error) => console.error('Erro ao cadastrar produto:', error),
    });
  } else {
    console.log('Formulário inválido!');
  }
}

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFiles[index] = file;
      this.imagePreviews[index] = URL.createObjectURL(file);
    }
  }
}
