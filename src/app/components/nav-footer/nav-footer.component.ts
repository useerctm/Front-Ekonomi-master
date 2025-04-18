import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router'; 
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-footer',
  standalone: true,
  imports: [IonicModule, CommonModule],  // Asegúrate de importar IonicModule aquí
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.scss'],
})
export class NavFooterComponent {
  @Input() activeTab: string = '';  // Establecer la propiedad activa
  @Output() tabChange = new EventEmitter<string>();  // Evento para cambiar la pestaña

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    // Cambiar la pestaña solo si es necesario
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      // Cambia la ruta solo si es necesario
      switch (tab) {
        case 'home':
          this.router.navigate(['/dashboard']);
          break;
        case 'graphics':
          this.router.navigate(['/graficos']);
          break;
        case 'chatbot':
          this.router.navigate(['/chatbot']);
          break;
        case 'documentos':
          this.router.navigate(['/documentos']);
          break;
        default:
          break;
      }
    }
  }
}
