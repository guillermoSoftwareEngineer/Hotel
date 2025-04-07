package com.hotel.soa;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@RestController
@RequestMapping("/api/aggregator")
public class AggregatorController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BRIDGE_URL = "http://127.0.0.1:3001/translate/reserva-to-factura";

    @PostMapping("/consolidate")
    public String consolidateData(@RequestBody List<Object> messages) {
        // 1. Procesamiento local
        String processedData = "Datos recibidos: " + messages.size() + " mensajes";
        
        // 2. Comunicación con Bridge Service
        try {
            String bridgeResponse = restTemplate.postForObject(
                BRIDGE_URL, 
                messages.get(0), // Envía el primer mensaje
                String.class
            );
            return processedData + " | Respuesta Bridge: " + bridgeResponse;
        } catch (Exception e) {
            return processedData + " | Error al conectar con Bridge: " + e.getMessage();
        }
    }
}
