package com.empresa.banco.controller;

import com.empresa.banco.service.CuentaService;
import com.empresa.banco.entity.Cuenta;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/cuentas")
public class CuentaController {

    private final CuentaService cuentaService;

    public CuentaController(CuentaService cuentaService) {
        this.cuentaService = cuentaService;
    }

    @GetMapping
    public List<Cuenta> getAll() {
        return cuentaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cuenta> getById(@PathVariable("id") String id) {
        return cuentaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cuenta create(@RequestBody Cuenta cuenta) {
        return cuentaService.save(cuenta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cuenta> update(@PathVariable("id") String id, @RequestBody Cuenta cuenta) {
        if (!cuentaService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        cuenta.setNumeroCuenta(id);
        return ResponseEntity.ok(cuentaService.save(cuenta));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        cuentaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
