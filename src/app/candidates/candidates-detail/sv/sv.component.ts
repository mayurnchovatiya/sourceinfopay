import { Response } from '@angular/http';
import { CandidateService } from './../../candidate.service';
import { Subscription } from 'rxjs/Subscription';
import { Candidate } from './../../../model/candidate.model';
import { Transaction } from './../../../model/transaction.model';
import { DataStorageService } from './../../data-storage.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-sv',
  templateUrl: './sv.component.html',
  styleUrls: ['./sv.component.css']
})
export class SvComponent implements OnInit, OnDestroy {
  svForm: FormGroup;
  id: number;
  transactionId: number;
  editMode = false;
  totalAmount = 0;
  totalHours = 0;
  candidate: Candidate;
  svDetails: Transaction[] = [];
  recentTransaction: Transaction;
  svDetailByTid: Transaction;
  svDetailByTidForCheckBox: Transaction;
  subscription: Subscription;
  checkedIds: number[] = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidateService,
    private dsService: DataStorageService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // this.editMode = params['id'] != null;
        this.candidate = this.candidateService.getCandidateById(this.id);
        console.log('SV: Candidate: ');
        console.log(this.candidate);
        this.dsService.getRecentTransactions(this.id);
        this.recentTransaction = this.candidateService.getRecentTransactionDetails();
        console.log('SV: Recent Transaction: ');
        console.log(this.recentTransaction);
        this.dsService.getPvtransactions(this.id);
        this.svDetails = this.candidateService.getTransactionDetails();
        this.subscription = this.candidateService.transactionDetailsChanged.subscribe(
          (svDetailsData: Transaction[]) => {
            this.svDetails = svDetailsData;
          }
        );
        this.initForm();
      }
    );

  }

  onEditItem(transactionId: number) {
    this.transactionId = transactionId;
    this.editMode = true;
    this.svDetailByTid = this.candidateService.getTransactionDetailsByTid(transactionId);
    this.initForm();
  }

  onChecked(event, transactionId: number) {
    const data = _.where(this.svDetails, { isChecked: true });
    this.totalAmount = 0;
    this.totalHours = 0;
    data.forEach(item => {
        this.totalAmount += item.subvendoramount;
        this.totalHours += item.totalHours;
    });
  }

  onPay() {
    // this.boxChecked = false;
    console.log(this.svDetails);
    const data = _.where(this.svDetails, { isChecked: true });
    console.log(data);

    data.forEach(item => {
      const postData = {
        'transactionId': item.transactionId,
        'startdate': moment.utc(item.startdate).toISOString(),
        'enddate': moment.utc(item.enddate).toISOString(),
        'subvendorpaiddate': moment.utc(item.subvendorpaiddate).toISOString(),
        'totalHours': item.totalHours,
        'subvendoramount': item.subvendoramount,
        'subvendordeductions': item.subvendordeductions,
        'subvendorcomments': item.subvendorcomments,
        'subvendorpaidstatus': 'paid',
        'sub_vendorinvoicenumber': item.sub_vendorinvoicenumber,
        'subvendorrate': item.subvendorrate
      };
      console.log(postData);
      delete item['isChecked'];
      this.dsService.putTransaction(item.transactionId, postData).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('Paid Updated');
        }
      );
    });
  }

  onSubmit() {
    console.log('SV Details on submit');
    console.log(this.svForm.value);
    if (this.editMode) {
      this.dsService.putTransaction(this.transactionId, this.svForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('SV Detail Updated');
          this.dsService.getPvtransactions(this.id);
          this.svDetails = this.candidateService.getTransactionDetails();
          // this.editMode = false;
          this.onReset();
        }
      );
    } else {
      this.dsService.putTransaction(this.transactionId, this.svForm.value).subscribe(
        (response: Response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('SV Detail added');
          this.dsService.getPvtransactions(this.id);
          this.svDetails = this.candidateService.getTransactionDetails();
          // this.editMode = false;
          this.onReset();
        }
      );
    }
  }

  onReset() {
    this.editMode = false;
    this.initForm();
  }


  private initForm() {
    let startdate = new Date('');
    let enddate = new Date('');
    let subvendorpaiddate = new Date('');
    let totalHours = 0;
    let subvendoramount = 0;
    let subvendordeductions = 0;
    let subvendorcomments = '';
    let subvendorpaidstatus = 'unpaid';
    let sub_vendorinvoicenumber = '';
    let subvendorrate = this.candidate.svRate;

    // let startdate = this.recentTransaction[0].startdate;
    // let enddate = this.recentTransaction[0].enddate;
    // let subvendorpaiddate = this.recentTransaction[0].subvendorpaiddate;
    // let totalHours = this.recentTransaction[0].totalHours;
    // let subvendoramount = this.recentTransaction[0].subvendoramount;
    // let subvendordeductions = this.recentTransaction[0].subvendordeductions;
    // let subvendorcomments = this.recentTransaction[0].subvendorcomments;
    // let subvendorpaidstatus = this.recentTransaction[0].subvendorpaidstatus;
    // let sub_vendorinvoicenumber = this.recentTransaction[0].sub_vendorinvoicenumber;
    // let subvendorrate = this.candidate.svRate;

    if (this.editMode) {
      startdate = new Date(this.svDetailByTid.startdate);
      enddate = new Date(this.svDetailByTid.enddate);
      subvendorpaiddate = new Date(this.svDetailByTid.subvendorpaiddate);
      totalHours = this.svDetailByTid.totalHours;
      subvendoramount = this.svDetailByTid.subvendoramount;
      subvendorcomments = this.svDetailByTid.subvendorcomments;
      subvendorpaidstatus = this.svDetailByTid.subvendorpaidstatus;
      sub_vendorinvoicenumber = this.svDetailByTid.sub_vendorinvoicenumber;
      subvendorrate = this.svDetailByTid.candidate.svRate;
      if (this.svDetailByTid.deductionstobepassedtosubvendor === 'yes') {
        subvendordeductions = this.svDetailByTid.deductions;
        subvendoramount = (this.candidate.svRate * this.svDetailByTid.totalHours) - this.svDetailByTid.deductions;
      } else {
        subvendordeductions = this.svDetailByTid.subvendordeductions;
        subvendoramount = this.candidate.svRate * this.svDetailByTid.totalHours;
      }
    }

    this.svForm = new FormGroup({
      'startdate': new FormControl(startdate),
      'enddate': new FormControl(enddate),
      'subvendorpaiddate': new FormControl(subvendorpaiddate),
      'totalHours': new FormControl(totalHours),
      'subvendoramount': new FormControl(subvendoramount),
      'subvendordeductions': new FormControl(subvendordeductions),
      'subvendorcomments': new FormControl(subvendorcomments),
      'subvendorpaidstatus': new FormControl(subvendorpaidstatus),
      'sub_vendorinvoicenumber': new FormControl(sub_vendorinvoicenumber),
      'subvendorrate': new FormControl(subvendorrate)
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
