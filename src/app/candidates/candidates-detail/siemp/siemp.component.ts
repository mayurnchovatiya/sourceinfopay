import { Candidate } from './../../../model/candidate.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Transaction } from './../../../model/transaction.model';
import { DataStorageService } from './../../data-storage.service';
import { CandidateService } from './../../candidate.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-siemp',
  templateUrl: './siemp.component.html',
  styleUrls: ['./siemp.component.css']
})
export class SiempComponent implements OnInit, OnDestroy {

  id: number;
  paidTransactions: Transaction[];
  subscription: Subscription;
  candidate: Candidate;
  salesCommission = '';
  recruiterCommission = '';
  managerOneCommission = '';
  managerTwoCommission = '';


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
        this.dsService.getPaidTransactions(this.id);
        this.paidTransactions = this.candidateService.getPaidTransactionDetails();
        this.subscription = this.candidateService.paidTransactionDetailsChanged.subscribe(
          (paidTransactionData: Transaction[]) => {
            this.paidTransactions = paidTransactionData;
          }
        );
        this.candidate = this.candidateService.getCandidateById(this.id);
          this.salesCommission = this.candidate.commission.salesCommission;
          this.recruiterCommission = this.candidate.commission.recruiterCommission;
          this.managerOneCommission = this.candidate.commission.managerOneCommission;
          this.managerTwoCommission = this.candidate.commission.managerTwoCommission;
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
