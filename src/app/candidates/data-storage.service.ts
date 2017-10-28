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
        return this.http.put('https://sourcepay-1fa7a.firebaseio.com/candidates.json',
            this.candidateService.getCandidates());
    }

    getCandidates() {
        this.http.get('https://sourcepay-1fa7a.firebaseio.com/candidates.json')
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