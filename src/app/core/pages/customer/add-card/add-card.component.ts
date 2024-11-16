import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css'
})
export class AddCardComponent {
  cardName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  isFlipped: boolean = false;

  formatCardNumber(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 16) {
      this.cardNumber = numbers.replace(/(\d{4})(?=\d)/g, '$1-');
    }
  }

  formatExpiryDate(value: string) {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      this.expiryDate = numbers.replace(/(\d{2})(?=\d)/g, '$1/');
    }
  }

  updateCardView() {
    this.isFlipped = this.cvv.length > 0;
  }

  submitForm() {
    console.log('Formulário enviado', {
      cardName: this.cardName,
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
    });
  }
}