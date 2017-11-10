
export class Commission {
    constructor(
        public commissionId: number,
        public salesCommission: string,
        public recruiterCommission: string,
        public managerOneCommission: string,
        public managerTwoCommission: string,
    ) { }
}