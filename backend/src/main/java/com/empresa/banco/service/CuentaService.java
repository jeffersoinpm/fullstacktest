package com.empresa.banco.service;

import com.empresa.banco.entity.Cuenta;
import com.empresa.banco.repository.CuentaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CuentaService {
    private final CuentaRepository cuentaRepository;

    public CuentaService(CuentaRepository cuentaRepository) {
        this.cuentaRepository = cuentaRepository;
    }

    public List<Cuenta> findAll() {
        return cuentaRepository.findAll();
    }

    public Optional<Cuenta> findById(String numeroCuenta) {
        return cuentaRepository.findById(numeroCuenta);
    }

    public Cuenta save(Cuenta cuenta) {
        return cuentaRepository.save(cuenta);
    }

    public void deleteById(String numeroCuenta) {
        cuentaRepository.deleteById(numeroCuenta);
    }
}
