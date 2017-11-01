import { Response } from '@angular/http';
import { DataStorageService } from './../../data-storage.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pv', 
  templateUrl: './pv.component.html',
  styleUrls: ['./pv.component.css']
})
export class PvComponent implements OnInit { 
  pvForm: FormGroup;
  id: number;
  editMode = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dsService: DataStorageService
              ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSave() {
    console.log('PV Form');
    console.log(this.pvForm.value);
    // this.dsService.postPvTransaction(this.id, this.pvForm.value).subscribe(
    //    (response: Response) => {
    //      console.log(response);
    //    },
    //    (error) => {
    //      console.error(error);
    //    },
    //    () => {
         
    //    }
    // );
  }

  private initForm() {
    let start_date = '';
    let end_date = '';
    let prime_vendor_paid_date = '';
    let hours = '';
    let prime_vendor_amount = '';
    let deductions = '';
    let deductions_to_be_passed_to_sub_vendor = '';
    let prime_vendor_comments = '';
    let prime_vendor_paid_status = 'unpaid';
    let prime_vendor_invoice_number = '';
    let actualPayment = '';

    this.pvForm = new FormGroup({
      'start_date': new FormControl(start_date),
      'end_date': new FormControl(end_date),
      'prime_vendor_paid_date': new FormControl(prime_vendor_paid_date),
      'hours': new FormControl(hours),
      'prime_vendor_amount': new FormControl(prime_vendor_amount),
      'deductions': new FormControl(deductions),
      'deductions_to_be_passed_to_sub_vendor': new FormControl(deductions_to_be_passed_to_sub_vendor),
      'prime_vendor_comments': new FormControl(prime_vendor_comments),
      'prime_vendor_paid_status': new FormControl(prime_vendor_paid_status),
      'prime_vendor_invoice_number': new FormControl(prime_vendor_invoice_number),
      'actualPayment' : new FormControl(actualPayment)

    });

  }


}
