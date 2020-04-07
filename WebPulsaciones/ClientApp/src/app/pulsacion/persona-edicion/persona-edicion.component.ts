import { PersonaService } from './../../services/persona.service';
import { Persona } from './../models/persona';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {
  persona: Persona;
  constructor(private personaService: PersonaService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.persona = new Persona();
    const id = this.rutaActiva.snapshot.params.identificacion;
    this.personaService.getId(id).subscribe(p => {
      this.persona = p;
      this.persona != null ? alert('Se Consulta la Persona') : alert('Error al Consultar');
    });
   
  }

  update() {
    this.personaService.put(this.persona).subscribe(p => {
      alert(p);
    });
  }

  delete() {
    this.personaService.delete(this.persona.identificacion).subscribe(p => {
      alert(p);
    });
  }

}
