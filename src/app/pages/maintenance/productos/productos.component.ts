import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'
import { Productos } from 'src/app/shared/models/producto';
import { ProductosService } from 'src/app/shared/services/productos.service';
import { AdminProductosComponent } from './admin-productos/admin-productos.component';
import { ToastrService } from 'ngx-toastr';

//const ELEMENT_DATA: Productos[] = [];

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  displayedColumns: string[] = ['id', 'nombre', 'categoria', 'precio', 'acciones'];
  dataSource = new MatTableDataSource();

  constructor(private srvProductos: ProductosService,
    public dialog: MatDialog, private mensajeria: ToastrService) { }

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(): void {
    this.srvProductos.getAll().subscribe((datos) => {
      //console.log(datos);
      this.dataSource.data = datos
    }, (error) => {
      this.mensajeria.error(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modificar(): void {
    alert("hola");

  }

  eliminar(id: number): void {
    this.srvProductos.eliminar(id).subscribe((dato) => {
      this.mensajeria.success('Se elimino el producto');
    }, (error) => {
      this.mensajeria.error('Error al eliminar');
    })

  }

  detalle(dato: Productos): void {
    this.mensajeria.info(dato.nombre);
  }

  //el ? en el parametro, significa que es opcional
  //si no se lo pongo, significa que es obligatorio
  //el : tambien puede ser any, agarra cualquier valor
  abrirDialog(producto?: Productos): void {
    let dialogOpen;
    if (producto) {
      dialogOpen = this.dialog.open(AdminProductosComponent, {
        width: '600px', height: '600px', data: { producto }
      });
    } else {
      dialogOpen = this.dialog.open(AdminProductosComponent, {
        width: '600px', height: '600px'
      });
    }
    dialogOpen.afterClosed().subscribe((data) => {
      console.log(data);
      this.cargarLista();
    })
  }
}
