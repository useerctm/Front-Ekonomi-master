import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { NavFooterComponent } from '../components/nav-footer/nav-footer.component'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [IonicModule, FormsModule, NavFooterComponent], // Importa IonicModule y FormsModule aquí
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage implements OnInit {
  messageText: string = '';  // Almacena el mensaje actual
  chatMessages: string[] = [];  // Almacena los mensajes enviados

  activeTab: string = 'chatbot'; // Inicializa el activeTab

  constructor(private router: Router) {}

  ngOnInit() {}

  // Función para manejar el envío de mensajes
  sendMessage() {
    if (this.messageText.trim()) {
      this.chatMessages.push(this.messageText);  // Agrega el mensaje al array
      this.messageText = '';  // Limpia el campo de texto después de enviar

      // Simulación de respuesta del bot (puedes personalizar esto más tarde)
      setTimeout(() => {
        this.chatMessages.push('Respuesta del chatbot: ' + this.messageText);
      }, 1000);
    }
  }

  // Maneja el cambio en el campo de texto
  onInputChange() {
    // Puede agregar lógica para manejar el cambio de texto si es necesario
  }

  // Funciones para manejar la navegación
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
