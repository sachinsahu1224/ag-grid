import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/compiler';
import { FilterDirective } from './filter.directive';
import { ApiCallingComponent } from './api-calling/api-calling.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderListComponent } from './order-list/order-list.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'test-data';

  
data(data:any){
  console.log(data);



}
}

