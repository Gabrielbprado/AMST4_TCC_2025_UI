import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginform: FormGroup;

constructor(
  private fb: FormBuilder,
  private authService: CustomerService,
  private router: Router
) {
  this.loginform = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

onSubmit(): void {
  const formData = this.loginform.value;
  console.log('Form Data:', formData);
  console.log('Metodo login');
  console.log('Email', formData.email);
  console.log('Password', formData.password);
  this.authService.login(formData.email,formData.password).subscribe({
    next: (response: any) => {
      console.log('login bem-sucedido:', response);
      this.router.navigate(['/home']);  
    },
    error: (error: any) => {
      console.error('Falha no login:', error);
    }
  });
}


}
