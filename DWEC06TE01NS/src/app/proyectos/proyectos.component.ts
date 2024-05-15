import { Component } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { ConsultasToDoService } from '../services/consultasToDo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css',
  providers: [ ConsultasToDoService]
})
export class ProyectosComponent {

  public proyectos : Array<Proyecto> = [];
  private _route: ActivatedRoute;
  private _router: Router;

  constructor( private _consultasToDoService : ConsultasToDoService, _route: ActivatedRoute, _router: Router){
    this._route = _route;
    this._router=_router;
  }

  ngOnInit(): void{
    this.cargarProyectos();
  }

  cargarProyectos(){
    this._consultasToDoService.getAllProyectos().subscribe(
      result =>{
        // console.log(result);        
        for (let index = 0; index < result.length; index++){
          this.proyectos.push(
            new Proyecto (result[index].id, result[index].name, result[index].is_inbox_project, result[index].is_favorite, result[index].color)
          );
        }
        console.log (this.proyectos);
        
      },
      error =>{
        console.error(error);
      }
    )
  }

  verTareas(idProyecto : string){
    this._router.navigate(["/tareas/"+idProyecto]);
  }

}
