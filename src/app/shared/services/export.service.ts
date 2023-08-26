import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  imprimir(
    encabezado: string[],
    cuerpo: any[],
    titulo: string,
    guardar?: boolean,
    nombreArchivo?: string
  ): void {

    //si no llega un nombre se coloca undefinida, si llega un nombre
    //se le coloca el nombre
    nombreArchivo = nombreArchivo == undefined ? '' : nombreArchivo;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter"
    });

    //formato de como se visualizara el documento
    doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: 'center' });

    //formato a la tabla generada por jspdf-autotable
    autotable(doc, { head: [encabezado], body: cuerpo });

    if (guardar) {
      const hoy = new Date();
      //doc.save(nombreArchivo + hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf');
      doc.save(nombreArchivo + '.pdf');

    }
  }

  imprimirHTML(page: HTMLElement, nombreArchivo: string): void {

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "letter"
    });
    doc.setFontSize(10);

    doc.html(page, {
      callback: (docpdf) => {
        doc.save(nombreArchivo + '.pdf');
      }
    });
  }
}
