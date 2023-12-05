import { ApiservicesService } from '../services/apiservices.service';
import { IResultado } from '../model/IResultado';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-estadisticadetalle',
  templateUrl: './estadisticadetalle.page.html',
  styleUrls: ['./estadisticadetalle.page.scss'],
})
export class EstadisticadetallePage implements OnInit, AfterViewInit {
  @ViewChild('miGrafico') miGrafico: ElementRef<HTMLCanvasElement> | undefined;

  estadisticas: IResultado[] | undefined;

  constructor(private apiService: ApiservicesService,private activeroute: ActivatedRoute,private router: Router, private authGuard:AuthGuard) { 
      this.activeroute.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.obtenerEstadisticas( this.router.getCurrentNavigation()?.extras.state?.['user']);
        }
    });
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    // Llama a la función para renderizar el gráfico después de que la vista esté inicializada
    this.renderizarGrafico();
  }

  obtenerEstadisticas(id:number) {
    this.apiService.GetStadistica(id).subscribe(
      (response) => {
        this.estadisticas = [response as IResultado];
        // Llama a la función para renderizar el gráfico aquí si lo deseas
        this.renderizarGrafico();
      },
      (error) => {
        console.error('Error al obtener estadísticas:', error);
      }
    );
  }

  renderizarGrafico() {
    if (!this.estadisticas || this.estadisticas.length === 0) {
      return; // No hay datos para mostrar
    }

    const ctx = this.miGrafico!.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto del lienzo.');
      return; // Detener la renderización del gráfico si el contexto es nulo
    }

    const labels = this.estadisticas[0].estadisticas.map(stat => stat.nombreSeccion);
    const data = this.estadisticas[0].estadisticas.map(stat => stat.porcentajeCumplimiento);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '% Cumplimiento',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  logout() {
    this.authGuard.setAuthenticationStatus(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']); // Redirigir al inicio de sesión
  }
}
