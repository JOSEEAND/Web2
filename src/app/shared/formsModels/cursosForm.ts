import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable({ providedIn: 'root' })
export class CursosForm {
    baseForm: FormGroup;
    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            IDCurso: [0, [Validators.required]],
            NombreCurso: ['', [Validators.required]],
            Sede: ['', [Validators.required]],
            Estado: [true]
        })
    }
}