export class Task {
    private constructor(
        public id: number,
        public project_id: number,
        public title: string,
        public is_completed: boolean | null,
        public due_date: Date | null,
        public project_name: string | null,
    ) { }

    static create(
        id: number,
        project_id: number,
        title: string,
        is_completed: boolean | null,
        due_date: Date | null,
        project_name: string | null,
    ) {
        return new Task(id, project_id, title, is_completed, due_date, project_name);
    }

}