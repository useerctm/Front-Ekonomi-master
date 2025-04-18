import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  // Importa Router
import { IonicModule } from '@ionic/angular';  // Asegúrate de importar IonicModule
import { NavFooterComponent } from '../components/nav-footer/nav-footer.component';  // Asegúrate de que la ruta esté correcta

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule, NavFooterComponent],  // Asegúrate de incluir NavFooterComponent aquí
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  saldo = 0;
  limite = 0;
  gastosMes = 0;
  ingresoMes = 0;
  movimientos: any[] = [];
  public isBalanceHidden = false;
  tarjeta: string = '';
  activeTab: string = 'home';  // Establecemos el tab activo por defecto

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,  
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar saldo y límite
    this.authService.getCurrentUser().subscribe({
      next: user => {
        this.saldo = user.saldo;
        this.limite = user.limite_mensual ?? 0;
      },
      error: err => {
        console.error('Error al obtener datos de usuario', err);
      }
    });

    // Cargar movimientos
    this.loadMovimientos();
  }

  toggleBalance() {
    this.isBalanceHidden = !this.isBalanceHidden;
  }

  loadMovimientos() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Token ${token}` });

    this.http
      .get<any[]>('http://localhost:8000/api/movimientos/', { headers })
      .subscribe({
        next: data => {
          this.movimientos = data;
          this.computeMonthlyStats(data);
        },
        error: err => console.error('Error al obtener movimientos', err)
      });
  }

  private computeMonthlyStats(data: any[]) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const movMes = data.filter(m => new Date(m.fecha) >= start);

    this.gastosMes = movMes
      .filter(m => m.tipo === 'gasto')
      .reduce((sum, m) => sum + +m.monto, 0);

    this.ingresoMes = movMes
      .filter(m => m.tipo === 'ingreso')
      .reduce((sum, m) => sum + +m.monto, 0);
  }

  async onAddCard() {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Tarjeta',
      inputs: [
        {
          name: 'cardNumber',
          type: 'text',
          placeholder: 'Número de 16 dígitos',
          attributes: { maxlength: 16 }
        },
        {
          name: 'cardName',
          type: 'text',
          placeholder: 'Nombre en la tarjeta'
        },
        {
          name: 'expiry',
          type: 'month',
          placeholder: 'MM/AA'
        },
        {
          name: 'cvv',
          type: 'password',
          placeholder: 'CVV (3 dígitos)',
          attributes: { maxlength: 3 }
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            const nums = (data.cardNumber || '').replace(/\D/g, '').padEnd(16, '•');
            this.tarjeta = nums.match(/.{1,4}/g)?.join('-') ?? nums;

            this.authService.addCard().subscribe({
              next: res => {
                this.saldo = res.saldo;
                this.ingresoMes = res.saldo;
                this.gastosMes = 0;
              },
              error: err => console.error('Error al agregar tarjeta', err)
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async onSetLimit() {
    const alert = await this.alertCtrl.create({
      header: 'Poner Límite Mensual',
      inputs: [
        {
          name: 'limite',
          type: 'number',
          placeholder: 'Ingresa tu límite',
          attributes: { min: 1 }
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            const x = Number(data.limite);
            if (isNaN(x) || x <= 0) return false;
            this.authService.setLimit(x).subscribe({
              next: res => {
                this.limite = res.limite;
              },
              error: err => console.error('Error al fijar límite', err)
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // Funciones para la navegación
  setActiveTab(tab: string) {
    this.activeTab = tab;
    // Redirigir a la página correspondiente
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
