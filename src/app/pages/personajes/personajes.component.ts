import { Component } from '@angular/core';
import { PersonajesResponse } from 'src/app/shared/models/PersonajesResponse';
import { PersonajesService } from 'src/app/shared/services/personajes.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss']
})
export class PersonajesComponent {

  //ngOnInit se ejecuta solo, verificar f12 en browser
  /*una inyeccion de dependencias se logra mediante el 
  constructor, por lo tanto, mediante el constructor,
  mandamos a llamar a PersonajesServices*/

  results: PersonajesResponse;
  constructor(private srvPersonajes: PersonajesService) { }

  /*subscribe se pone siempre cuando es una funcion Observable
  el result es la variable que guarda esos datos, y en el browser
  con f12 para ver la consola se ven los datos del api*/

  ngOnInit() {
    this.srvPersonajes.getPersonajes().subscribe((result) => {
      this.results = result;
      console.log(result);
    });
  }

  vistoen = "Last know location: No esta en el lab";
  locacion = "First seen in: No esta en el lab";

  getStatusClass(status: string): string {
    return status === 'dead' ? 'dead-circle' : (status === 'alive' ? 'alive-circle' : '');
  }
}
