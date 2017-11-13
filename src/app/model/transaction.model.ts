import { SubVendor } from './subvendor.model';
import { PrimeVendor } from './primevendor.model';
import { Candidate } from './candidate.model';

export class Transaction {
    constructor(
        public transactionId: number,
        public candidate: Candidate,
        public startdate: string,
        public enddate: string,
        public primevendorpaiddate: string,
        public primevendorid: PrimeVendor,
        public primevendorrate: number,
        public deductions: number,
        public primevendorExpectedAmount: number,
        public primevendorActualPayment: number,
        public deductionstobepassedtosubvendor: string,
        public primevendorpaidstatus: string,
        public primevendorinvoicenumber: string,
        public primevendorcomments: string,
        public subvendorid: SubVendor,
        public subvendorrate: number,
        public subvendoramount: number,
        public subvendorpaiddate: Date,
        public subvendordeductions: number,
        public subvendorpaidstatus: string,
        public sub_vendorinvoicenumber: string,
        public subvendorcomments: string,
        public totalHours: number
    ) { }
}
