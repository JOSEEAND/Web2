import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceComponent } from './maintenance.component';
import { ClientesComponent } from './usuarios/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminProductosComponent } from './productos/admin-productos/admin-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminClientesComponent } from './usuarios/admin-usuarios/admin-clientes.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { AdminMatriculasComponent } from './matriculas/admin-matriculas/admin-matriculas.component';


@NgModule({
  declarations: [
    MaintenanceComponent,
    ClientesComponent,
    ProductosComponent,
    AdminProductosComponent,
    AdminClientesComponent,
    MatriculasComponent,
    AdminMatriculasComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MaintenanceModule { }
