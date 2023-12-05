import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiservicesService } from '../services/apiservices.service';
import { IListItemSurvey } from '../model/IListItemSurvey';
import { IItemSurvey } from '../model/IItemSurvey';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  listItemSurvey: IListItemSurvey | undefined;
  enProceso: IItemSurvey[] = [];
  encuestasRealizadas: IItemSurvey[] = [];
  encuestasNoRealizadas: IItemSurvey[] = [];
  vencidas: IItemSurvey[] = [];

  usuario = "";

  private subscription: Subscription = new Subscription(); // Almacena la referencia de suscripción

  constructor(private activeroute: ActivatedRoute, private router: Router, public databaseserviceService: ApiservicesService, private authGuard:AuthGuard) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
          this.usuario = this.router.getCurrentNavigation()?.extras.state?.['username'];

      const userId = this.router.getCurrentNavigation()?.extras.state?.['id'];
      if (userId) {
        localStorage.setItem('userId', userId.toString());
      }
      }
    });

    this.initializeData();

    // Suscribirse al evento de cambio de ruta
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/home') {
        this.initializeData();
      }
    });

    this.subscription.add(routerSubscription); // Agregar suscripción a la propiedad
}

logout() {
  this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
  this.router.navigate(['/login']); // Redirigir al inicio de sesión
}

initializeData() {
    const id = this.router.getCurrentNavigation()?.extras.state?.['id'] || +localStorage.getItem('userId')!;
    console.log("iddd" + id);
    this.consumirApi(id);
}

ngOnInit() {
    this.initializeData();
}


  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Anular la suscripción cuando se destruye el componente
  }

  consumirApi(id: number) {
    this.databaseserviceService.GetSurveyListByUser(id).subscribe(
      (response) => {
        this.listItemSurvey = response as unknown as IListItemSurvey;

        // Asegúrate de que listItemSurvey tenga datos válidos antes de asignar las listas
        if (this.listItemSurvey) {
          this.enProceso = this.listItemSurvey.enProceso;
          this.encuestasRealizadas = this.listItemSurvey.completos;
          this.encuestasNoRealizadas = this.listItemSurvey.pendientes;
          this.vencidas = this.listItemSurvey.vencidos;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  abrirIdEncuesta(encuesta: IItemSurvey, realizada : boolean) {
    let setData: NavigationExtras = {
      state: { user: encuesta.id, isRealizada: realizada }
    };
    this.router.navigate(['/encuesta'], setData);
  }


}
