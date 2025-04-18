import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';  // Importa IonicModule aquí
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Ya no se declara NavFooterComponent en el AppModule
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';

@NgModule({
  declarations: [AppComponent],  // Solo se declara AppComponent
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Asegura que IonicModule esté aquí
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,  // Asegura que FormsModule esté aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
