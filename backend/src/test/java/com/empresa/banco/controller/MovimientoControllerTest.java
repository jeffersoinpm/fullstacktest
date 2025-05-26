package com.empresa.banco.controller;

import com.empresa.banco.entity.Movimiento;
import com.empresa.banco.service.MovimientoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class MovimientoControllerTest {

    private MockMvc mockMvc;
    private MovimientoService movimientoService;

    @BeforeEach
    public void setUp() {
        movimientoService = mock(MovimientoService.class);
        MovimientoController movimientoController = new MovimientoController(movimientoService);
        mockMvc = MockMvcBuilders.standaloneSetup(movimientoController).build();
    }

    @Test
    public void testGetAllMovimientos() throws Exception {
        when(movimientoService.obtenerTodos()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/movimientos"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void testRegistrarMovimiento() throws Exception {
        Movimiento movimiento = new Movimiento();
        movimiento.setTipoMovimiento("credito");
        movimiento.setValor(new BigDecimal("100.00"));

        when(movimientoService.registrarMovimiento(eq("11111111"), any(Movimiento.class)))
                .thenReturn(movimiento);

        mockMvc.perform(post("/movimientos/11111111")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(movimiento)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.tipoMovimiento").value("credito"))
                .andExpect(jsonPath("$.valor").value(100.00));
    }
}
