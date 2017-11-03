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
    pvDetailsChanged = new Subject<any[]>();

    private candidate: Candidate;
    private candidatesArray: Candidate[] = [];
    private pvDetails: any[] = [];

    constructor(private http: Http) {}

    setCandidate(candidateData: Candidate[]) {
        this.candidatesArray = candidateData;
        this.candidateChanged.next(this.candidatesArray.slice());
    }

    getAPICandidatesMethod() {
        return this.candidatesArray.slice();
    }

    setPvDetails(pvDetails: any[]) {
        this.pvDetails = pvDetails;
        this.pvDetailsChanged.next(this.pvDetails.slice());
        console.log('candidate sercice: setPvDetails():');
        console.log(this.pvDetails);
    }

    getPvDetails() {
        return this.pvDetails.slice();
    }

    // getCandidates() {
    //     return this.postCandidate;
    // }

    // getCandidate(index: number) {
    //     return this.candidates;
    // }

    // addCandiidate(candidate: Candidate) {
    //     this.candidates = candidate;
    //       this.candidateChanged.next(this.candidates.slice());
    // }

    // updateCandidate(index: number, neRecipe: Candidate) {
    //     this.candidates[index] = neRecipe;
    //      this.candidateChanged.next(this.candidates.slice());
    // }

    // deleteCandidate(index: number) {
    //     this.candidates.splice(index, 1);
    //     this.candidateChanged.next(this.candidates.slice());
    // }
}
