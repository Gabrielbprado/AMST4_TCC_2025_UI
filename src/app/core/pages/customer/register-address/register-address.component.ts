import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressService } from '../../../service/address.service';

@Component({
  selector: 'app-register-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.css'],
})
export class RegisterAddressComponent {
  address = {
    streetName: '',
    streetNumber: 0,
    neighborhood: '',
    state: '',
    city: '',
    zipCode: '',
  };

  constructor(private addressService: AddressService) {}

  submitForm() {
    console.log('Endereço cadastrado:', this.address);
    this.addressService.createAddress(this.address).subscribe(
      (response) => {
        console.log('Endereço cadastrado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao cadastrar endereço', error);
      }
    );
  }

  searchCep() {
    if (!this.address.zipCode || this.address.zipCode.length < 8) {
      console.error('CEP inválido');
      return;
    }

    this.addressService.checkZipCode(this.address.zipCode).subscribe(
      (response) => {
        console.log('Endereço encontrado:', response);
        this.address.streetName = response.logradouro || '';
        this.address.neighborhood = response.bairro || '';
        this.address.state = response.uf || '';
        this.address.city = response.localidade || '';
      },
      (error) => {
        console.error('Erro ao buscar endereço', error);
      }
    );
  }
}
