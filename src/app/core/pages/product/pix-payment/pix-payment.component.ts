import { Component, Input } from '@angular/core';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';

@Component({
  selector: 'app-pix-payment',
  standalone: true,
  imports: [],
  templateUrl: './pix-payment.component.html',
  styleUrl: './pix-payment.component.css'
})
export class PixPaymentComponent {
  
  pixInfo: CreatePixResponse = 
  {
    transactionId: 0,
    transactionAmount: 0,
    status: '',
    description: '',
    qrCode: '',
    qrCodeBase64: '',
    expirationDate: '',
    ticketUrl: ''
  };

  id: number = 0;

  constructor(private route: ActivatedRoute,private service: OrderService) {}
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID do produto:', idParam);
    if (idParam) {
      this.id = +idParam;  // Converte o parâmetro para número
      console.log('ID do produto:', this.id);
      this.service.GetPaymentInfo(this.id).subscribe(
        (response) => {
          console.log(response);
          this.pixInfo = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  copyPixKey() {
    const inputElement = document.getElementById('pix-key') as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
    alert('Chave PIX copiada!');
  }
}
