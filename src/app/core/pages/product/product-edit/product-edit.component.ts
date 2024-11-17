import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../service/Product/product.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../Model/Product';
import { GptService } from '../../../service/gpt.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  product: Product | undefined;
  isActive: boolean = false;
  gptService: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Criando o FormGroup para edição
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: [null]
    });
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!; // Recuperando o id do produto pela URL

    if (isNaN(productId)) {
      console.error('ID inválido do produto.');
      return;
    }

    // Carregando o produto para edição
    this.loadProduct(productId);
  }

  // Método para carregar o produto pelo ID
  loadProduct(id: number): void {
    this.productService.GetById(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        // Preenche o formulário com os dados do produto
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
          stockQuantity: product.stockQuantity,
          categoryId: product.categoryId,
        });
      },
      error: (err: any) => {
        console.error('Erro ao carregar o produto', err);
      }
    });
  }

  // Método para editar o produto
  editProduct(): void {
    if (this.productForm.valid && this.product) {
      const formData = new FormData();
      const price = this.productForm.get('price')?.value;
      const priceWithDot = price ? price.toString().replace(',', '.') : null;
      this.productForm.patchValue({ price: priceWithDot });

      // Preenche o formData com os dados do formulário
      Object.entries(this.productForm.value).forEach(([key, value]) => {
        if (key === 'imageUrl' && value) {
          formData.append('image', value as File); // Imagem
        } else {
          formData.append(key, value as string); // Outros campos
        }
      });

      // Envia a requisição para editar o produto
      this.productService.update(this.product.id, formData).subscribe({
        next: (response: any) => {
          console.log('Produto atualizado:', response);
          this.router.navigate(['/products']); // Redireciona para a lista de produtos
        },
        error: (error: any) => {
          console.error('Erro ao editar produto:', error);
        }
      });
    } else {
      console.log('Formulário inválido!');
    }
  }

  // Método para capturar a imagem enviada
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ imageUrl: file });
    }
  }
    
  toggleAutoDescription(): void {
    this.isActive = !this.isActive;
  
    if (this.isActive) {
      const productName: string = this.productForm.get('name')?.value;
      console.log('Nome do produto:', productName);
  
      if (productName) {
        this.gptService.GenerateDescription(productName).subscribe({
          next: (response: { description: any; }) => {
            console.log('Descrição gerada:', response.description);
            this.productForm.patchValue({ description: response.description });
          },
        });
      } else {
        console.error('O nome do produto é necessário para gerar a descrição.');
        this.isActive = false; // Desativa o toggle caso o nome esteja vazio
      }
    } else {
      this.productForm.patchValue({ description: '' });
    }
  }
}