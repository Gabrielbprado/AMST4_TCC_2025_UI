import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private router: Router
  ) {}


  buyNow() {
    this.router.navigate(['cart-details']);
  }
  profileUser() {
    this.router.navigate(['user-profile']);
  }
}
