import { Subscription } from 'rxjs/Subscription';
import { Transaction } from './../../../model/transaction.model';
import { CandidateService } from './../../candidate.service';
import { Response } from '@angular/http';
import { DataStorageService } from './../../data-storage.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Resolve, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pv',
  templateUrl: './pv.component.html',
  styleUrls: ['./pv.component.css']
})
export class PvComponent implements OnInit, OnDestroy {
  pvForm: FormGroup;
  id: number;
  editMode = false;
  pvDetails: any[];
  subscription: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dsService: DataStorageService,
    private candiadteService: CandidateService
  ) { }

//   resolve (route: ActivatedRouteSnapshot): Promise<any> {
//     return this.dsService.getPvtransactions(this.id);
// }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.dsService.getPvtransactions(this.id);
        this.pvDetails = this.candiadteService.getPvDetails();
        this.subscription = this.candiadteService.pvDetailsChanged.subscribe(
          (pvDetailsData: any[]) => {
            this.pvDetails = pvDetailsData;
          }
        );
      }
    );
  }

  onSave() {
    console.log('PV Form');
    console.log(this.pvForm.value);
    this.dsService.postPvTransaction(this.id, this.pvForm.value).subscribe(
      (response: Response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('PV Detail added');
        this.dsService.getPvtransactions(this.id);
        this.pvDetails = this.candiadteService.getPvDetails();
        console.log('on save(): pvDetails:');
        console.log(this.pvDetails);
      }
    );
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
    let prime_vendor_paid_status = 'false';
    let prime_vendor_invoice_number = '';
    let actualPayment = '';
    let pvRate = '';

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
      'actualPayment': new FormControl(actualPayment),
      'pvRate': new FormControl(pvRate)
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
