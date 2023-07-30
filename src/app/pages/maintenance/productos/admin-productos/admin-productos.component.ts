import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductosForm } from 'src/app/shared/formsModels/productosForms';
import { ProductosService } from 'src/app/shared/services/productos.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent {

  titulo = 'Crear producto';
  isCreate = true;
  constructor(public productosForm: ProductosForm,
    private svrProductos: ProductosService, //el nombre producto es el mismo del abrirDialog() en productoscomponent
    @Inject(MAT_DIALOG_DATA) public data: { producto: any }) {
  }

  ngOnInit() {
    if (this.data?.producto) {
      this.isCreate = false;
      this.titulo = 'Modificar producto';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Crear producto';
    }
  }

  cargarDatosForm(): void {
    //baseForm.setValue = uno por uno
    //baseForm.patchValue = todo
    this.productosForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,
      stock: this.data.producto.stock,
      fechaIngreso: this.data.producto.fechaIngreso,
      estado: true
    });
  }

  guardar(): void {
    //ver si paso las validaciones para guadar los datos de entrada
    if (this.productosForm.baseForm.valid) {
      if (this.isCreate) {
        this.svrProductos.guardar(this.productosForm.baseForm.value).subscribe(
          (dato) => {
            this.productosForm.baseForm.reset();
            alert('Se guardo correctamente');
          },
          (error) => {
            alert('Error al guardar');
          });
      }
    } else {
      this.svrProductos.modificar(this.productosForm.baseForm.value).subscribe(
        (dato) => {
          this.productosForm.baseForm.reset();
          alert('Se modifico correctamnte');
        },
        (error) => {
          alert('Error al modificar');
        });
    }

  }
}
