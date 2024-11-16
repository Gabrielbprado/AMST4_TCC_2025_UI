// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment-card-form.component.html',
  styleUrls: ['./payment-card-form.component.css']
})
export class PaymentCardFormComponent implements OnInit {
  mp: any;
  cardForm: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Carrega o script do Mercado Pago
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      this.initializeMercadoPago();
    };
    document.body.appendChild(script);
  }

  private initializeMercadoPago() {
    this.mp = new window.MercadoPago('APP_USR-abded610-cb6c-4280-a02a-328c1262f52c');
    this.cardForm = this.mp.cardForm({
      amount: '100.5',
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Número do cartão',
        },
        expirationDate: {
          id: 'form-checkout__expirationDate',
          placeholder: 'MM/YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de segurança',
        },
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular do cartão',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emissor',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Parcelas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número do documento',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'E-mail',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = this.cardForm.getCardFormData();

          if (!token) {
            console.log('Token not generated. Please check the form fields and try again.');
            return;
          }

          console.log('Token gerado: ', token);

          this.http.post('/process_payment', {
            token,
            issuer_id,
            payment_method_id,
            transaction_amount: Number(amount),
            installments: Number(installments),
            description: 'Descrição do produto',
            payer: {
              email,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          }).subscribe(
            response => console.log('Pagamento processado:', response),
            error => console.error('Erro ao processar pagamento:', error)
          );
        },
        onFetching: (resource: string) => {
          console.log('Fetching resource: ', resource);
          const progressBar = document.querySelector('.progress-bar');
          progressBar?.removeAttribute('value');
          return () => {
            progressBar?.setAttribute('value', '0');
          };
        },
      },
    });
  }
}