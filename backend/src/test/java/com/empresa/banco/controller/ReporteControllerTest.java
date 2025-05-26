package com.empresa.banco.controller;

import com.empresa.banco.dto.ReporteMovimientoDTO;
import com.empresa.banco.service.ReporteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Collections;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ReporteControllerTest {

    private MockMvc mockMvc;
    private ReporteService reporteService;

    @BeforeEach
    public void setUp() {
        reporteService = mock(ReporteService.class);
        ReporteController reporteController = new ReporteController(reporteService);
        mockMvc = MockMvcBuilders.standaloneSetup(reporteController).build();
    }

    @Test
    public void testGetReporteJson() throws Exception {
        when(reporteService.generarReporte(anyLong(), any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/reportes/json")
                .param("clienteId", "1")
                .param("desde", "2023-01-01")
                .param("hasta", "2023-12-31"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}
