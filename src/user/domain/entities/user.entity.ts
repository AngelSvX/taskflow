export class User {
    constructor(
        public readonly id: string | null,
        public name: string,
        public email: string,
        public password: string,
    ) { }
}