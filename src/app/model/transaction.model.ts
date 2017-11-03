import { SubVendor } from './subvendor.model';
import { PrimeVendor } from './primevendor.model';
import { Candidate } from './candidate.model';

export class Transaction {
    constructor(
        public candidate: Candidate,
        public startdate: string,
        public enddate: string,
        public primevendorpaiddate: string,
        public primevendorid: PrimeVendor,
        public primevendorrate: string,
        public deductions: string,
        public primevendorExpectedAmount: string,
        public primevendorActualPayment: string,
        public deductionstobepassedtosubvendor: string,
        public primevendorpaidstatus: string,
        public primevendorinvoicenumber: string,
        public primevendorcomments: string,
        public subvendorid: SubVendor,
        public subvendorrate: string,
        public subvendoramount: string,
        public subvendorpaiddate: string,
        public subvendorpaidstatus: string,
        public sub_vendorinvoicenumber: string,
        public subvendorcomments: string,
        public totalHours: string
    ) { }
}
