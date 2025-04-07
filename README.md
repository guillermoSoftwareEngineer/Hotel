# Hotel
Service Hotel

ejecucion desde aggregator service terminal 1

./mvnw spring-boot:run

Ejecucion desde Bridge service terminal 2
 node server.js

 Ejecucion desde cualquier sitio dentro del proyecto raiz terminal 3

$body = '[{"reservaId":"123"}]'
>> $response = Invoke-RestMethod -Uri "http://localhost:8080/api/aggregator/consolidate" -Method Post -ContentType "application/json" -Body $body
>> Write-Output $response



 Ejecucion desde orchestrator-service terminal 4

.\mvnw.cmd spring-boot:run

 Ejecucion desde facade-service terminal 5

 node index.js

  Ejecucion desde cualquier sitio dentro del proyecto terminal 6 (power shell)

Invoke-RestMethod -Uri "http://localhost:4000/api/facade/reserva" -Method Post -ContentType "application/json" -Body '[{"reservaId": "123"}]'
