import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CandidateService } from './candidate.service';
import { Candidate } from './../model/candidate.model';
import { Transaction } from './../model/transaction.model';

/*
http://localhost:8080/api/addtransactionsbyid/1
http://192.168.0.37:8080/api/add-candidate
http://192.168.0.37:8080/api/candidates
http://192.168.0.37:8080/api/addtransactionsbyid/
http://localhost:8080/api/getCandidateById/2
http://localhost:8080/api/update-candidate
getrecenttransactions
paidtab/{id}
*/

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private candidateService: CandidateService) {
    }


    /* post single candidate */
    postCandidate(candidate: Candidate) {
        return this.http.post('http://192.168.0.37:8080/api/add-candidate', candidate);
    }

    /* get candidates */
    getCandidates() {
        return this.http.get('http://192.168.0.37:8080/api/candidates')
            .map(

            (response: Response) => {
                const candidates: Candidate[] = response.json();
                return candidates;
            }
            )
            .subscribe(
            (candidates: Candidate[]) => {
                console.log('in ds service: candidate:');
                console.log(candidates);
                this.candidateService.setCandidatesArray(candidates);
            }
            );

    }

    /* Update Candidate by ID*/
    putCandidate(index: number, candidate: Candidate) {
        return this.http.put('http://192.168.0.37:8080/api/update-candidate', candidate);
    }

    /* get candidate By Id */
    // getCandidateById(id: number) {
    //     return this.http.get('http://localhost:8080/api/getCandidateById/' + id)
    //         .map(

    //         (response: Response) => {
    //             const candidate: Candidate = response.json();
    //             return candidate;
    //         }
    //         )
    //         .subscribe(
    //         (candidate: Candidate) => {
    //             console.log('dsService: Candidate: ');
    //             console.log(candidate);
    //             this.candidateService.setCandidateById(candidate);
    //         }
    //         );

    // }

    /* send PV detail by ID*/
    postPvTransaction(id: number, pvDetail: Transaction) {
        return this.http.post('http://192.168.0.37:8080/api/addtransactionsbyid/' + id, pvDetail);
    }

    /* get PV and SV details*/
    getPvtransactions(id: number) {
        return this.http.get('http://192.168.0.37:8080/api/gettransactions/' + id)
            .map(
            (response: Response) => {
                const pvDetails: Transaction[] = response.json();
                return pvDetails;
            }
            )
            .subscribe(
            (pvDetails: Transaction[]) => {
                console.log('dsService: pvDetails:');
                console.log(pvDetails);
                this.candidateService.setTransactionDetails(pvDetails);
            }
            );
    }

    /* get recent PV and SV details*/
    getRecentTransactions(candidateId: number) {
        return this.http.get('http://192.168.0.37:8080/api/getrecenttransactions/' + candidateId)
            .map(
            (response: Response) => {
                const recentTransaction: Transaction = response.json();
                return recentTransaction;
            }
            )
            .subscribe(
            (recentTransaction: Transaction) => {
                console.log('dsService: recentTransaction:');
                console.log(recentTransaction);
                this.candidateService.setRecentTransactionDetails(recentTransaction);
            }
            );
    }

    /* get paid transactions*/
    getPaidTransactions(candidateId: number) {
        return this.http.get('http://192.168.0.37:8080/api/paidtab/' + candidateId)
            .map(
            (response: Response) => {
                const paidTransaction: Transaction[] = response.json();
                return paidTransaction;
            }
            )
            .subscribe(
            (paidTransaction: Transaction[]) => {
                console.log('dsService: recentTransaction:');
                console.log(paidTransaction);
                this.candidateService.setPaidTransactionDetails(paidTransaction);
            }
            );
    }

    /* update PV and SV details */
    putTransaction(id: number, detail: any) {
        return this.http.put('http://192.168.0.37:8080/api/updatetransactions/' + id, detail);
    }


    /* post employees */
    postEmployee(employee) {
        return this.http.post('http://192.168.0.37:8080/api/add-employee', employee);
    }
    /* get employees */
    getEmployees() {
        return this.http.get('http://192.168.0.37:8080/api/employees')
            .map(

            (response: Response) => {
                const employees: any = response.json();
                return employees;
            }
            )
            .subscribe(
            (employees: any) => {
                this.candidateService.setEmployeesArray(employees);
            }
            );

    }




}
