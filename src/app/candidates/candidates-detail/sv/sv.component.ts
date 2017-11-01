import { DataStorageService } from './../../data-storage.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sv',
  templateUrl: './sv.component.html',
  styleUrls: ['./sv.component.css']
})
export class SvComponent implements OnInit {
  svForm: FormGroup;
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
    console.log('SV Form');
    console.log(this.svForm.value);
    //  this.dsService.postSvTransaction(this.id, this.svForm.value).subscribe(
    //    (response: Response) => {
    //      console.log(response);
    //    },
    //    (error) => {
    //      console.error(error);
    //    },
    //    () => {
         
    //    }
    //  );
  }

  private initForm() {
    let start_date = '';
    let end_date = '';
    let hours = '';
    let calculatedAmount = '';
    let sub_vendor_amount = '';
    let deductionFromPv = '';
    let sub_vendor_comments = '';
    let sub_vendor_paid_status = 'unpaid';
    let sub_vendor_invoice_number = '';

    this.svForm = new FormGroup({
      'start_date': new FormControl(start_date),
      'end_date': new FormControl(end_date),
      'hours': new FormControl(hours),
      'calculatedAmount': new FormControl(calculatedAmount),
      'sub_vendor_amount': new FormControl(sub_vendor_amount),
      'deductionFromPv': new FormControl(deductionFromPv),
      'sub_vendor_comments': new FormControl(sub_vendor_comments),
      'sub_vendor_paid_status': new FormControl(sub_vendor_paid_status),
      'sub_vendor_invoice_number': new FormControl(sub_vendor_invoice_number),

    });

  }


}
