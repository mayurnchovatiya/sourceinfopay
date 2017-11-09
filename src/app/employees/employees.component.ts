import { Response } from '@angular/http';
import { DataStorageService } from './../candidates/data-storage.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private dsService: DataStorageService) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit(form: NgForm) {
    this.dsService.postEmployee(this.employeeForm.value).subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      },
      () => {
        console.log('employee added');
        alert('Employee added successfully!');
        this.employeeForm.reset();
      }
    );
  }

  private initForm() {
    let name = '';
    let role = '';

    this.employeeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'role': new FormControl(role, Validators.required)
    });
  }

}
