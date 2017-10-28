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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.candidates = this.candidateService.getCandidates();
    this.subscription =  this.candidateService.candidateChanged.subscribe(
      (candidates: Candidate[]) => {
        this.candidates = candidates;
      }
    );
  }

  onNewCandidate(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
