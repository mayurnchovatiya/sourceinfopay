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
    // candidateByIdChanged = new Subject<Candidate>();
    pvDetailsChanged = new Subject<any[]>();

    // private candidate: Candidate;
    private candidatesArray: Candidate[] = [];
    private pvDetails: any[] = [];
    private employees: any[] = [];

    constructor(private http: Http) {}

    setCandidatesArray(candidatesData: Candidate[]) {
        this.candidatesArray = candidatesData;
        this.candidateChanged.next(this.candidatesArray.slice());
    }

    getCandidatesArray() {
        return this.candidatesArray.slice();
    }

    // setCandidateById(candidateData: Candidate) {
    //     this.candidate = candidateData;
    //     this.candidateByIdChanged.next(this.candidate);
    // }

    getCandidateById(index: number) {
         return this.candidatesArray.filter(candidateData => candidateData.candidateId === index)[0];
    }

    setPvDetails(pvDetails: any[]) {
        this.pvDetails = pvDetails;
        this.pvDetailsChanged.next(this.pvDetails.slice());
    }

    getPvDetails() {
        return this.pvDetails.slice();
    }

    getPvDetailsByTid(index: number) {
        return this.pvDetails.filter(pvDetailsData => pvDetailsData.transactionId === index)[0];
    }

    setEmployeesArray(employees) {
        this.employees = employees;
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

    // updateCandidate(index: number, newRecipe: Candidate) {
    //     this.candidates[index] = newRecipe;
    //      this.candidateChanged.next(this.candidates.slice());
    // }

    // deleteCandidate(index: number) {
    //     this.candidates.splice(index, 1);
    //     this.candidateChanged.next(this.candidates.slice());
    // }
}
