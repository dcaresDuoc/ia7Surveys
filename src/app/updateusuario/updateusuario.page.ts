import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service';
import { FormGroup,FormBuilder  } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-updateusuario',
  templateUrl: './updateusuario.page.html',
  styleUrls: ['./updateusuario.page.scss'],
})
export class UpdateusuarioPage implements OnInit {

  clientes: any[] = [] ;
  userForm: FormGroup ;

  constructor(private alertController : AlertController,private authGuard : AuthGuard, private router:Router, private apiService : ApiservicesService,private formBuilder: FormBuilder) { 
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required], // campo de confirmación
      nombre: ['', Validators.required],
      idPerfil: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]], // validación de correo
      idCliente: ['', Validators.required]
    }, {validator: this.matchPassword});
  }

  matchPassword(control: AbstractControl) {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirm_password')?.value;
    if(password != confirmPassword) {
      control.get('confirm_password')?.setErrors({ NoPassswordMatch: true });
    }
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
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

  submitForm() {
    if (this.userForm.valid) {
      this.apiService.CreacionUsuario(this.userForm.value).subscribe(
        response => {
            if(response.status === 200){
              this.presentAlertOk();
              this.router.navigate(['/homeadmin']);
            }else{
              this.presentAlertError();
            }
        },
        error => {
            console.error('Error al crear el usuario', error);
        }
    );
      
    }else {
      if (this.userForm.get('eMail')?.hasError('email')) {
        this.presentAlert('Error en el correo', 'Por favor, introduce un correo válido.');
      } else if (this.userForm.get('confirm_password')?.hasError('NoPassswordMatch')) {
        this.presentAlert('Error en las contraseñas', 'Las contraseñas no coinciden.');
      } else {
        this.presentAlert('Campos vacíos', 'Existen campos vacíos. Por favor, rellénalos antes de continuar.');
      }
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
    subHeader: 'Informacion Creacion ',
    message: 'Usuario creado de forma exitosa!',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertError(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Informacion Creacion ',
    message: 'Error al momento de crear el usuario.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

async presentAlertVacio(){
  const alert = await this.alertController.create({
    header: 'Importante',
    subHeader: 'Informacion Creacion ',
    message: 'Existen campos vacios al momento de crear el usaurio.',
    buttons: ['Aceptar'],
  });
  await alert.present();
}

  ngOnInit() {
  }

}
