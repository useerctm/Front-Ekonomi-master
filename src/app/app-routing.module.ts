import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',  // Página inicial
    pathMatch: 'full',
  },
  {
    path: 'dashboard', // Página de inicio
    loadComponent: () =>
      import('./dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'graficos', // Página de gráficos
    loadComponent: () =>
      import('./graficos/graficos.page').then(m => m.GraficosPage),
  },
  {
    path: 'chatbot', // Página de ChatBot
    loadComponent: () =>
      import('./chatbot/chatbot.page').then(m => m.ChatbotPage),
  },
  {
    path: 'documentos', // Página de Documentos
    loadComponent: () =>
      import('./documentos/documentos.page').then(m => m.DocumentosPage),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
