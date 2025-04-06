package com.hotel.soa;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/aggregator")
public class AggregatorController {

    @PostMapping("/consolidate")
    public String consolidateData(@RequestBody List<Object> messages) {
        return "Datos recibidos: " + messages.size() + " mensajes";
    }
}