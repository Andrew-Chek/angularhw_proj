export class Board{
    constructor(id:number, name:string, description:string, creation_date:string)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.creation_date = creation_date;
    }
    public id:number;
    public name:string;
    public description:string;
    public creation_date:string;
}