import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ModuleWithProviders } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';

const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'proyectos', component: ProyectosComponent},
    {path: 'proyectos/:proyecto', component: ProyectosComponent},
    {path: 'tareas', component: TareasComponent},
    {path: 'tareas/:proyecto', component: TareasComponent},
    {path: 'reservas', component: ReservasComponent},
    {path: 'reservas/:reserva', component: ReservasComponent},
    {path: 'about', component: AboutComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[]=[];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);