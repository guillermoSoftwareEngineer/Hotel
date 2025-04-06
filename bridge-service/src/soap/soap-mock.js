const soap = require('soap');
const express = require('express');
const app = express();

const service = {
  FacturacionService: {
    FacturacionPort: {
      emitirFactura: (args) => {
        return { success: true, facturaId: 'F-' + Math.random().toString(36).substring(7) };
      }
    }
  }
};

const xml = `
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/">
  <types>
    <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
      <xs:element name="emitirFactura">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="xml" type="xs:string"/>
          </xs:sequence>
        </xs:complexType>
      </xs:element>
    </xs:schema>
  </types>
  <message name="emitirFacturaRequest">
    <part name="parameters" element="tns:emitirFactura"/>
  </message>
</definitions>
`;

app.listen(8000, () => {
  soap.listen(app, '/facturacion', service, xml);
  console.log('SOAP Mock running on http://localhost:8000/facturacion?wsdl');
});