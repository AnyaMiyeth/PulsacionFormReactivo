import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/persona';
import { PersonaService } from '../../services/persona.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertModalComponent } from 'src/app/@base/modal/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css']
})
export class PersonaRegistroComponent implements OnInit {
  formGroup: FormGroup;
  persona: Persona;
  constructor(
    private personaService: PersonaService,
     private formBuilder: FormBuilder,
     private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
  }


  private buildForm() {
    this.persona = new Persona();
    this.persona.identificacion = '';
    this.persona.nombre = '';
    this.persona.edad = 0;
    this.persona.pulsacion = 0;
    this.persona.sexo = '';
    this.formGroup = this.formBuilder.group({
      identificacion: [this.persona.identificacion, Validators.required],
      nombre: [this.persona.nombre, Validators.required],
      sexo: [this.persona.sexo],
      edad: [this.persona.edad, [Validators.required, Validators.min(1)]]
    });
  }
  private ValidaSexo(control: AbstractControl) {
    const sexo = control.value;
    if (sexo.toLocaleUpperCase() !== 'M' && sexo.toLocaleUpperCase() !== 'F') {
      return { validSexo: true, messageSexo: 'Sexo No Valido' };
    }
    return null;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.add();
  }

  add() {
    this.persona = this.formGroup.value;
    this.personaService.post(this.persona).subscribe(p => {
      if (p != null) {
        const messageBox = this.modalService.open(AlertModalComponent);
        messageBox.componentInstance.title = "Resultado Operación";
        messageBox.componentInstance.message = 'Persona creada!';
        this.persona = p;
      }
    });

  }

  get control() { return this.formGroup.controls; }

}
