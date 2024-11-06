export interface task {
    itemId: number,
    taskName: string,
    taskDescription: string,
    dueDate: Date,
    createdOn?: Date,
    isCompleted: boolean,
    tags:string[],
    completedOn?: Date
}

export class Task{
    constructor(){

    }
    
}