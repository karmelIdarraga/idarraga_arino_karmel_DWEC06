import { Injectable } from "@angular/core";
import { Tarea } from "../models/Tarea";

@Injectable()
export class TareasService{

    private tareas : Array<Tarea>;

    constructor(){
        this.tareas = new Array<Tarea>;
    }

    public getTareas() : Array<Tarea>{
        return this.tareas;
    }

}