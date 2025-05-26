package com.empresa.banco.controller;

import com.empresa.banco.entity.Movimiento;
import com.empresa.banco.service.MovimientoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movimientos")
public class MovimientoController {

    private final MovimientoService movimientoService;

    public MovimientoController(MovimientoService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @PostMapping("/{numeroCuenta}")
    public ResponseEntity<?> registrar(@PathVariable("numeroCuenta") String numeroCuenta, @RequestBody Movimiento movimiento) {
        try {
            Movimiento nuevo = movimientoService.registrarMovimiento(numeroCuenta, movimiento);
            return ResponseEntity.ok(nuevo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Movimiento> obtenerTodos() {
        return movimientoService.obtenerTodos();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Movimiento> getById(@PathVariable("id") Long id) {
        return movimientoService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
public ResponseEntity<Movimiento> update(@PathVariable Long id, @RequestBody Movimiento input) {
    return movimientoService.findById(id).map(existente -> {
        // Solo se actualizan los campos que el usuario puede modificar
        existente.setTipoMovimiento(input.getTipoMovimiento());
        existente.setValor(input.getValor());

        Movimiento actualizado = movimientoService.save(existente);
        return ResponseEntity.ok(actualizado);
    }).orElse(ResponseEntity.notFound().build());
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        movimientoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
