import { Component } from '@angular/core';
import { Tarea } from '../models/Tarea';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConsultasToDoService } from '../services/consultasToDo.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  providers: [ ConsultasToDoService]
})
export class TareasComponent {

  public tareas : Array<Tarea> = [];
  private _route: ActivatedRoute;
  private _router: Router;
  public idProyecto: string = "";
  public tarea : Tarea;
  public mostrarForm : boolean = false;
  public idTareaSeleccionada : string = "";

  constructor ( private _consultasToDoService : ConsultasToDoService, _route: ActivatedRoute, _router: Router){
    this._route = _route;
    this._router=_router;
    this.tarea = new Tarea("", "", "", false, 1, "");
  }

  ngOnInit(){
    
    this._route.params.subscribe((params: Params)=>{
      console.log("Recibido por parámetro: ", params );
      this.idProyecto = params["proyecto"];
     });
    if (this.idProyecto == undefined ||this.idProyecto == ""){
      this.cargarTodasTareas();
    }else{
      this.cargarTareasProyecto();
    }
    this.idTareaSeleccionada = "";
    this.tarea = new Tarea("", "", "", false, 1, "");
  }

  resetearTarea(){
    this.tarea = new Tarea("", "", "", false, 1, "");
    console.log(this.tarea);
  }

  altaTarea(){
    // console.log("Formulario enviado", this.tarea);
    if (this.idProyecto == undefined ||this.idProyecto == ""){
      this.crearTareaInbox(this.tarea);
    }else{
      this.crearTareaProyecto(this.idProyecto, this.tarea);
    }
  }

  cargarTarea(idTarea : string){
    this._consultasToDoService.getTareaById(idTarea).subscribe(
      result =>{
        console.log(result);
        if (result!= null){
          for (let index = 0; index < result.length; index++){
            this.tarea=  new Tarea (result[index].id, result[index].content, result[index].description, result[index].is_completed, result[index].priority, result[index].due.date)
          }
        }            
      },
      error =>{
        console.error(error);
      }
    )

  }

  editarTarea(){
    console.log(this.tarea);
    this._consultasToDoService.updateTask(this.tarea.id ,this.crearObjetoTarea(this.tarea, "")).subscribe(
      result =>{
        console.log(result);
        // this._router.navigate(["/tareas"]);
        this.cargarTodasTareas();
      },
      error=>{
        console.error(error);
      }
    )

  }

  completarTarea(){
    if(this.idTareaSeleccionada != ""){
      this._consultasToDoService.completarTarea(this.idTareaSeleccionada).subscribe(
        result =>{
          console.log(result);
          // this.rellenarListaTareas(result);
          this.cargarTodasTareas();
        },
        error =>{
          console.error(error);
        }
      )
    }
  }

  eliminarTarea(){
    if(this.idTareaSeleccionada != ""){
      this._consultasToDoService.borrarTarea(this.idTareaSeleccionada).subscribe(
        result =>{
          // console.log(result);
          if (this.idProyecto == undefined ||this.idProyecto == ""){
            this.cargarTodasTareas();
          }else{
            this.cargarTareasProyecto();
          }
        },
        error =>{
          console.error(error);
        }
      )
    }
  }

  seleccionarTarea(idTarea : string){
    this.idTareaSeleccionada = idTarea;
    console.log("Id Tarea seleccionada: ", idTarea);
  }
  
  public crearTareaInbox(tarea:Tarea):void{
    this._consultasToDoService.createTask(this.crearObjetoTarea(tarea, "")).subscribe(
      result =>{
        console.log(result);
        // this._router.navigate(["/tareas"]);
        this.cargarTodasTareas();
      },
      error=>{
        console.error(error);
      }
    );

  }

  public crearTareaProyecto(idProyecto : string, tarea:Tarea):void{
    this._consultasToDoService.createTask(this.crearObjetoTarea(tarea, idProyecto)).subscribe(
      result =>{
        console.log(result);
        // this._router.navigate(["/tareas/"+idProyecto]);
        this.cargarTareasProyecto();
      },
      error=>{
        console.error(error);
      }
    );
  }



private cargarTodasTareas(){
  this._consultasToDoService.getAllTareas().subscribe(
    result =>{
      // console.log(result);
      this.rellenarListaTareas(result);          
    },
    error =>{
      console.error(error);
    }
  )
}

private cargarTareasProyecto(){
  this._consultasToDoService.getTareasByProyecto(this.idProyecto).subscribe(
    result =>{
      // console.log(result);
      this.rellenarListaTareas(result);          
    },
    error =>{
      console.error(error);
    }
  )
}

//Método auxiliar para crear el json de la tarea
  private crearObjetoTarea(tarea:Tarea, idProyecto : string): any{
    let task : any = "";
    if (idProyecto == null ||idProyecto == ""){
      task = {
        "content":tarea.getNombre(),
        "description":tarea.getDescripcion(),
        "priority":tarea.getPriority(),
        "due_date":tarea.getFechaLimite()
      }
    } else{
      task = {
        "content":tarea.getNombre(),
        "description":tarea.getDescripcion(),
        "project_id":idProyecto,
        "priority":tarea.getPriority(),
        "due_date":tarea.getFechaLimite()
      }
    }
    return task;     
  }

  private rellenarListaTareas(result : any): void{
    this.tareas = [];
    if (result!= null){
      for (let index = 0; index < result.length; index++){
        this.tareas.push(
          new Tarea (result[index].id, result[index].content, result[index].description, result[index].is_completed, result[index].priority, result[index].due.date)
        );
      }
    }    
    console.log (this.tareas);
  }
    

}
