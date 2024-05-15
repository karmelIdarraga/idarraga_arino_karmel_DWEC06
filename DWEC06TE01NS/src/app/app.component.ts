import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DWEC06TE01NS';
  public logueado : boolean = false;
  private _route: ActivatedRoute;
  private _router: Router;

  constructor(_route: ActivatedRoute, _router: Router) {
    this._route = _route;
    this._router=_router;
  }


  private login() : void{
    this.logueado = true;
  }

  private logout() : void{
    this.logueado = false;
    this._router.navigate(["/"]);
  }

  public loginOut() : void{
    if (this.logueado){
      this.logout();
    }else{
      this.login();
    }
  }
}
