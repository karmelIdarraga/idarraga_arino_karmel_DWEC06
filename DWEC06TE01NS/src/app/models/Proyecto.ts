export class Proyecto{

    //atributos
    private id : string;
    private nombre : string;
    private inbox : boolean;
    private favourite : boolean;
    private colour : string;

    //constructor
    constructor(id : string, nombre : string, isInbox : boolean, isfavourite : boolean, colour : string){
        this.id = id;
        this.nombre = nombre;
        this.inbox = isInbox;
        this.favourite = isfavourite;
        this.colour = colour;
    }

    //metodos
    public getId() : string{
        return this.id;
    }

    public getNombre() : string{
        return this.nombre;
    }

    public isInbox() : boolean{
        return this.inbox;
    }

    public isFavourite() : boolean{
        return this.favourite;
    }

    public getColour() : string{
        return this.colour;
    }
    
    

}