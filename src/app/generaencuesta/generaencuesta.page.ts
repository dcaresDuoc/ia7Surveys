interface Opcion {
  descripcion: string;
}

interface Pregunta {
  id: string;
  tipo: number;
  descripcion: string;
  urgente: number;
  observacion: number;
  respuesta: string;
  respuestaUrgente: number;
  respuestaComentario: string;
  opciones: Opcion[];
}

interface Seccion {
  descripcion: string;
  preguntas: Pregunta[];
  estado: number;
}

interface EncuestaJSON {
  titulo: string;
  fechaCorte: string;
  instrucciones: string;
  secciones: Seccion[];
  msgFinal: string;
  estado: number;
}


import { Component } from '@angular/core';
import { ApiservicesService } from '../services/apiservices.service';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-generaencuesta',
  templateUrl: './generaencuesta.page.html',
  styleUrls: ['./generaencuesta.page.scss'],
})
export class GeneraencuestaPage {

  username : any;
  idcliente : any;

  mostrarOpcionesRespuesta = true; // Variable para mostrar/ocultar campos de opciones de respuesta
  opcionRespuesta: string = ''; // Variable para ingresar una nueva opción de respuesta
  opcionesRespuesta: string[] = []; // Arreglo para almacenar opciones de respuesta

  // Modifica tu modelo de datos para incluir las propiedades de opciones de respuesta
  encuesta: {
    titulo: string;
    fechaInicio: string;
    fechaTermino: string;
    instrucciones: string;
    secciones: {
      titulo: string;
      tipoPregunta: string;
      preguntas: {
        pregunta: string;
        tipoPregunta: string;
        mostrarOpcionesRespuesta: boolean; // Agregar esta propiedad
        opcionRespuesta: string; // Agregar esta propiedad
        opcionesRespuesta: string[]; // Agregar esta propiedad
      }[];
    }[];
  } = {
    titulo: '',
    fechaInicio: '',
    fechaTermino: '',
    instrucciones: '',
    secciones: [],
  };

  nuevaPregunta: { pregunta: string; tipoPregunta: string } = {
    pregunta: '',
    tipoPregunta: '', // Inicializa con un valor vacío o el valor predeterminado que desees
  };

  nuevaSeccion: { titulo: string; tipoPregunta: string; preguntas: { pregunta: string; tipoPregunta: string }[] } = {
    titulo: '',
    tipoPregunta: '',
    preguntas: [],
  };

  // En tu componente TypeScript
  tiposDePregunta = [
    { value: '0', description: 'Respuesta Texto' },
    { value: '1', description: 'Respuesta Alternativa' },
    { value: '2', description: 'Respuesta Check' },
    { value: '3', description: 'Respuesta Listado' }
  ];

  // Define una propiedad para almacenar el tipo de pregunta seleccionado
  tipoPreguntaSeleccionado: string = '';

  eliminarPregunta(seccionIndex: number, preguntaIndex: number) {
    // Encuentra la sección actual en función de seccionIndex
    const seccionActual = this.encuesta.secciones[seccionIndex];

    if (seccionActual) {
      // Elimina la pregunta del arreglo de preguntas de la sección actual
      seccionActual.preguntas.splice(preguntaIndex, 1);
    }
  }

  agregarPreguntaEnSeccion(seccionIndex: number) {
    if (this.tipoPreguntaSeleccionado === undefined || this.tipoPreguntaSeleccionado === null || this.tipoPreguntaSeleccionado === '') {
      this.presentValidationError("Por favor, seleccione un tipo de pregunta.");
      return;
    }

    if (!this.nuevaPregunta.pregunta || this.nuevaPregunta.pregunta.trim() === '') {
      this.presentValidationError("Por favor, ingrese una pregunta.");
      return;
    }
    
    
    
    // Restablece opcionRespuesta y opcionesRespuesta para cada nueva pregunta
    let opcionRespuesta = '';
    let opcionesRespuesta: never[] = [];
    this.nuevaPregunta.tipoPregunta = this.tipoPreguntaSeleccionado || '0';
  
    // Encuentra la sección actual en función de seccionIndex
    const seccionActual = this.encuesta.secciones[seccionIndex];
  
    if (seccionActual) {
      seccionActual.preguntas.push({
        pregunta: this.nuevaPregunta.pregunta,
        tipoPregunta: this.nuevaPregunta.tipoPregunta,
        mostrarOpcionesRespuesta: true, // Ahora está explícitamente configurado como true aquí
        opcionRespuesta: opcionRespuesta, // Usa la variable local
        opcionesRespuesta: opcionesRespuesta, // Usa la variable local
      });
  
      // Restablecer el objeto nuevaPregunta para futuras preguntas
      this.nuevaPregunta = {
        pregunta: '',
        tipoPregunta: '',
      };
      
      // Restablecer el tipoPreguntaSeleccionado
      this.tipoPreguntaSeleccionado = '';

      console.log("mostrarOpcionesRespuesta", true);
      console.log("tipoPregunta", this.nuevaPregunta.tipoPregunta);
    }
  }
  

