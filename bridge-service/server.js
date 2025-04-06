const express = require('express');
const xml2js = require('xml2js');
const { json2xml } = require('json2xml');
const soap = require('soap');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Mock de URL del servicio de facturación SOAP (simulado)
const SOAP_FACTURACION_URL = 'http://localhost:8000/facturacion?wsdl';

// 1. Endpoint para traducir JSON (Reserva) → XML (Facturación)
app.post('/translate/reserva-to-factura', async (req, res) => {
    try {
        const reservaJson = req.body;

        // Transformar JSON a XML (ejemplo simplificado)
        const facturaXml = json2xml({
            Factura: {
                ID: reservaJson.reservaId,
                Cliente: reservaJson.clienteNombre,
                Total: reservaJson.monto
            }
        });

        // Enviar XML al servicio SOAP de facturación (simulado)
        soap.createClient(SOAP_FACTURACION_URL, (err, client) => {
            client.emitirFactura({ xml: facturaXml }, (err, result) => {
                if (err) return res.status(500).send('Error en SOAP');
                res.send({ status: 'Factura emitida', data: result });
            });
        });

    } catch (error) {
        res.status(500).send('Error en Bridge: ' + error.message);
    }
});

// 2. Endpoint para traducir XML (Facturación) → JSON (Reserva)
app.post('/translate/factura-to-reserva', async (req, res) => {
    try {
        const xmlData = req.body.xml;

        // Convertir XML a JSON
        xml2js.parseString(xmlData, (err, result) => {
            if (err) throw err;
            const reservaJson = {
                reservaId: result.Factura.ID[0],
                estado: 'Facturado'
            };
            res.send(reservaJson);
        });

    } catch (error) {
        res.status(500).send('Error en Bridge: ' + error.message);
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Bridge Service running on http://localhost:${PORT}`);
});