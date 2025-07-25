import { Component, ViewEncapsulation } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CustomPipe } from '../custom.pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LoginComponent,CustomPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  //encapsulation:ViewEncapsulation.None
  
})
export class UserComponent {
data:any;
//console.log();
handleDataFromChild(data){
  this.data=data;

}

}

