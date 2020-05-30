import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonaRegistroComponent } from './pulsacion/persona-registro/persona-registro.component';
import { PersonaConsultaComponent } from './pulsacion/persona-consulta/persona-consulta.component';
import { PersonaEdicionComponent } from './pulsacion/persona-edicion/persona-edicion.component';
import { FiltroPersonaPipe } from './pipe/filtro-persona.pipe';
import { AlertModalComponent } from './@base/modal/alert-modal/alert-modal.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptor} from './services/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonaRegistroComponent,
    PersonaConsultaComponent,
    PersonaEdicionComponent,
    FiltroPersonaPipe,
    AlertModalComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule
  ],
  entryComponents:[AlertModalComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
