import { Candidate } from './../../../model/candidate.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';

import { DataStorageService } from './../../data-storage.service';
import { CandidateService } from './../../candidate.service';
import { Transaction } from './../../../model/transaction.model';

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
  candidate: Candidate;
  pvDetails: Transaction[];
  pvDetailByTid: Transaction;
  subscription: Subscription;
  deductionCal: any;
  deductionToSv = [
    {value: 'yes'},
    {value: 'no'}
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dsService: DataStorageService,
              private candidateService: CandidateService
              ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // this.editMode = params['id'] != null;
        this.candidate = this.candidateService.getCandidateById(this.id);
        this.dsService.getPvtransactions(this.id);
        this.pvDetails = this.candidateService.getTransactionDetails();
        this.subscription = this.candidateService.transactionDetailsChanged.subscribe(
          (pvDetailsData: Transaction[]) => {
            this.pvDetails = pvDetailsData;
          }
        );
        this.initForm();
      }
    );
  }

  onEditItem(transactionId: number) {
    this.transactionId = transactionId;
    this.editMode = true;
    this.pvDetailByTid = this.candidateService.getTransactionDetailsByTid(transactionId);
    this.initForm();
  }

  onSubmit() {
    console.log('PV Details on submit');
    console.log(this.pvForm.value);
    if (this.editMode) {
      this.dsService.putTransaction(this.transactionId, this.pvForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('PV Detail Updated');
          this.dsService.getPvtransactions(this.id);
          this.pvDetails = this.candidateService.getTransactionDetails();
          // this.editMode = false;
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
          this.pvDetails = this.candidateService.getTransactionDetails();
          this.onReset();
        }
      );
    }
  }

  onReset() {
    this.editMode = false;
    this.initForm();
    // this.pvForm.reset();
  }

  onCancel() {}

  private initForm() {

    let startdate = new Date('');
    let enddate = new Date('');
    let primevendorpaiddate = new Date('');
    let totalHours = null;
    let primevendorExpectedAmount = 0;
    let primevendorActualPayment = 0;
    let deductions = 0;
    let deductionstobepassedtosubvendor = 'no';
    let primevendorcomments = '';
    let primevendorpaidstatus = 'unpaid';
    let primevendorinvoicenumber = '';
    let primevendorrate = this.candidate.pvRate;

    if (this.editMode) {
      startdate = new Date(this.pvDetailByTid.startdate);
      enddate = new Date(this.pvDetailByTid.enddate);
      primevendorpaiddate = new Date(this.pvDetailByTid.primevendorpaiddate);
      totalHours = this.pvDetailByTid.totalHours;
      primevendorExpectedAmount = this.pvDetailByTid.primevendorExpectedAmount;
      primevendorActualPayment = this. pvDetailByTid.primevendorActualPayment;
      deductions = this.pvDetailByTid.deductions;
      deductionstobepassedtosubvendor = this.pvDetailByTid.deductionstobepassedtosubvendor;
      primevendorcomments = this.pvDetailByTid.primevendorcomments;
      primevendorpaidstatus = this.pvDetailByTid.primevendorpaidstatus;
      primevendorinvoicenumber = this.pvDetailByTid.primevendorinvoicenumber;
      primevendorrate = this.candidate.pvRate;
    }

    this.pvForm = new FormGroup({
      'startdate': new FormControl(startdate),
      'enddate': new FormControl(enddate),
      'primevendorpaiddate': new FormControl(primevendorpaiddate),
      'totalHours': new FormControl(totalHours),
      'primevendorExpectedAmount': new FormControl(primevendorExpectedAmount),
      'primevendorActualPayment': new FormControl(primevendorActualPayment),
      'deductions': new FormControl(deductions),
      'deductionstobepassedtosubvendor': new FormControl(deductionstobepassedtosubvendor),
      'primevendorcomments': new FormControl(primevendorcomments),
      'primevendorpaidstatus': new FormControl(primevendorpaidstatus),
      'primevendorinvoicenumber': new FormControl(primevendorinvoicenumber),
      'primevendorrate': new FormControl(primevendorrate)
    });

    this.pvForm.get('totalHours').valueChanges.subscribe(
      (tHours) => {
        this.pvForm.get('primevendorExpectedAmount').setValue(tHours * primevendorrate);
      }
    );
    this.pvForm.get('deductions').valueChanges.subscribe(
      (deductionsValue) => {
        const updatedprimevendorExpectedAmount =  this.pvForm.get('primevendorExpectedAmount').value;
        this.pvForm.get('primevendorActualPayment').setValue((updatedprimevendorExpectedAmount - deductionsValue));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
