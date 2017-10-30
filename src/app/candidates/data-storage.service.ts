import { Candidate } from './../model/candidate.model';
import { CandidateService } from './candidate.service';

import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private candidateService: CandidateService) {
    }

    storeCandidate() {
        return this.http.post('http://localhost:8080/api/add-candidate',
            this.candidateService.getCandidates());
    }

    getCandidates() {
        this.http.get('http://localhost:8080/api/candidates')
            .map(
            (response: Response) => {
                const candidates: Candidate[] = response.json();

                return candidates;
            }
            )
            .subscribe(
            (candidates: Candidate[]) => {
                this.candidateService.setCandidate(candidates);
            }
            );

    }


}