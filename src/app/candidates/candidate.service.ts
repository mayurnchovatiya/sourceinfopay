import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Commission } from './../model/commission.model';
import { SubVendor } from './../model/subvendor.model';
import { ManagerTwo } from './../model/managertwo.model';
import { ManagerOne } from './../model/managerone.model';
import { RecruiterEmployee } from './../model/recruiteremployee.model';
import { SalesEmployee } from './../model/salesemployee.model';
import { PrimeVendor } from '../model/primevendor.model';
import { Candidate } from './../model/candidate.model';


@Injectable()
export class CandidateService {
    candidateChanged = new Subject<Candidate[]>();

    private candidates: Candidate;
    private getAPICandidates: Candidate[] = [];

    constructor(private http: Http) {}

    // getCandidatesByAPI() {
    //     return this.http.get('http://localhost:8080/api/candidates')
    //         .map(

    //         (response: Response) => {
    //             const candidates: Candidate[] = response.json();
    //             return candidates;
    //         }
    //         )
    //         .subscribe(
    //         (candidatesData: Candidate[]) => {
    //             console.log('ds got candidate');
    //             console.log(candidatesData);
    //             this.getAPICandidates = candidatesData;
    //             console.log('service got candidate');
    //             console.log(this.getAPICandidates);
    //         }
    //         );
    //     }
    
            // ---- working ----
    
    // getCandidatesByAPI(): Observable<Candidate[]> {
    //     return this.http.get('http://localhost:8080/api/candidates')
    //         .map(
    //         (response: Response) => <Candidate[]>response.json()
    //     );
    // }
            // ---- working end----


    // storeCandidateByAPI(candidate: Candidate) {
    //   return this.http.post('http://localhost:8080/api/add-candidate', candidate);
    // }
    
    // setCandidate(candidates: Candidate[]) {
    //     this.getAPICandidates = candidates;
    //     // this.candidateChanged.next(this.candidates.slice());
    // }

    setCandidate(candidateData: Candidate[]) {
        this.getAPICandidates = candidateData;
        this.candidateChanged.next(this.getAPICandidates.slice());
    }

    getAPICandidatesMethod() {
        return this.getAPICandidates.slice();
    }

    getCandidates() {
        return this.candidates    ;
    }

    getCandidate(index: number) {
        return this.candidates;
    }

    // addCandiidate(candidate: Candidate) {
    //     this.candidates = candidate;
    //     //  this.candidateChanged.next(this.candidates.slice());
    // }

    updateCandidate(index: number, neRecipe: Candidate) {
        this.candidates[index] = neRecipe;
        // this.candidateChanged.next(this.candidates.slice());
    }

    // deleteCandidate(index: number) {
    //     this.candidates.splice(index, 1);
    //     this.candidateChanged.next(this.candidates.slice());
    // }
}
