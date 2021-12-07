import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaRegistroComponent } from './pulsacion/persona-registro/persona-registro.component';
import { PersonaConsultaComponent } from './pulsacion/persona-consulta/persona-consulta.component';
import { Routes, RouterModule } from '@angular/router';
import { PersonaEdicionComponent } from './pulsacion/persona-edicion/persona-edicion.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
  path: 'personaConsulta',
  component: PersonaConsultaComponent
  },

  {
    path: 'personaRegistro',
    component: PersonaRegistroComponent, canActivate: [AuthGuard]
  },

  {
    path: 'personaEdicion/:identificacion',
    component: PersonaEdicionComponent
  },
  { path: 'login', component: LoginComponent },

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
