import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { IUsuario } from '../model/IUsuario';
import { IEncuesta } from '../model/IEncuesta';
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-asignarencuesta',
  templateUrl: './asignarencuesta.page.html',
  styleUrls: ['./asignarencuesta.page.scss'],
})
export class AsignarencuestaPage implements OnInit {

  username:any;
  idcliente:any;
  encuestas: IEncuesta[] = [];

  clientes: any[] = [] ;
  usuarios: any[] = [];
  selectedUserId: number | undefined; 

  selectedEncuestaId: number | undefined;
  fechaLimite: string | undefined;


  constructor(private router:Router,private activeroute: ActivatedRoute,private apiService: ApiservicesService,private alertController:AlertController, private authGuard : AuthGuard) {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.username = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.idcliente = this.router.getCurrentNavigation()?.extras.state?.['idcliente'];
        console.log(this.idcliente);
        
        }
    });
   }

   roles = [
    { value: 0, label: 'Admin' },
    { value: 1, label: 'Técnico' },
    { value: 2, label: 'Cliente' },
  ];
  

   ngOnInit() {
    this.cargarClientes();
    this.cargarUsuarios(1); 
  }

  cargarUsuarios(id: number) {
    this.apiService.GetUser(id).subscribe((data: IUsuario[]) => {
      this.usuarios = data;
    });
  }

  cargarClientes() {
    this.apiService.GetClientes().subscribe(
      (response) => {
        this.clientes = response; 
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  
  cargarEncuesta(id:number) {
    this.apiService.GetSurveyListByClient(id).subscribe(
      (response: IEncuesta[]) => {
        this.encuestas = response; // Asigna la respuesta JSON al arreglo de encuestas
        console.log(this.encuestas); // Puedes ver las encuestas en la consola
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClienteSelected(event:any){
    this.cargarEncuesta( this.idcliente);

  }

  onAsignarEncuesta() {
    if(this.selectedUserId && this.selectedEncuestaId && this.fechaLimite) {
      this.apiService.AsignarEncuesta(this.selectedUserId, this.selectedEncuestaId, this.fechaLimite)
      .subscribe(response => {
        this.presentAlertOk();
        this.router.navigate(['/homeadmin']);
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, mostrar un mensaje o navegar a otra página.
      }, error => {
        this.presentAlertError();
        this.router.navigate(['/homeadmin']);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error.
      });
    } else {
      this.presentAletVacio();
      // Puedes mostrar un mensaje de error al usuario si falta algún dato.
    }
  }

  async presentAlertOk(){
    const alert = await this.alertController.create({
      header: 'Importante',
      subHeader: 'Informacion Asignacion ',
      message: 'Se asigno de forma exitosa la encuesta al tecnico',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
  
  async presentAlertError(){
    const alert = await this.alertController.create({
      header: 'Importante',
      subHeader: 'Informacion Encuesta ',
      message: 'Error al asignar, favor intente mas tarde.',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async presentAletVacio(){
    const alert = await this.alertController.create({
      header: 'Importante',
      subHeader: 'Informacion Encuesta ',
      message: 'Faltan datos para poder realizar la asignacion de encuesta.',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }

}
