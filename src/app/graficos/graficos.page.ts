import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Asegurado que IonicModule esté importado
import { CommonModule } from '@angular/common'; // Asegurado que CommonModule esté importado
import { Router } from '@angular/router';  // Importamos Router
import { NavFooterComponent } from '../components/nav-footer/nav-footer.component'; // Importa NavFooterComponent

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [CommonModule, IonicModule, NavFooterComponent],  // Aseguramos que IonicModule y NavFooterComponent estén importados
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {
  activeTab: string = 'graphics'; // Definimos la pestaña activa por defecto

  constructor(private router: Router) {}

  ngOnInit() {}

  // Funciones para manejar la navegación
  setActiveTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'home') {
      this.router.navigate(['/dashboard']);
    } else if (tab === 'graphics') {
      this.router.navigate(['/graficos']);
    } else if (tab === 'chatbot') {
      this.router.navigate(['/chatbot']);
    } else if (tab === 'documentos') {
      this.router.navigate(['/documentos']);
    }
  }

  goToHome() {
    this.setActiveTab('home');
  }

  goToGraphics() {
    this.setActiveTab('graphics');
  }

  goToChatbot() {
    this.setActiveTab('chatbot');
  }

  goToDocumentos() {
    this.setActiveTab('documentos');
  }
}
