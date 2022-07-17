import { Component, DoBootstrap, OnInit } from '@angular/core';
import { StudentDashModel } from './studentdash.model';
import { ApiService } from '../shared/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  FormBuilder,
  Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {

  // boolean values for show and hide button in the form
  showAdd!:boolean;
  showUpdate!:boolean;
  formValue !: FormGroup;
  StudentModelObj:StudentDashModel = new StudentDashModel();

  constructor(private fb:FormBuilder, private apiService: ApiService) { }
  studentAll:any;
  ngOnInit(): void {
    this.formValue = this.fb.group({                        // getting details of student from form inputs
      firstName:[''],
      lastName:[''],
      email:[''],
      mobile:[''],
      fees:['']
    })
    this.getAllStudents()
    }

    clickAddStudent(){
      this.formValue.reset();
      // here we display 'showadd' button and 'showUpdate' button using boolean values
      this.showAdd = true;
      this.showUpdate = false;
    }
    // for uploading student details taken from the form inputs
    postStudentDetails(){
      this.StudentModelObj.firstName = this.formValue.value.firstName;
      this.StudentModelObj.lastName = this.formValue.value.lastName;
      this.StudentModelObj.email =this.formValue.value.email;
      this.StudentModelObj.mobile = this.formValue.value.mobile;
      this.StudentModelObj.fees = this.formValue.value.fees;

      this.apiService.postStudent(this.StudentModelObj).subscribe(res=>{
        console.log(res);
        alert("Student record added successfully");
        this.formValue.reset();          //to reset the values after the student details are added into the server
        this.getAllStudents();

      },
      err=>{
        alert("Something went wrong....!!!");
      })
    }
    // for getting all students list from the json-server
    getAllStudents(){
      this.apiService.getStudent().subscribe(res=>{
        this.studentAll =res;
      })
    }

    // for deleting the student details from the json-server using Student-dashboard UI
    deleteStudents(data:any){
      this.apiService.deleteStudent(data.id).subscribe(res=>{
        alert("Record delete successfully!!!");
        this.getAllStudents();
      })
    }

    OnEdit(data:any){
      this.showAdd = false;
      this.showUpdate = true;                  /** For displaying the 'update' button and hide-out the 'Add' button on 'edit details'  */

      this.StudentModelObj.id = data.id;

      this.formValue.controls['firstName'].setValue(data.firstName);
      this.formValue.controls['lastName'].setValue(data.lastName);
      this.formValue.controls['email'].setValue(data.email);
      this.formValue.controls['mobile'].setValue(data.mobile);
      this.formValue.controls['fees'].setValue(data.fees);
    }

    updateStudentDetails(){
      this.StudentModelObj.firstName = this.formValue.value.firstName;
      this.StudentModelObj.lastName = this.formValue.value.lastName;
      this.StudentModelObj.email = this.formValue.value.email;
      this.StudentModelObj.mobile = this.formValue.value.mobile;
      this.StudentModelObj.fees = this.formValue.value.fees;

      this.apiService.updateStudent(this.StudentModelObj,this.StudentModelObj.id).subscribe(res=>{
        alert("Record updated successfully!!!")
        this.formValue.reset();
        this.getAllStudents();
      })
    }
  }
