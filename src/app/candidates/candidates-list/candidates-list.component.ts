import { Http, Response } from '@angular/http';
import { DataStorageService } from './../data-storage.service';
import { CandidateService } from './../candidate.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from './../../model/candidate.model';


@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit, OnDestroy {

  @Output() candidateWasSelected = new EventEmitter<Candidate>();

  subscription: Subscription;
  candidates: Candidate[];

  constructor(private candidateService: CandidateService,
    private dsService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private http: Http) { }

  ngOnInit() {
    this.dsService.getCandidates();
    this.candidates = this.candidateService.getCandidatesArray();
    this.subscription = this.candidateService.candidateChanged.subscribe(
      (candidatesData: Candidate[]) => {
        this.candidates = candidatesData; 
      }
    );

    //  ---- working -----
    // this.candidateService.getCandidatesByAPI().subscribe(
    //   (candidateData) => this.candidates = candidateData,
    // );
    //  ---- working end -----
  }

  onNewCandidate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
