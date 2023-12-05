import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators   } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { AlertController,NavController,createAnimation  } from '@ionic/angular';
import { ApiservicesService } from '../services/apiservices.service';
import { IUsuario } from '../model/IUsuario';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  iusuario! : IUsuario;

  usuario = new FormGroup({
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
  });

  constructor(private router: Router, private alertController : AlertController,private api : ApiservicesService, private auth:AuthGuard) { }

    goToPagina2(){
      console.log("entramos al metodo");
      if("dcaresg"==this.usuario.value.user){
        console.log("Entramos");
        this.router.navigate(['/encuesta']);
      }else{
        this.presentAlert();
      }
      
    }

    login(){
      this.api.login(this.usuario.value.user!,this.usuario.value.pass!).subscribe(
        (response)=>{
          this.iusuario = response as unknown as IUsuario;          
          if (this.iusuario.loginResult==="true") {

            let setData: NavigationExtras = {
              state: { id: this.iusuario.usuario.id,
                username: this.iusuario.usuario.userName,
                email: this.iusuario.usuario.eMail,
                idperfil: this.iusuario.usuario.idPerfil,
                idcliente: this.iusuario.usuario.idCliente,
                status: this.iusuario.usuario.status}
            };

            if (this.iusuario.usuario.idPerfil===0) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/homeadmin'],setData);              
            }

            if (this.iusuario.usuario.idPerfil===1) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/home'],setData);              
            }

            if (this.iusuario.usuario.idPerfil===2) {
              this.auth.setAuthenticationStatus(true);
              this.router.navigate(['/estadistica'],setData);              
            }
            
          } else {
            // El inicio de sesión falló, muestra una alerta
            this.presentAlert();
          }

        },
        (error)=>{
          console.error('Error en inicio de sesión:', error);
        }
      );

    }

     //Metodo de alerta 
   async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Error Login',
      subHeader: 'Infomación : ',
      message: 'Usuario o contraseña son incorrecto',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
