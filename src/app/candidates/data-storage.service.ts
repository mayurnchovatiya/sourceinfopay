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
                this.candidateService.setCandidate(candidates);
            }
            );

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

    // resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    //     return this.http
    //         .get('api/Movie/GetAllMovies', this.options)
    //         .toPromise()
    //         .then((result: MovieListModel) => {
    //             return result;
    //         })
    //         .catch(error => console.log(error));
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
