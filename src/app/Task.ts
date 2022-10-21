export interface Task{
    _id:string;
    name:string;
    description:string;
    status: string;
    board_id: string;
    assigned_to: string;
    created_date:Date;
}