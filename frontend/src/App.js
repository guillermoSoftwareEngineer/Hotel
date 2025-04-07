import React, { useState } from 'react';
import './App.css';

function App() {
  const [response, setResponse] = useState('');

  const handleSendReserva = async () => {
    try {
      const dataToSend = [{ reservaId: '123' }];
      const res = await fetch('http://localhost:8080/api/aggregator/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Sistema de Gestión Hotelera</h1>
      <button onClick={handleSendReserva}>Enviar Reserva</button>
      <p>Respuesta del Servidor: {response}</p>
    </div>
  );
}

export default App;
