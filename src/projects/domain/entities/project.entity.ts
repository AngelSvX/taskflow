import { User } from "src/user/domain/entities/user.entity";

export class Project {
    constructor(
        public readonly id: number,
        public user_id: number,
        public title: string,
        public description: string | null,
        public user_name: string,
    ) { }
}