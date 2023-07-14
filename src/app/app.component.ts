import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,NgForm,Validators } from '@angular/forms';
import { PostService } from './services/post.service';
import { HttpClient } from '@angular/common/http';
import * as cors from 'cors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'PetProject1';
  add:boolean=false;
  ngOnInit()
{
  this.service.getPosts();
  this.emplist=this.service.employees;
  this.reactiveForm=this.formBuilder.group(
    {
 name:new FormControl(null,[Validators.maxLength(100)]),
 Email:new FormControl(null,[Validators.required,Validators.email]),
 phone:new FormControl(null,[Validators.required,Validators.maxLength(10)]),
Gender:new FormControl('Male'),
 DOB:new FormControl(null),
 Age:new FormControl(null)


    }
   );
  }
  addEmployee()
  {
    this.add=true;
    this.addbutton=true;
    this.clearform();

  }
  del:boolean=false;
  delemp()
  {
    this.del=true;
  }
  posts:any;
  emplist:any=[];
  constructor(public service:PostService,private formBuilder:FormBuilder) {
  }
  addbutton:boolean=true;
 onEmpCreate(emp:{name:string,Email:string,phone:string,Gender:string,DOB:string,Age:number})
{
  if(this.reactiveForm.valid)
  {
    const employeeData=
    {
   name:emp.name,
   Email:emp.Email,
   phone:emp.phone,
   Gender:emp.Gender,
   DOB:emp.DOB,
   Age:emp.Age


    };


  console.log(emp);
  this.service.http.post(' http://localhost:7039/api/registeremployee',employeeData).subscribe
  ((res)=>
  {
    console.log(res);

  })
  this.clearform();

  alert("Added successfully");
  this.ngOnInit();
}
else{
  alert("Invalid input parameters,Please check...")
}


}
presentage!:number;
date:string='';

displayage:number=0;
result:number=0;
myFormControlDOB=new FormControl();
myFormControlAge=new FormControl();


calculateage()
{
const seldate=new Date(this.myFormControlDOB.value);
const year=new Date().getFullYear();
const syear=seldate.getFullYear();
this.displayage=year-syear;
this.myFormControlAge.setValue(this.displayage);
}
clearform()
{
  this.reactiveForm.controls['name'].setValue('');
  this.reactiveForm.controls['Email'].setValue('');
  this.reactiveForm.controls['phone'].setValue('');
  this.reactiveForm.controls['Gender'].setValue('');
  this.reactiveForm.controls['DOB'].setValue('');
  this.reactiveForm.controls['Age'].setValue('');


}
back()
{
  this.add=false;
}
idd!:string;
dclick(id:string)
{
  this.idd=id;

  this.del=true;
}
no()
{
  this.add=false;
  this.del=false;


}
deleted:boolean=false;
yes()
{
  alert('The employee record was deleted successfully')
  this.deleted=true;
}
selectedid!:string;
id!:string;
onDelEmp()
{
  this.id=this.idd;
  this.service.http.delete('http://localhost:7039/api/delemp/'+this.id).subscribe();
  console.log(this.id);
  alert('The employee record was deleted successfully')
  this.del=false;
  this.ngOnInit();

}
@ViewChild('empform') form!: FormGroup;
reactiveForm!: FormGroup;


onUpdEmp(id:string)
{
  this.selectedid=id;
  this.add=true;
  this.addbutton=false;

  let currentEmp=this.service.employees.find((e: { id: string; })=>
  
     e.id==id
  );
  console.log(this.form);
  this.reactiveForm.setValue(
    {
      name:currentEmp.name,
      Email:currentEmp.Email,
      phone:currentEmp.phone,

      Gender:currentEmp.Gender,
      DOB:currentEmp.DOB,

      Age:currentEmp.Age,

    }

  );

}
savemp(emp:{name:string,Email:string,phone:string,Gender:string,DOB:string,Age:number})
{
  this.service.employees.id=this.selectedid;
  console.log(emp);
  if(this.reactiveForm.valid)
  {
  this.service.http.put('http://localhost:7039/api/updateemployee/'+this.service.employees.id,emp).subscribe
  ((res)=>
  {
    console.log(res);
    this.ngOnInit();

  })
  this.add=false;
  this.ngOnInit();

}
else{
  alert('Invalid input parameters,Please check...')
}

}
}

