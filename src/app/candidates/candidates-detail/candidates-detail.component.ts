import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CandidateService } from './../candidate.service';
import { Candidate } from './../../model/candidate.model';


@Component({
  selector: 'app-candidates-detail',
  templateUrl: './candidates-detail.component.html',
  styleUrls: ['./candidates-detail.component.css']
}) 
export class CandidatesDetailComponent implements OnInit {
  candidates: Candidate;
  id: number;
  constructor(private candidateService: CandidateService,
              private route: ActivatedRoute,
              private router: Router
            ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.candidates = this.candidateService.getCandidate(this.id);
      }
    );
  }

  onEditCandidate() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit']. {relativeTo: this.route});
  }

  onDeleteCandidate() {
    this.candidateService.deleteCandidate(this.id);
    this.router.navigate(['/candidates']);
  }

}
