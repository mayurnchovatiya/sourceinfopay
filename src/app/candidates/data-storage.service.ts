import { Observable } from 'rxjs/Observable';
import { Candidate } from './../model/candidate.model';
import { CandidateService } from './candidate.service';

import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
        private candidateService: CandidateService) {
    }


    //    firebase
    // storeCandidate() {
    //    const header = new Headers({'content-type': 'application/json'});
    //     return this.http.put('https://sourcepay-1fa7a.firebaseio.com/candidates.json',
    //         this.candidateService.getCandidates());
    // }

    // storeCandidate() {
    //     console.log(this.candidateService.getCandidates());
    //     // const headers = new Headers({'Content-Type': 'application/json'});    // , {headers: headers}
    //     return this.http.post('http://localhost:8080/api/add-candidate',
    //         this.candidateService.getCandidates());
    // }

    //    firebase
    // getCandidates() {
    //     this.http.get('https://sourcepay-1fa7a.firebaseio.com/candidates.json')
    //         .map(
    //         (response: Response) => {
    //             const candidates: Candidate[] = response.json();

    //             return candidates;
    //         }
    //         )
    //         .subscribe(
    //         (candidates: Candidate[]) => {
    //             this.candidateService.setCandidate(candidates);
    //         }
    //         );

    // }

    //    working get api
    // getCandidates(): Observable<Candidate[]> {
    //     return this.http.get('http://localhost:8080/api/candidates')
    //         .map(
    //         (response: Response) => <Candidate[]>response.json()
    //     );
    // }

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
                console.log('ds got candidate');
                console.log(candidates);
                this.candidateService.setCandidate(candidates);
            }
            );

    }

    /* send PV detail by ID*/
    postPvTransaction(id: number, pvDetail: any) {
        return this.http.post('http://localhost:8080/api/addtransactionsbyid/' + id, pvDetail);
    }

    /* get PV details*/
    // getPvtransactions(){
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




}
