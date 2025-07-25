import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { from, mergeMap, Observable, of } from 'rxjs';
import { CustomPipe } from '../custom.pipe';

@Component({
  selector: 'app-api-calling',
  standalone: true,
  imports: [CustomPipe],
  templateUrl: './api-calling.component.html',
  styleUrl: './api-calling.component.css'
})
export class ApiCallingComponent implements OnInit {
data:any;
constructor(private http:HttpClient){
 // this.get();

  console.log("hello")

   this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result)=>{

    this.data=result;
    console.log(this.data);
  })

}
ngOnInit(){

  this.get();
}
get(){

  // let url=["https://jsonplaceholder.typicode.com/users","https://jsonplaceholder.typicode.com/comments"];

  let srcObservable= of(1,2,3,4)
  let innerObservable= of('A','B','C','D')
   
srcObservable.pipe(
    mergeMap( val => {
      console.log('Source value '+val)
      console.log('starting new observable')
      return innerObservable
    })
  )
  .subscribe(ret=> {
    console.log('Recd ' + ret);
  })
 




}
}
