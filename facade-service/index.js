const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

// Endpoint unificado que actúa como Facade
app.post('/api/facade/reserva', async (req, res) => {
  try {
    // Llamada al Aggregator Service (asegúrate que esté corriendo en el puerto 8080)
    const aggregatorResponse = await fetch('http://127.0.0.1:8080/api/aggregator/consolidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([req.body])   // Enviamos un array
    });
    const aggregatorData = await aggregatorResponse.text();

    // Llamada al Orchestrator Service (asegúrate de configurarlo para que corra en el puerto 8081)
    const orchestratorResponse = await fetch('http://localhost:8081/api/orchestrator/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([req.body])   // Enviamos un array
    });
    const orchestratorData = await orchestratorResponse.text();

    res.json({
      message: 'Facade processed the request successfully',
      aggregator: aggregatorData,
      orchestrator: orchestratorData
    });
  } catch (error) {
    console.error('Error in Facade Service:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Facade Service is running.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Facade Service running on port ${PORT}`));
