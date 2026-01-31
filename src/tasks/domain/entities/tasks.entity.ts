export class Task {
    constructor(
        public id: number,
        public project_id: number,
        public title: string,
        public is_completed: boolean | null,
        public due_date: Date | null,
        public project_name: string | null,
    ) { }
}