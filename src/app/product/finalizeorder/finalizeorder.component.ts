import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-finalizeorder',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './finalizeorder.component.html',
  styleUrl: './finalizeorder.component.css'
})
export class FinalizeorderComponent {
selectedPaymentMethod: string | null = null;

  // Método para alternar a seleção do método de pagamento
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }
}
