import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Configuracion } from "../models/Configuracion";

@Injectable()
export class ConsultasToDoService{

    public url: string;
    private token : string;
    private headerPost : HttpHeaders;
    private headerGet : HttpHeaders;
    private Idsession : string;

    constructor(public _http : HttpClient){
        this.url = Configuracion.urlBase;
        this.token = Configuracion.userToken;
        this.Idsession = this.randomString(8);
        this.headerPost = new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Accept':'*/*',
            'X-Request-Id':this.Idsession,
            'Authorization': `Bearer ${this.token}`
        });
        this.headerGet = new HttpHeaders({
            'Content-Type': 'application/json',
            'X-Request-Id':this.Idsession,
            'Authorization': `Bearer ${this.token}`
        });
        // this.headerPost.append('Access-Control-Allow-Headers', 'accept', 'Content-Type');
    }

    public getAllProyectos() : Observable<any>{
        return this._http.get( this.url + "/projects", { headers: this.headerGet });
    }

    public getAllTareas() : Observable<any>{
        return this._http.get( this.url + "/tasks", { headers: this.headerGet });
    }

    public getTareasByProyecto(idProyecto : string) : Observable<any>{
        return this._http.get( this.url + "/tasks?project_id=" + idProyecto, { headers: this.headerGet });
    }

    public getTareaById(idTarea : string) : Observable<any>{
        return this._http.get( this.url + "/tasks?ids=" + idTarea, { headers: this.headerGet });
    }

    public createTask(tarea : any) : Observable<any>{
        return this._http.post(this.url + "/tasks", tarea, { headers: this.headerPost });
    }

    public updateTask(idTarea : string, datos:any) : Observable<any>{
        return this._http.put(this.url + "/tasks/"+idTarea, datos, { headers: this.generaHeaderPost() });
    }

    public completarTarea(idTarea:string) : Observable<any>{
        return this._http.post(this.url + "/tasks/"+idTarea+"/close", { headers: this.generaHeaderPost() });
    }

    public reabrirTarea(idTarea:string) : Observable<any>{
        return this._http.post(this.url + "/tasks/"+idTarea+"/reopen", { headers: this.headerPost });
    }

    public borrarTarea(idTarea:string) : Observable<any>{
        return this._http.delete(this.url + "/tasks/"+idTarea, { headers: this.headerPost });
    }
    private generaHeaderPost():HttpHeaders{
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept':'*/*',
            'X-Request-Id':this.randomString(24),
            'Authorization': `Bearer ${this.token}`
        });
    }

    private randomString(length:number) : string {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < length; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

}