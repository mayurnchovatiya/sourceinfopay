import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Candidate } from './../model/candidate.model';
import { CandidateService } from './candidate.service';

import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
/*
http://localhost:8080/api/addtransactionsbyid/1
http://192.168.0.37:8080/api/add-candidate
http://192.168.0.37:8080/api/candidates
http://192.168.0.37:8080/api/addtransactionsbyid/
http://localhost:8080/api/getCandidateById/2
http://localhost:8080/api/update-candidate
*/

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private candidateService: CandidateService) {
    }


    /* post single candidate */
    postCandidate(candidate: Candidate) {
        return this.http.post('http://localhost:8080/api/add-candidate', candidate);
    }

    /* get candidates */
    getCandidates() {
        return this.http.get('http://localhost:8080/api/candidates')
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

    /* Update Candidate by ID*/
    putCandidate(index: number, candidate: Candidate) {
        return this.http.put('http://localhost:8080/api/update-candidate', candidate);
    }

    /* send PV detail by ID*/
    postPvTransaction(id: number, pvDetail: any) {
        return this.http.post('http://localhost:8080/api/addtransactionsbyid/' + id, pvDetail);
    }

    /* get PV details*/
    getPvtransactions(id: number) {
        return this.http.get('http://localhost:8080/api/gettransactions/' + id)
        .map(
            (response: Response) => {
                const pvDetails: any[] = response.json();
                return pvDetails;
            }
        )
        .subscribe( 
            (pvDetails: any[]) => {
                console.log('dsService: pvDetails:');
                console.log(pvDetails);
                this.candidateService.setPvDetails(pvDetails);
            }
        );
    }

    putPvTransaction(id: number, pvDetail: any) {
        return this.http.put('http://localhost:8080/api/updatetransactions/' + id, pvDetail);
    }

    /* send SV detail by ID*/
    postSvTransaction(id: number, svDetail: any) {
        return this.http.post('http://localhost:8080/api/addtransactionsbyid/' + id, svDetail);
    }

    /* get SV details*/
    // getSvtransactions(){
    //     return this.http.get('')
    //     .map(
    //         (response: Response) => {

    //         }
    //     )
    //     .subscribe(){
    //         () => {

    //         }
    //     }
    // }

    /* post employees */
    postEmployee(employee) {
        return this.http.post('http://localhost:8080/api/add-employee', employee);
    }
    /* get employees */
    getEmployees() {
        return this.http.get('http://localhost:8080/api/employees')
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
