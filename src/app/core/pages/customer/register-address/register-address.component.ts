import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-address',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register-address.component.html',
  styleUrl: './register-address.component.css'
})
export class RegisterAddressComponent {
  address = {
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    state: '',
    city: '',
    zipCode: '',
  };

  states = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'];

  cities = [
    { state: 'São Paulo', name: 'São Paulo' },
    { state: 'São Paulo', name: 'Campinas' },
    { state: 'São Paulo', name: 'Santos' },
    { state: 'Rio de Janeiro', name: 'Rio de Janeiro' },
    { state: 'Rio de Janeiro', name: 'Niterói' },
    { state: 'Rio de Janeiro', name: 'Petrópolis' },
    { state: 'Minas Gerais', name: 'Belo Horizonte' },
    { state: 'Minas Gerais', name: 'Uberlândia' },
    { state: 'Minas Gerais', name: 'Ouro Preto' },
  ];

  getCitiesForState(state: string) {
    return this.cities.filter((city) => city.state === state);
  }

  submitForm() {
    console.log('Endereço cadastrado:', this.address);
  }
}