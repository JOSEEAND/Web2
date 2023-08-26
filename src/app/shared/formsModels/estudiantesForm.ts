import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class EstudiantesForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            IDEstudiante: [0, [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellidos: ['', [Validators.required]],
            Estado: [true]
        })
    }
}