import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/Product/product.service';
import { GptService } from '../../../service/gpt.service';
import { Product } from '../../../Model/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  isActive = false;
  productForm: FormGroup;
  productId: number | null = null;
  imageFiles: File[] = []; 
  imagePreviews: string[] = []; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private gptService: GptService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.loadProductData();
    }
  }

  // Carrega os dados do produto
  private loadProductData(): void {
    this.productService.GetById(this.productId!).subscribe({
      next: (product: Product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          categoryId: product.categoryId,
        });

        // Pré-visualiza as imagens existentes
        this.imagePreviews = product.images?.map(img => img.imageUrl) || [];
      },
      error: (err) => console.error('Erro ao carregar o produto:', err),
    });
  }

  // Método para editar o produto
  saveChanges(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
  
      // Adiciona os dados do produto (sem incluir 'images' aqui)
      Object.keys(this.productForm.value).forEach((key) => {
        if (key !== 'images') {
          formData.append(key, this.productForm.get(key)?.value);
        }
      });
  
      // Envia as novas imagens
      this.imageFiles.forEach((file) => {
        formData.append('images', file, file.name);  // 'images' é o nome esperado pela API
      });
  
      // Se necessário, você pode enviar um campo adicional para o backend que indique que este é um produto já existente
      formData.append('productId', String(this.productId)); // Certifique-se de que o productId está correto
  
      // Exibe o FormData no console para depuração (opcional)
      console.log('Formulário válido! Enviando dados:', formData);
  
      // Chama o serviço para atualizar o produto
      this.productService.UpdateProduct(formData).subscribe({
        next: (response) => console.log('Produto atualizado com sucesso:', response),
        error: (error) => console.error('Erro ao atualizar o produto:', error),
      });
    } else {
      console.log('Formulário inválido!');
    }
  }
  

  // Atualiza a descrição automaticamente
  toggleAutoDescription(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      const productName: string = this.productForm.get('name')?.value;
      if (productName) {
        this.gptService.GenerateDescription(productName).subscribe((response) => {
          this.productForm.patchValue({ description: response.description });
        });
      } else {
        this.isActive = false;
      }
    }
  }

  // Captura as imagens carregadas
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFiles.push(file);
      this.imagePreviews.push(URL.createObjectURL(file));
    }
  }

  // Remove a imagem da pré-visualização
  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }
}