  agregarSeccion() {
    if (!this.nuevaSeccion.titulo.trim()) {
      this.presentValidationError("Por favor, ingrese un título para la sección.");
      return;
    }
    // Validar y agregar la nueva sección a la encuesta
    this.encuesta.secciones.push({
      titulo: this.nuevaSeccion.titulo,
      tipoPregunta: this.nuevaSeccion.tipoPregunta,
      preguntas: this.nuevaSeccion.preguntas.map(pregunta => ({
        pregunta: pregunta.pregunta,
        tipoPregunta: pregunta.tipoPregunta,
        mostrarOpcionesRespuesta: this.mostrarOpcionesRespuesta,
        opcionRespuesta: this.opcionRespuesta,
        opcionesRespuesta: this.opcionesRespuesta,
      })),
    });

    // Restablecer el objeto nuevaSeccion para futuras secciones
    this.nuevaSeccion = {
      titulo: '',
      tipoPregunta: '',
      preguntas: [],
    };
  }

  agregarPregunta() {
    // Validar y agregar la nueva pregunta a la sección actual
    this.nuevaPregunta.tipoPregunta = this.tiposDePregunta.find(tipo => tipo.value === this.tipoPreguntaSeleccionado)?.description || ''; // Establece el tipo de pregunta

    this.nuevaSeccion.preguntas.push(this.nuevaPregunta);

    // Restablecer el objeto nuevaPregunta para futuras preguntas
    this.nuevaPregunta = {
      pregunta: '',
      tipoPregunta: '', // Asegúrate de restablecerlo aquí
    };

    // Restablecer el tipoPreguntaSeleccionado
    this.tipoPreguntaSeleccionado = '';
  }

  agregarOpcionRespuesta(seccionIndex: number, preguntaIndex: number) {
    const preguntaActual = this.encuesta.secciones[seccionIndex].preguntas[preguntaIndex];
    if (!preguntaActual.opcionRespuesta.trim()) {
      this.presentValidationError("Por favor, ingrese una opción de respuesta.");
      return;
    }
    if (preguntaActual) {
      // Aquí, asegúrate de que preguntaActual.opcionRespuesta contiene el texto correcto
      console.log('Opción a añadir:', preguntaActual.opcionRespuesta);
      preguntaActual.opcionesRespuesta.push(preguntaActual.opcionRespuesta);
      preguntaActual.opcionRespuesta = ''; // Reiniciar la variable
    }
}


  eliminarOpcionRespuesta(seccionIndex: number, preguntaIndex: number, opcionIndex: number) {
    const preguntaActual = this.encuesta.secciones[seccionIndex].preguntas[preguntaIndex];
    if (preguntaActual) {
      preguntaActual.opcionesRespuesta.splice(opcionIndex, 1);
    }
  }

  generarJSON(): string {
    let jsonResultado: EncuestaJSON = {
      titulo: this.encuesta.titulo,
      fechaCorte: '', // O donde sea que estés almacenando la fecha seleccionada en tu modelo
      instrucciones: this.encuesta.instrucciones,
      secciones: [],
      msgFinal: "Gracias por responder!",
      estado: 0,
    };
    
    this.encuesta.secciones.forEach(seccion => {
      let seccionJSON: Seccion = {
        descripcion: seccion.titulo,
        preguntas: [],
        estado: 1,
      };
      
      seccion.preguntas.forEach(pregunta => {
        let preguntaJSON: Pregunta = {
          id: "",
          tipo: +pregunta.tipoPregunta,
          descripcion: pregunta.pregunta,
          urgente: 1,
          observacion: 1,
          respuesta: "",
          respuestaUrgente: 0,
          respuestaComentario: "",
          opciones: pregunta.opcionesRespuesta.map(opcion => ({ descripcion: opcion })),
        };
        
        seccionJSON.preguntas.push(preguntaJSON);
      });
      
      jsonResultado.secciones.push(seccionJSON);
    });
    
    let jsonString = JSON.stringify(jsonResultado);
    return jsonString;
  }

  constructor(private apiService: ApiservicesService,private router:Router,private activeroute: ActivatedRoute,private alertController:AlertController, private authGuard:AuthGuard) { 
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.username = this.router.getCurrentNavigation()?.extras.state?.['username'];
        this.idcliente = this.router.getCurrentNavigation()?.extras.state?.['idcliente'];
      }
  });
  }

  async presentValidationError(message: string) {
    const alert = await this.alertController.create({
        header: 'Validación',
        message: message,
        buttons: ['Aceptar'],
    });
    await alert.present();
}  

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }

  enviarJSON() {
    if (!this.encuesta.titulo.trim()) {
      this.presentValidationError("Por favor, ingrese un título para la encuesta.");
      return;
    }
  
    if (!this.encuesta.instrucciones.trim()) {
      this.presentValidationError("Por favor, ingrese las instrucciones para la encuesta.");
      return;
    }
    let json = this.generarJSON();
    this.apiService.PostNewSurvey(json, this.idcliente).subscribe(response => {
       if(response.status === 200){
        this.presentAlertOk();
        this.router.navigate(['/homeadmin']);

       }
    }, error => {
       // Maneja los errores aquí
       this.presentAlertError();
       this.router.navigate(['/homeadmin']);
    });
 }

 async presentAlertOk(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Informacion Encuesta ',
    message: 'Se genero la encuesta de forma correcta.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertError(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Informacion Encuesta ',
    message: 'Error al generar encuesta, favor intentar mas tarde.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}
  
}
