import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-homeadmin',
  templateUrl: './homeadmin.page.html',
  styleUrls: ['./homeadmin.page.scss'],
})
export class HomeadminPage implements OnInit {

username : any;
idcliente : any;

  constructor(private router:Router,private activeroute: ActivatedRoute, private authGuard:AuthGuard) { 

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.username = this.router.getCurrentNavigation()?.extras.state?.['username'];
        this.idcliente = this.router.getCurrentNavigation()?.extras.state?.['idcliente'];
        
      }
  });

  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }

  generarEncuesta(){
    let setData: NavigationExtras = {
      state: {  user : this.username,
                idcliente : this.idcliente
              }
    };
    this.router.navigate(['/generaencuesta'],setData);
  }

  asignarEncuesta(){
    let setData: NavigationExtras = {
      state: {  user : this.username,
                idcliente : this.idcliente
              }
    };
    this.router.navigate(['/asignarencuesta'],setData);
  }

  adminUser(){
    let setData: NavigationExtras = {
      state: {  user : this.username,
                idcliente : this.idcliente
              }
    };
    this.router.navigate(['/adminusuarios'],setData);
  }

  adminCliente(){
    let setData: NavigationExtras = {
      state: {  user : this.username,
                idcliente : this.idcliente
              }
    };
    this.router.navigate(['/admincliente'],setData);
  }

  ngOnInit() {
  }

}
