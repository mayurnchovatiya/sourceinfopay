import { Transaction } from './../model/transaction.model';
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
    transactionDetailsChanged = new Subject<Transaction[]>();
    paidTransactionDetailsChanged = new Subject<Transaction[]>();
    employeesChanged  = new Subject<any[]>();

    private candidatesArray: Candidate[] = [];
    private transactionDetails: Transaction[] = [];
    private recentTransaction: Transaction;
    private paidTransactionDetails: Transaction[] = [];
    private employees: any[] = [];
    // private candidate: Candidate;

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
        console.log('candidate service: getCandidateById called');
         return this.candidatesArray.filter(candidateData => candidateData.candidateId === index)[0];
    }

    setTransactionDetails(pvDetails: Transaction[]) {
        this.transactionDetails = pvDetails;
        this.transactionDetailsChanged.next(this.transactionDetails.slice());
    }

    getTransactionDetails() {
        return this.transactionDetails.slice();
    }

    setRecentTransactionDetails(recentTransaction: Transaction) {
        this.recentTransaction = recentTransaction;
    }

    getRecentTransactionDetails() {
        return this.recentTransaction;
    }

    setPaidTransactionDetails(paidTransaction: Transaction[]) {
        this.paidTransactionDetails = paidTransaction;
        this.paidTransactionDetailsChanged.next(this.paidTransactionDetails.slice());
    }

    getPaidTransactionDetails() {
        return this.paidTransactionDetails.slice();
    }

    getTransactionDetailsByTid(index: number) {
        return this.transactionDetails.filter(transactionDetailsData => transactionDetailsData.transactionId === index)[0];
    }

    setEmployeesArray(employees) {
        this.employees = employees;
        this.employeesChanged.next(this.employees.slice());
    }

    getEmployeesArray() {
        return this.employees.slice();
    }
}
