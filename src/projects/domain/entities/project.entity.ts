import { User } from "src/user/domain/entities/user.entity";

export class Project {
    private constructor(
        public readonly id: number,
        public user_id: number,
        public title: string,
        public description: string | null,
        public user_name: string,
        public user_email: string,
    ) { }

    static create(
        id: number,
        user_id: number,
        title: string,
        description: string | null,
        user_name: string,
        user_email: string,
    ) {
        return new Project(id, user_id, title, description, user_name, user_email);
    }

}