const express = require("express");
const { Builder } = require("xml2js");
const app = express();

app.use(express.json());

app.post("/translate/reserva-to-factura", (req, res) => {
    const builder = new Builder({rootName: "reserva"});
    res.json({
        status: "Éxito",
        xml: builder.buildObject(req.body),
        datos: req.body
    });
});

app.listen(3000, () => console.log("Bridge funcionando en puerto 3000"));