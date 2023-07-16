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
  componentname="user"
  title="PetProject1"
constructor(public service:PostService,private formBuilder:FormBuilder)
 {

 }
ngOnInit()
{
  this.service.getPosts();
  this.emplist=this.service.employees;
  this.reactiveForm=this.formBuilder.group(
    {
 id:new FormControl(null,Validators.required),
 Name:new FormControl(null,[Validators.maxLength(100)]),
 Email:new FormControl(null,[Validators.required,Validators.email]),
 Phone:new FormControl(null,[Validators.required,Validators.maxLength(10)]),
 Gender:new FormControl('Male'),
DOB:this.myFormControlDOB,
 Age:this.myFormControlAge
    }
   );
}
createid:boolean=false;
onEmpCreate(emp:{id:string,Name:string,Email:string,Phone:string,Gender:string,DOB:string,Age:string})
{
  this.createid=true;
  if(this.reactiveForm.valid)
  {
    const employeeData=  
    {
   id:emp.id,
   Name:emp.Name,
   Email:emp.Email,
   Phone:emp.Phone,
   Gender:emp.Gender,
   DOB:this.myFormControlDOB.value,
   Age:this.myFormControlAge.value


    };
    this.id=emp.id;


  console.log(emp);
  this.service.http.post(' http://localhost:7039/api/registeremployee/'+this.id,employeeData).subscribe
  ((res)=>
  {
    console.log(res);
    console.log(emp.Age)

  })
  this.clearform();

  alert("Added successfully");
  this.ngOnInit();
}
else{
  alert("Invalid input parameters,Please check...")
}


}
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
  this.createid=false;
  this.selectedid=id;
  this.add=true;
  this.addbutton=false;

  let currentEmp=this.service.employees.find((e: { id: string; })=>
  
     e.id==id
  );
  console.log(currentEmp);
  let currentage=currentEmp.Age.toString();
  let dobvalue=currentEmp.DOB;
  this.reactiveForm.setValue(
    {
      id:currentEmp.id,
      Name:currentEmp.name,
      Email:currentEmp.Email,
      Phone:currentEmp.phone,
      Gender:currentEmp.Gender,
      DOB:dobvalue,
      Age:currentage

    }

  );
}
savemp(emp:{Name:string,Email:string,Phone:string,Gender:string,DOB:string,Age:string})
{
  this.service.employees.id=this.selectedid;
  console.log(emp);
  if(this.reactiveForm.valid)
  {
    emp.DOB=this.reactiveForm.value.DOB;
    emp.Age=this.reactiveForm.value.Age;
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


addEmployee()
  {
    this.createid=true;
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
  
  addbutton:boolean=true;
  presentage!:number;
date:string='';
myFormControlDOB=new FormControl();
// dob:any=this.myFormControlDOB.value;
myFormControlAge=new FormControl();
myformcontrolid=new FormControl();
calculateage()
{
  console.log("DOB Value",this.myFormControlDOB.value
  )
const seldate=new Date(this.myFormControlDOB.value);
const year=new Date().getFullYear();
const syear=seldate.getFullYear();
this.displayage=year-syear;
this.myFormControlAge.setValue(this.displayage);
console.log("my age",this.myFormControlAge.value)
}
clearform()
{
  this.reactiveForm.controls['id'].setValue('');
  this.reactiveForm.controls['Name'].setValue('');
  this.reactiveForm.controls['Email'].setValue('');
  this.reactiveForm.controls['Phone'].setValue('');
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
[x: string]: any;
add:boolean=false;
displayage:number=0;
result:number=0;


}
