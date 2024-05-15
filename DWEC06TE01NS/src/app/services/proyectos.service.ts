import { Injectable } from "@angular/core";
import { Proyecto } from "../models/Proyecto";

@Injectable()
export class ProyectosService{

    private proyectos : Array<Proyecto>;

    constructor(){
        this.proyectos = [
            new Proyecto("12345", "Inbox",true, false, "charcoal" ),
            new Proyecto("2333194808", "DWEC", false, false, "grey")
        ];
    }

    public getProyectos() : Array<Proyecto>{
        return this.proyectos;
    }

}