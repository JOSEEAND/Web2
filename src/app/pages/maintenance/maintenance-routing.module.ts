import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';
import { ClientesComponent } from './usuarios/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { MatriculasComponent } from './matriculas/matriculas.component';

const routes: Routes = [
  { path: '', component: MaintenanceComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'matriculas', component: MatriculasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
