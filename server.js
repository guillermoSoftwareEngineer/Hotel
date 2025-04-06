const express = require('express');
const { json2xml } = require('xml-js');
const app = express();

app.use(express.json());

app.post('/translate/reserva-to-factura', (req, res) => {
    try {
        const xml = json2xml(JSON.stringify({ reserva: req.body }), { compact: true, spaces: 4 });
        res.json({ status: 'Factura emitida', xml: xml });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000, () => console.log('Bridge listo en puerto 3000'));