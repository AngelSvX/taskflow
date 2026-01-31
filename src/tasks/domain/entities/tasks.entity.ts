export class Task {
    constructor(
        public id: number,
        public project_id: number,
        public title: string,
        public is_completed: boolean,
        public due_date: Date,
        public project_name: string,
    ) { }
}