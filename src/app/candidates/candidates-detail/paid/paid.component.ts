import { Subscription } from 'rxjs/Subscription';
import { Transaction } from './../../../model/transaction.model';
import { DataStorageService } from './../../data-storage.service';
import { CandidateService } from './../../candidate.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-paid',
  templateUrl: './paid.component.html',
  styleUrls: ['./paid.component.css']
})
export class PaidComponent implements OnInit, OnDestroy {

  id: number;
  paidTransactions: Transaction[];
  subscription: Subscription;


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
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
