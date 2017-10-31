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
    private router: Router,
    private route: ActivatedRoute,
    private http: Http) { }

  ngOnInit() {

    // this.candidates = this.candidateService.getAPICandidatesMethod();
    this.candidateService.getCandidatesByAPI().subscribe(
      (candidateData) => this.candidates = candidateData,
      (candidateData) => this.candidates = candidateData
      

    );

    // this.http.get('http://localhost:8080/api/candidates')
    // .map(

    // (response: Response) => {
    //     const candidates: Candidate[] = response.json();
    //     console.log('ds getcandidate1');
    //     console.log(candidates);
    //     return candidates;
    // }
    // )
    // .subscribe(
    // (candidates: Candidate[]) => {
    //     console.log('ds getcandidate2');
    //     console.log(candidates);
    //     // this.candidateService.setCandidate(candidates);
    // }
    // );

    console.log('in list');
    console.log(this.candidates);
    // this.subscription =  this.candidateService.candidateChanged.subscribe(
    //   (candidates: Candidate) => {
    //     this.candidates = candidates;
    //   }
    // );
  }

  onNewCandidate() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
