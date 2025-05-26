package com.empresa.banco.service;

import com.empresa.banco.entity.Cuenta;
import com.empresa.banco.entity.Movimiento;
import com.empresa.banco.repository.CuentaRepository;
import com.empresa.banco.repository.MovimientoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final CuentaRepository cuentaRepository;

    public MovimientoService(MovimientoRepository movimientoRepository, CuentaRepository cuentaRepository) {
        this.movimientoRepository = movimientoRepository;
        this.cuentaRepository = cuentaRepository;
    }

    public Movimiento registrarMovimiento(String numeroCuenta, Movimiento movimiento) {
        Cuenta cuenta = cuentaRepository.findById(numeroCuenta)
                .orElseThrow(() -> new RuntimeException("Cuenta no encontrada"));

        BigDecimal saldoActual = cuenta.getSaldoInicial();
        BigDecimal valorMovimiento = movimiento.getValor();

        if ("debito".equalsIgnoreCase(movimiento.getTipoMovimiento())) {
            if (saldoActual.compareTo(valorMovimiento) < 0) {
                throw new RuntimeException("Saldo no disponible");
            }
            saldoActual = saldoActual.subtract(valorMovimiento);
        } else if ("credito".equalsIgnoreCase(movimiento.getTipoMovimiento())) {
            saldoActual = saldoActual.add(valorMovimiento);
        }

        cuenta.setSaldoInicial(saldoActual);
        cuentaRepository.save(cuenta);

        movimiento.setCuenta(cuenta);
        movimiento.setFecha(LocalDate.now());
        movimiento.setSaldo(saldoActual);

        return movimientoRepository.save(movimiento);
    }

    public List<Movimiento> obtenerTodos() {
        return movimientoRepository.findAll();
    }
    public Optional<Movimiento> findById(Long id) {
        return movimientoRepository.findById(id);
    }

    public Movimiento save(Movimiento movimiento) {
        return movimientoRepository.save(movimiento);
    }

    public void deleteById(Long id) {
        movimientoRepository.deleteById(id);
    }

}
