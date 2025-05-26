import { Component } from '@angular/core';
import { ReporteService, ReporteMovimientoDTO } from '../../services/reporte.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'] 
})
export class ReporteComponent {
  reporteForm: FormGroup;
  reporte: ReporteMovimientoDTO[] = [];
  pdfBase64 = '';

  constructor(
    private reporteService: ReporteService,
    private fb: FormBuilder
  ) {
    this.reporteForm = this.fb.group({
      clienteId: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required]
    });
  }

  obtenerJson() {
    if (this.reporteForm.valid) {
      const { clienteId, desde, hasta } = this.reporteForm.value;
      this.reporteService.getReporteJson(clienteId, desde, hasta).subscribe(data => {
        this.reporte = data;
      });
    }
  }

  descargarPdf() {
    if (this.reporteForm.valid) {
      const { clienteId, desde, hasta } = this.reporteForm.value;
      this.reporteService.getReportePdf(clienteId, desde, hasta).subscribe(base64 => {
        this.pdfBase64 = base64;
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,' + base64;
        link.download = 'reporte.pdf';
        link.click();
      });
    }
  }
}
