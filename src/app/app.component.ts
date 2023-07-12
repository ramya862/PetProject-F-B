import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup,NgForm,Validators } from '@angular/forms';
import { PostService } from './services/post.service';
import { HttpClient } from '@angular/common/http';
import * as cors from 'cors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('empform')form!: NgForm;
  [x: string]: any;
  title = 'PetProject1';
  add:boolean=false;
  reactiveForm!: FormGroup;

  addEmployee()
  {
    this.add=true;
    this.reactiveForm=new FormGroup(
      {
   Name:new FormControl(null,[Validators.required,Validators.maxLength(5)]),
   Email:new FormControl(null,[Validators.required,Validators.email]),
   Phoneno:new FormControl(null,[Validators.required,Validators.maxLength(10)]),
  Gender:new FormControl('Male'),
   Age:new FormControl(null),
   Id:new FormControl(null),
   DOB:new FormControl(null)
  
      }
     );
  }
  del:boolean=false;
  delemp()
  {
    this.del=true;
  }
  posts:any;
  emplist:any=[];
  constructor(public service:PostService) {
  }

  ngOnInit()
  {
    this.service.getPosts();
    this.emplist=this.service.employees;
    }

onEmpCreate(emp:{ename:string,egen:string,eage:number,edob:string,eph:string,eemail:string})
{
  console.log(emp);
  this.service.http.post(' http://localhost:7039/api/registeremployee',emp).subscribe
  ((res)=>
  {
    console.log(res);
  })
}
back()
{
  this.add=false;
}
onDelEmp(id:string)
{
  this.service.http.delete('http://localhost:7039/api/delemp/'+id).subscribe();
  console.log(id);

}
onUpdEmp(id:string)
{
  this.add=true;

  let currengemp=this.service.employees.find((e: { id: string; })=>
  {
    return e.id==id
  });
  console.log(this.form);
  this.form.setValue(
    {
      name:'Jyo',
      Gender:'Female'
    }
  )

}
}

