import { Component, Input,Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
//  outputs:['inputData']
})

export class LoginComponent {

//@Output() inputData= new EventEmitter();
@Output() inputData:EventEmitter<any> = new EventEmitter();
//inputData=12;
 // @Input() data:any;

  ngOnInint(){
 //   const data=this.data;
  }

  data(data: any){

    this.inputData.emit(data)
    console.log("child"+data);

  }

}
