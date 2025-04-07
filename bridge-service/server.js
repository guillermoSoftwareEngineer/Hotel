const express = require("express");
const { Builder } = require("xml2js");
const app = express();

app.use(express.json());

// Endpoint POST original (para comunicación SOA)
app.post("/translate/reserva-to-factura", (req, res) => {
    const builder = new Builder({ rootName: "reserva" });
    console.log("Datos recibidos del Aggregator:", req.body);
    res.json({
        status: "Éxito",
        xml: builder.buildObject(req.body),
        datos: req.body
    });
});

// Endpoint GET para verificación en navegador
app.get("/translate/reserva-to-factura", (req, res) => {
    res.status(200).json({ 
        servicio: "Bridge SOA Hotel",
        estado: "Operativo",
        endpoints: {
            POST: "/translate/reserva-to-factura",
            descripción: "Convierte JSON de reserva a XML para facturación"
        }
    });
});

app.listen(3001, () => console.log("Bridge funcionando en puerto 3001"));
