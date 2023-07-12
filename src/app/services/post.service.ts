import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
constructor(public http: HttpClient)
 { 

}
employees:any;
getPosts(){
  const apiUrl = 'http://localhost:7039/api/getallempinfo'; 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200/'
  });
  this.http.get(apiUrl, { headers }).subscribe(
    (response) => {
      this.employees=response;
      console.log(this.employees);
    },
    (error) => {
      console.error(error);
    }
  );
}
add:boolean=false; 
addaproduct()
{
this.add=true;
}
}
