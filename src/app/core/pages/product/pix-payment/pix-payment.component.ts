import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CreatePixResponse } from '../../../Model/CreatePixResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pix-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pix-payment.component.html',
  styleUrl: './pix-payment.component.css'
})
export class PixPaymentComponent implements OnInit, OnDestroy {
  
  pixInfo: CreatePixResponse = {
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
  paymentStatusInterval: any;

  constructor(private route: ActivatedRoute, private service: OrderService, private router: Router) {}

  ngOnInit(): void {
    console.log('Pix Payment Component');
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID do produto:', idParam);
    if (idParam) {
      this.id = +idParam;  
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
      this.verifyPaymentStatus();  // Verificar o status na inicialização
      this.paymentStatusInterval = setInterval(() => {
        this.verifyPaymentStatus();  // Chamar a função a cada 5 segundos
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.paymentStatusInterval) {
      clearInterval(this.paymentStatusInterval);  // Limpar o intervalo ao destruir o componente
    }
  }

  copyPixKey() {
    const inputElement = document.getElementById('pix-key') as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
    alert('Chave PIX copiada!');
  }

  verifyPaymentStatus() {
    this.service.getPaymentStatus(this.pixInfo.transactionId).subscribe(
      (response) => {
        console.log("response.status");
        console.log(response.status);
        this.pixInfo.status = response.status;

        // Quando o pagamento for aprovado, faça a animação de sucesso
        if (this.pixInfo.status === 'approved') {
          this.showPaymentSuccess(); // Mostrar o modal
          this.navigateToSuccessPage(); // Redirecionar após um pequeno delay
        }
      },
      (error) => {
        console.error(error);
      });
  }

  showPaymentSuccess() {
    // Ativa a animação de sucesso
    console.log('Pagamento aprovado!');
  }

  navigateToSuccessPage() {
    // Adiciona um pequeno delay antes de redirecionar para garantir que a animação seja visível
    setTimeout(() => {
      this.router.navigate(['/home']); 
    }, 4000); // Tempo para a animação aparecer antes de redirecionar
  }
}
