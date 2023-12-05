import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./encuesta/encuesta.module').then( m => m.EncuestaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('./estadistica/estadistica.module').then( m => m.EstadisticaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'estadisticadetalle',
    loadChildren: () => import('./estadisticadetalle/estadisticadetalle.module').then( m => m.EstadisticadetallePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignacion',
    loadChildren: () => import('./asignacion/asignacion.module').then( m => m.AsignacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'generaencuesta',
    loadChildren: () => import('./generaencuesta/generaencuesta.module').then( m => m.GeneraencuestaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'homeadmin',
    loadChildren: () => import('./homeadmin/homeadmin.module').then( m => m.HomeadminPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asignarencuesta',
    loadChildren: () => import('./asignarencuesta/asignarencuesta.module').then( m => m.AsignarencuestaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'adminusuarios',
    loadChildren: () => import('./adminusuarios/adminusuarios.module').then( m => m.AdminusuariosPageModule)
  },
  {
    path: 'updateusuario',
    loadChildren: () => import('./updateusuario/updateusuario.module').then( m => m.UpdateusuarioPageModule)
  },
  {
    path: 'admincliente',
    loadChildren: () => import('./admincliente/admincliente.module').then( m => m.AdminclientePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
