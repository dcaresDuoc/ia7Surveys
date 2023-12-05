import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { IListItemSurvey } from '../model/IListItemSurvey'; // Importa también IItemSurvey
import { IItemSurvey } from '../model/IItemSurvey';
import { IEncuesta } from '../model/IEncuesta';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  listItemSurvey: IListItemSurvey | undefined;
  // Inicializar las listas como IItemSurvey[]
  encuestas: IEncuesta[] = [];
  usuario : any;

  constructor(private activeroute: ActivatedRoute,private router: Router, public databaseserviceService: ApiservicesService, private authGuard : AuthGuard) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
          this.usuario = this.router.getCurrentNavigation()?.extras.state?.['username']
      }
  });

  this.consumirApi(this.router.getCurrentNavigation()?.extras.state?.['idcliente']);
  
  }

  ngOnInit() {
  }

  consumirApi(id:number) {
    this.databaseserviceService.GetSurveyListByClient(id).subscribe(
      (response: IEncuesta[]) => {
        this.encuestas = response; // Asigna la respuesta JSON al arreglo de encuestas
        console.log(this.encuestas); // Puedes ver las encuestas en la consola
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirIdEncuesta(encuesta: IItemSurvey) {

    let setData: NavigationExtras = {
      state: { user: encuesta.id,
        usuario : this.usuario }
    };
    this.router.navigate(['/asignacion'],setData);
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }


}
