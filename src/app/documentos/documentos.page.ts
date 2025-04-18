import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa el router
import { NavFooterComponent } from '../components/nav-footer/nav-footer.component'; // Importa el componente NavFooter
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule

@Component({
  selector: 'app-documentos',
  standalone: true, // Si estás utilizando componentes independientes, debes asegurarte de incluir 'standalone: true'
  imports: [IonicModule, CommonModule, NavFooterComponent], // Asegúrate de importar aquí
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  activeTab: string = 'documentos';  // Inicializa el activeTab
  constructor(private router: Router) {}

  ngOnInit() {}

  // Función para manejar el envío de mensajes o navegación
  goToHome() {
    this.router.navigate(['/dashboard']);
  }

  goToGraphics() {
    this.router.navigate(['/graficos']);
  }

  goToChatbot() {
    this.router.navigate(['/chatbot']);
  }

  goToDocumentos() {
    this.router.navigate(['/documentos']);
  }

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
}
