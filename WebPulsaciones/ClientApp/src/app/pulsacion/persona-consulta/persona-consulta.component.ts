import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../../services/persona.service';
import { SignalRService } from '../../service/signal-r.service';

@Component({
  selector: 'app-persona-consulta',
  templateUrl: './persona-consulta.component.html',
  styleUrls: ['./persona-consulta.component.css']
})
export class PersonaConsultaComponent implements OnInit {
  searchText:string;
  personas:Persona[];
    persona:Persona;
  constructor(private personaService: PersonaService, private sinagnalService:SignalRService) { }


  ngOnInit() {

    this.personaService.get().subscribe(result => {
      this.personas = result;
    });
    if (this.personas!=null) this.sinagnalService.signalReceived.subscribe((persona:Persona)=>this.personas.push(persona))
    
  }
}
