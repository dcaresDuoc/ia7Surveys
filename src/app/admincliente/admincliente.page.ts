import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder  } from '@angular/forms';
import { Validators, AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';

@Component({
  selector: 'app-admincliente',
  templateUrl: './admincliente.page.html',
  styleUrls: ['./admincliente.page.scss'],
})
export class AdminclientePage implements OnInit {

  userForm: FormGroup ;

  constructor(private alertController : AlertController,private authGuard : AuthGuard, private router:Router, private apiService : ApiservicesService,private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      rut: ['', [Validators.required, this.validaRut]],
      descripcion: ['', Validators.required]
    });
    
  }

    // La función para validar el RUT
validaRut(control: AbstractControl): { [key: string]: any } | null {
  let rut = control.value;

  // Quitamos formato al RUT
  let valor = rut.replace('.', '').replace('-', '');

  // Aislar Cuerpo y Dígito Verificador
  const cuerpo = valor.slice(0, -1);
  let dv = valor.slice(-1).toUpperCase();

  // Formatear RUN
  rut = cuerpo + '-' + dv

  // Si no cumple con el mínimo ej. (n.nnn.nnn)
  if(cuerpo.length < 7) { 
    return { rutInvalido: true };
  }

  // Calcular Dígito Verificador
  let suma = 0;
  let multiplo = 2;

  // Para cada dígito del cuerpo
  for(let i=1; i<=cuerpo.length; i++) {
    // Obtener su Producto con el Múltiplo Correspondiente
    const index = multiplo * valor.charAt(cuerpo.length - i);
    
    // Sumar al Contador General
    suma = suma + index;
    
    // Consolidar Múltiplo dentro del rango [2,7]
    if(multiplo < 7) { 
      multiplo = multiplo + 1; 
    } else { 
      multiplo = 2; 
    }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  const dvEsperado = 11 - (suma % 11);
  dv = (dvEsperado == 10) ? 'K' : (dvEsperado == 11) ? '0' : String(dvEsperado);

  // Validar que el Cuerpo y el Dígito Verificador sean válidos
  if(dv != rut.slice(-1)) {
    return { rutInvalido: true };
  }

  // Si todo está bien, retornar null (sin errores)
  return null;
}

  ngOnInit() {
  }

  
  submitForm() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
        this.apiService.CreateClientes(this.userForm.value).subscribe(
            response => {
                
                    this.presentAlertOk();
                    this.router.navigate(['/homeadmin']);
                
            },
            error => {
              // Manejar error específico de RUT
              if (error.status === 422) {
                this.presentAlertErrorRut();
              } else {
                // Manejar otros errores
                console.error('Error al crear el usuario', error);
                this.presentAlertError();
              }
            }
          );
    } else {
        // Usamos un array para almacenar todos los errores.
        let errores: string[] = [];
        
        if (this.userForm.get('userName')?.hasError('required')) {
            errores.push('Nombre de usuario es requerido.');
        }
        if (this.userForm.get('userName')?.hasError('minlength')) {
          errores.push('Nombre debe tener al menos 4 caracteres.');
        }
        if (this.userForm.get('password')?.hasError('required')) {
            errores.push('Contraseña es requerida.');
        }
        if (this.userForm.get('confirm_password')?.hasError('required')) {
            errores.push('Confirmación de contraseña es requerida.');
        }
        if (this.userForm.get('eMail')?.hasError('email')) {
            errores.push('Por favor, introduce un correo válido.');
        }
        if (this.userForm.get('confirm_password')?.hasError('NoPassswordMatch')) {
            errores.push('Las contraseñas no coinciden.');
        }

        // Transformamos el array de errores en un string para mostrarlo en la alerta.
        const mensaje = errores.join(' ');

        // Mostramos la alerta con los errores encontrados.
        this.presentAlert('Error en el formulario', mensaje);
    }    
}

async presentAlert(header: string, message: string) {
  const alert = await this.alertController.create({
    header: header,
    message: message,
    buttons: ['Aceptar'],
  });
  await alert.present();
}


async presentAlertOk(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Información Creación ',
    message: 'Empresa creado de forma exitosa!',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertError(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Información Creación ',
    message: 'Error al momento de crear el usuario.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertErrorRut(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Información Creación ',
    message: 'Rut ya se encuentra registrado',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertVacio(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Información Creación ',
    message: 'Existen campos vacios al momento de crear el usaurio.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

logout() {
  this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
  this.router.navigate(['/login']); // Redirigir al inicio de sesión
}

}
