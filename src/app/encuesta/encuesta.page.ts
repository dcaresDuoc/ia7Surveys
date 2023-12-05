import { Component, OnInit } from '@angular/core';
import { ISurvey } from '../model/Survey';
import { ApiservicesService } from '../services/apiservices.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  encuesta!:ISurvey;
  codeEncuesta:number | undefined;
  codeUsuario:number | undefined;

  handlerMessage = '';
  roleMessage = '';

  msjeParacial = "";

  modoLectura: boolean = false;

  constructor(public databaseserviceService: ApiservicesService,private activeroute: ActivatedRoute, private router: Router, private alertController:AlertController, private authGuard:AuthGuard) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.codeEncuesta = this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.codeUsuario= this.router.getCurrentNavigation()?.extras.state?.['user'];
        this.modoLectura = this.router.getCurrentNavigation()?.extras.state?.['isRealizada'];
        this.getSurveyByIdSurvey(this.codeUsuario!);
      }
  });
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }

  getSurveyByIdSurvey(id: number) {
    this.databaseserviceService.GetSurveyById(id).subscribe(
      (response) => {
        this.encuesta = response as unknown as ISurvey;
        console.log(this.encuesta);
        const surveyJson = JSON.stringify(this.encuesta);
        console.log(surveyJson);
      },
      (error) => {
        console.log('Error al obtener la encuesta:', error);
      }
    );
  }


  generateResponseJson() {
    const responseJson = JSON.parse(JSON.stringify(this.encuesta)); // Esto es una copia profunda del objeto encuesta

    for (const seccion of responseJson.secciones) {
        for (const pregunta of seccion.preguntas) {
            switch(pregunta.tipo) {
                case 0:
                    if (!pregunta.respuesta || pregunta.respuesta.trim() === '') {
                        pregunta.respuesta = "";
                    }
                    break;
                case 1:
                    if (!pregunta.respuesta) {
                        pregunta.respuesta = "";
                    }
                    break;
                case 2:
                  if (Array.isArray(pregunta.respuesta) && pregunta.respuesta.length > 0) {
                    pregunta.respuesta = pregunta.respuesta.join(", ");
                  } else {
                    pregunta.respuesta = "";
                  }
                  break;
                case 3:
                    if (!pregunta.respuesta || pregunta.respuesta === '') {
                        pregunta.respuesta = "";
                    }
                    break;
            }

            if (!pregunta.respuestaUrgente) {
                pregunta.respuestaUrgente = 0;
            }

            if (!pregunta.respuestaComentario || pregunta.respuestaComentario.trim() === '') {
                pregunta.respuestaComentario = "";
            }
        }
    }

    return responseJson;
}

updateCheckboxSelection(pregunta: any, opcion: string, event: any) {
  // Asegúrate de que pregunta.respuesta es un array
  if (!Array.isArray(pregunta.respuesta)) {
    pregunta.respuesta = [];
  }

  if (event.detail.checked) {
    // Agregar opción si no está presente
    const index = pregunta.respuesta.indexOf(opcion);
    if (index === -1) {
      pregunta.respuesta.push(opcion);
    }
  } else {
    // Eliminar opción si está presente
    const index = pregunta.respuesta.indexOf(opcion);
    if (index > -1) {
      pregunta.respuesta.splice(index, 1);
    }
  }
}




isOptionChecked(pregunta: any, opcion: string): boolean {
  if (pregunta.respuesta && pregunta.respuesta.includes(opcion)) {
    return true;
  }
  return false;
}



  finalizarEncuesta() {   
    
    const responseJson = this.generateResponseJson();   
    console.log( JSON.stringify( responseJson));

    if (!this.todasLasRespuestasSonSiONo(responseJson)) {
      this.msjeParacial = "Encuesta incompleta, se guardara de forma parcial.";
      this.mostrarAlerta(this.msjeParacial,responseJson,0);
    }

    if (this.todasLasRespuestasSonSiONo(responseJson)) {
      this.msjeParacial = "Encuesta completada, se finalizara.";
      this.mostrarAlerta(this.msjeParacial,responseJson,1);     
    }
      
    
} 

enviarEncuesta(response:any,estadoEnuesta:number){
  //const responseJson = this.generateResponseJson();
  this.databaseserviceService.PostSurvey(this.codeEncuesta!, this.codeUsuario!, estadoEnuesta, response)
    .subscribe(
      (response: HttpResponse<any>) => { // Asegúrate de que estás tipando la respuesta como HttpResponse.
        console.log('Éxito:', response.body);
        console.log('Código de estado HTTP:', response.status); 
      },
      (error) => {
        console.log('Error al guardar parcialmente:', error);
        if (error.status) {
            console.log('Código de estado HTTP del error:', error.status);
        }
      }
    );
}

todasLasRespuestasSonSiONo(respuestaJson: any): boolean {
  const secciones = respuestaJson.secciones;
  
  for (const seccion of secciones) {
    const preguntas = seccion.preguntas;
    
    for (const pregunta of preguntas) {
      switch(pregunta.tipo) {
        case 0: 
          if (!pregunta.respuesta || pregunta.respuesta.trim() === '') {
            return false;
          }
          break;

        case 1:
          if (!pregunta.respuesta || pregunta.respuesta.trim() === '') {
            return false;
          }
          break;
        case 2:
          if (!pregunta.respuesta || pregunta.respuesta.length === 0) {
            return false;
          }
          break;
        case 3:
          // Validación para el tipo 3
          if(!pregunta.respuesta || pregunta.respuesta === '') {
            return false;
          }
          break;
      }
    }
  }
  return true; // Si todas las respuestas pasan la validación, retorna true.
}


async mostrarAlerta(mensaje:string,response:any,estadoEncuesta:number) {
  const alert = await this.alertController.create({
    header: mensaje,
    message: '¿Deseas continuar?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        handler: () => {
          console.log('Selección: No');
          console.log(response);
          return;
        }
      },
      {
        text: 'Sí',
        handler: () => {
          console.log('Selección: Sí');
          console.log(response);
          this.enviarEncuesta(response,estadoEncuesta);
          this.router.navigate(['/home']);
        }
      }
    ]
  });

  await alert.present();
}




  ngOnInit() {
  }
}
