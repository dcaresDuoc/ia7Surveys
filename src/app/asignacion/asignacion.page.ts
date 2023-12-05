import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { IAsignacion } from '../model/IAsignacion';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.page.html',
  styleUrls: ['./asignacion.page.scss'],
})
export class AsignacionPage implements OnInit {

  asig : IAsignacion[] = [];
  usuario : any;
  constructor(private activeroute: ActivatedRoute,private router: Router, public databaseserviceService: ApiservicesService, private authGuard:AuthGuard) {
        this.activeroute.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation()?.extras.state) {
             this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario']
          }
      });
      this.consumirApi(this.router.getCurrentNavigation()?.extras.state?.['user']);
   }

  ngOnInit() {
  }

  consumirApi(id:number) {
    this.databaseserviceService.GetSurveyListByClientAssigment(id).subscribe(
      (response: IAsignacion[]) => {
        this.asig = response; // Asigna la respuesta JSON al arreglo de encuestas
        console.log(this.asig); // Puedes ver las encuestas en la consola
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirIdEncuesta(encuesta: IAsignacion) {

    let setData: NavigationExtras = {
      state: { user: encuesta.id }
    };
    this.router.navigate(['/estadisticadetalle'],setData);
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }

}
