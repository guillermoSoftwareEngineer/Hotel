package com.hotel.soa.orchestrator_service;


import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@RestController
@RequestMapping("/api/orchestrator")
public class OrchestratorController {

    // Puedes inyectar RestTemplate a través de @Bean, pero por simplicidad instanciamos uno aquí
    private final RestTemplate restTemplate = new RestTemplate();
    private final String AGGREGATOR_URL = "http://localhost:8080/api/aggregator/consolidate";

    @PostMapping("/process")
    public String orchestrateProcess(@RequestBody List<Object> messages) {
        // Simulamos el proceso orquestador coordinando la llamada al Aggregator Service
        String aggregatorResponse;
        try {
            aggregatorResponse = restTemplate.postForObject(
                AGGREGATOR_URL,
                messages,
                String.class
            );
        } catch (Exception e) {
            aggregatorResponse = "Error al llamar al Aggregator: " + e.getMessage();
        }
        
        // Aquí puedes agregar lógica adicional de orquestación si fuese necesario
        return "Orquestador procesó los mensajes. Respuesta del Aggregator: " + aggregatorResponse;
    }
}
