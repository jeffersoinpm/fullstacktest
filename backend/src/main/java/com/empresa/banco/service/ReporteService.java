package com.empresa.banco.service;

import com.empresa.banco.dto.ReporteMovimientoDTO;
import com.empresa.banco.entity.Movimiento;
import com.empresa.banco.repository.MovimientoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReporteService {

    private final MovimientoRepository movimientoRepository;

    public ReporteService(MovimientoRepository movimientoRepository) {
        this.movimientoRepository = movimientoRepository;
    }

    public List<ReporteMovimientoDTO> generarReporte(Long clienteId, LocalDate desde, LocalDate hasta) {
        return movimientoRepository.findAll().stream()
                .filter(mov -> mov.getCuenta().getCliente().getClienteId().equals(clienteId))
                .filter(mov -> !mov.getFecha().isBefore(desde) && !mov.getFecha().isAfter(hasta))
                .map(mov -> {
                    ReporteMovimientoDTO dto = new ReporteMovimientoDTO();
                    dto.setFecha(mov.getFecha());
                    dto.setCliente(mov.getCuenta().getCliente().getNombre());
                    dto.setNumeroCuenta(mov.getCuenta().getNumeroCuenta());
                    dto.setTipo(mov.getCuenta().getTipoCuenta());
                    dto.setSaldoInicial(mov.getCuenta().getSaldoInicial());
                    dto.setEstado(mov.getCuenta().isEstado());
                    dto.setMovimiento(mov.getValor());
                    dto.setSaldoDisponible(mov.getSaldo());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
