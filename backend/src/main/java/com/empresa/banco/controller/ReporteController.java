package com.empresa.banco.controller;

import com.empresa.banco.dto.ReporteMovimientoDTO;
import com.empresa.banco.service.ReporteService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/reportes")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/json")
    public List<ReporteMovimientoDTO> getReporteJson(@RequestParam("clienteId") Long clienteId,
                                                     @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                                     @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        return reporteService.generarReporte(clienteId, desde, hasta);
    }

    @GetMapping("/pdf")
    public ResponseEntity<String> getReportePdf(@RequestParam("clienteId") Long clienteId,
                                                     @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
                                                     @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) {
        List<ReporteMovimientoDTO> reporte = reporteService.generarReporte(clienteId, desde, hasta);
        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            PdfPTable table = new PdfPTable(8);
            table.addCell("Fecha");
            table.addCell("Cliente");
            table.addCell("Cuenta");
            table.addCell("Tipo");
            table.addCell("Saldo Inicial");
            table.addCell("Estado");
            table.addCell("Movimiento");
            table.addCell("Saldo Disponible");

            for (ReporteMovimientoDTO dto : reporte) {
                table.addCell(dto.getFecha().toString());
                table.addCell(dto.getCliente());
                table.addCell(dto.getNumeroCuenta());
                table.addCell(dto.getTipo());
                table.addCell(dto.getSaldoInicial().toString());
                table.addCell(String.valueOf(dto.isEstado()));
                table.addCell(dto.getMovimiento().toString());
                table.addCell(dto.getSaldoDisponible().toString());
            }

            document.add(table);
            document.close();

            String base64 = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return ResponseEntity.ok(base64);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al generar el PDF");
        }
    }
}
