import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  formTitle = 'Cadastrar Usuário';
  submitType = 'Próximo';
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: CustomerService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = this.registerForm.value;
    console.log("Oi");
    console.log('Form Data:', formData);

    this.authService.register(formData).subscribe({
      next: (response: any) => {
        console.log('Cadastro bem-sucedido:', response);
        this.router.navigate(['/home']);  
      },
      error: (error: any) => {
        console.error('Falha no cadastro:', error);
      }
    });
  }
}