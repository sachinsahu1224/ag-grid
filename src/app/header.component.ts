import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav style="background:#1976d2;color:white;padding:1rem;display:flex;gap:2rem;align-items:center">
      <span style="font-weight:bold;font-size:1.2rem">My App</span>
      <a routerLink="/customers" routerLinkActive="active" style="color:white;text-decoration:none">Customers</a>
      <a routerLink="/products" routerLinkActive="active" style="color:white;text-decoration:none">Products</a>
      <a routerLink="/subscribes" routerLinkActive="active" style="color:white;text-decoration:none">Subscribes</a>
    </nav>
  `,
  styles: [`
    a.active {
      text-decoration: underline;
      font-weight: bold;
    }
  `]
})
export class HeaderComponent {}
