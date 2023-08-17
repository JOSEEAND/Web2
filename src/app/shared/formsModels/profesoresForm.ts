import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class ProfesoresForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            IDProfesor: [0, [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellidos: ['', [Validators.required]],
            IDCurso: [1, [Validators.required]],
            Estado: [true]
        })
    }
}