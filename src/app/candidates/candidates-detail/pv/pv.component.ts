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
  transactionId: number;
  editMode = false;
  pvDetails: any[];
  pvDetailByTid: any;
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
        // this.editMode = params['id'] != null;
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

  onEditItem(transactionId: number) {
    this.transactionId = transactionId;
    this.editMode = true;
    this.pvDetailByTid = this.candiadteService.getPvDetailsByTid(transactionId);
    this.initForm();
  }

  onSubmit() {
    if (this.editMode) {
      this.dsService.putPvTransaction(this.transactionId, this.pvForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('PV Detail Updated');
          this.dsService.getPvtransactions(this.id);
          this.pvDetails = this.candiadteService.getPvDetails();
          this.editMode = false;
          this.onReset();
        }
      );
    } else {
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
          this.onReset();
        }
      );
    }
  }

  onReset() {
    this.pvForm.reset();
  }

  private initForm() {
    let start_date = new Date('');
    let end_date = new Date('');
    let prime_vendor_paid_date = new Date('');
    let hours = '';
    let prime_vendor_amount = '';
    let deductions = '';
    let deductions_to_be_passed_to_sub_vendor = '';
    let prime_vendor_comments = '';
    let prime_vendor_paid_status = 'false';
    let prime_vendor_invoice_number = '';
    let actualPayment = '';
    let pvRate = '';

    if (this.editMode) {
      start_date = new Date(this.pvDetailByTid.start_date);
      end_date = new Date(this.pvDetailByTid.end_date);
      prime_vendor_paid_date = new Date(this.pvDetailByTid.prime_vendor_paid_date);
      hours = this.pvDetailByTid.hours;
      prime_vendor_amount = this.pvDetailByTid.prime_vendor_amount;
      deductions = this.pvDetailByTid.deductions;
      deductions_to_be_passed_to_sub_vendor = this.pvDetailByTid.deductions_to_be_passed_to_sub_vendor;
      prime_vendor_comments = this.pvDetailByTid.prime_vendor_comments;
      prime_vendor_paid_status = this.pvDetailByTid.prime_vendor_paid_status;
      prime_vendor_invoice_number = this.pvDetailByTid.prime_vendor_invoice_number;
      actualPayment = this.pvDetailByTid.actualPayment;
      pvRate = this.pvDetailByTid.pvRate;
    }

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
