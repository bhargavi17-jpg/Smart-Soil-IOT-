const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

let systemState = {
    soilMoisturePercent: 42,
    temperature: 31.5,
    humidity: 65,
    pumpStatus: false,
    autoMode: true,
    moistureThreshold: 35,
    selectedCrop: "Cotton",
    selectedSoil: "Black Soil",
    lastUpdated: new Date().toLocaleTimeString()
};

app.get('/', (req, res) => {
    res.send('Smart Soil IoT API is running!');
});

app.get('/api/telemetry', (req, res) => {
    res.json(systemState);
});

app.post('/api/iot/update', (req, res) => {
    const { moisture, temp, humidity } = req.body;
    if (moisture !== undefined) systemState.soilMoisturePercent = Number(moisture);
    if (temp !== undefined) systemState.temperature = Number(temp);
    if (humidity !== undefined) systemState.humidity = Number(humidity);
    systemState.lastUpdated = new Date().toLocaleTimeString();

    if (systemState.autoMode) {
        if (systemState.soilMoisturePercent < systemState.moistureThreshold) {
            systemState.pumpStatus = true;
        } else if (systemState.soilMoisturePercent >= (systemState.moistureThreshold + 15)) {
            systemState.pumpStatus = false;
        }
    }

    io.emit('telemetryUpdate', systemState);
    res.status(200).json({ success: true, pumpStatus: systemState.pumpStatus });
});

app.post('/api/control', (req, res) => {
    const { pumpStatus, autoMode, moistureThreshold } = req.body;
    if (pumpStatus !== undefined) systemState.pumpStatus = pumpStatus;
    if (autoMode !== undefined) systemState.autoMode = autoMode;
    if (moistureThreshold !== undefined) systemState.moistureThreshold = Number(moistureThreshold);

    io.emit('telemetryUpdate', systemState);
    res.json({ success: true, state: systemState });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

