import { Commission } from './commission.model';
import { ManagerTwo } from './managertwo.model';
import { ManagerOne } from './managerone.model';
import { RecruiterEmployee } from './recruiteremployee.model';
import { SalesEmployee } from './salesemployee.model';
import { SubVendor } from './subvendor.model';
import { PrimeVendor } from './primevendor.model';


export class Candidate {
    constructor(
        public candidateId: number,
        public candidateName: string,
        public startDate: string,
        public endDate: string,
        public pvRate: string,
        public svRate: string,
        public primeVendor: PrimeVendor,
        public subVendor: SubVendor,
        public salesEmployee: SalesEmployee,
        public recruiterEmployee: RecruiterEmployee,
        public managerOne: ManagerOne,
        public managerTwo: ManagerTwo,
        public commission: Commission,


    ) { }
}