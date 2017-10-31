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
    private getAPICandidates: Candidate[];
    // new Candidate(
    //     'Candidate 1',
    //     '1-1-12',
    //     '1-1-15',
    //     '80',
    //     '60',
    //     new PrimeVendor('ATT', 'Andi', 'Austin', '1234567890', 'andi@gmail.com', '12345'),
    //     new SubVendor('Chase', 'Mary', 'Dallas', '6789012345', 'mary@gmail.com', '54321'),
    //     new SalesEmployee('Harshit', 'Manager'),
    //     new RecruiterEmployee('Ketan', 'CEO'),
    //     new ManagerOne('Jigo', 'man1'),
    //     new ManagerTwo('Jago', 'man2'),
    //     new Commission('1', '2', '3', '4')
    // ),
    // new Candidate(
    //     'Candidate 2',
    //     '1-1-12',
    //     '1-1-15',
    //     '80',
    //     '60',
    //     new PrimeVendor('ATT', 'Andi', 'Austin', '1234567890', 'andi@gmail.com', '12345'),
    //     new SubVendor('Chase', 'Mary', 'Dallas', '6789012345', 'mary@gmail.com', '54321'),
    //     new SalesEmployee('Harshit', 'Manager'),
    //     new RecruiterEmployee('Ketan', 'CEO'),
    //     new ManagerOne('Jigo', 'man1'),
    //     new ManagerTwo('Jago', 'man2'),
    //     new Commission('1', '2', '3', '4')
    // ),
    // new Candidate(
    //     'Candidate 3',
    //     '1-1-12',
    //     '1-1-15',
    //     '80',
    //     '60',
    //     new PrimeVendor('ATT', 'Andi', 'Austin', '1234567890', 'andi@gmail.com', '12345'),
    //     new SubVendor('Chase', 'Mary', 'Dallas', '6789012345', 'mary@gmail.com', '54321'),
    //     new SalesEmployee('Harshit', 'Manager'),
    //     new RecruiterEmployee('Ketan', 'CEO'),
    //     new ManagerOne('Jigo', 'man1'),
    //     new ManagerTwo('Jago', 'man2'),
    //     new Commission('1', '2', '3', '4')
    // )
    constructor(private http: Http) {}

    getCandidatesByAPI(): Observable<Candidate[]> {
        return this.http.get('http://localhost:8080/api/candidates')
            .map(
            (response: Response) => <Candidate[]>response.json()
        );
    }
    // setCandidate(candidates: Candidate[]) {
    //     this.getAPICandidates = candidates;
    //     // this.candidateChanged.next(this.candidates.slice());
    // }

    // getAPICandidatesMethod() {
    //     return this.getAPICandidates;
    // }

    getCandidates() {
        return this.candidates    ;
    }

    getCandidate(index: number) {
        return this.candidates;
    }

    addCandiidate(candidate: Candidate) {
        this.candidates = candidate;
        //  this.candidateChanged.next(this.candidates.slice());
    }

    updateCandidate(index: number, neRecipe: Candidate) {
        this.candidates[index] = neRecipe;
        // this.candidateChanged.next(this.candidates.slice());
    }

    // deleteCandidate(index: number) {
    //     this.candidates.splice(index, 1);
    //     this.candidateChanged.next(this.candidates.slice());
    // }
}
