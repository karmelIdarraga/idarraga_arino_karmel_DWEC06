import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  private _route: ActivatedRoute;
  private _router: Router;
  public idReserva: string = "";

  constructor(_route: ActivatedRoute, _router: Router) {
    this._route = _route;
    this._router=_router;
  }

  ngOnInit(): void {

    this._route.params.subscribe((params: Params)=>{
     console.log("Recibido por parámetro: ", params );
     this.idReserva = params["reserva"];
    });
  }

  redirigir(){
    this._router.navigate(["/home"]);
  }

}
