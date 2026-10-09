# 🌾 KisanSmart IoT: Smart Soil Moisture Detection & Automated Irrigation System

[![Live Demo](https://img.shields.io/badge/Live_Dashboard-GitHub_Pages-success?style=for-the-badge&logo=github)](https://bhargavi17-jpg.github.io/Smart-Soil-IOT-/)
[![Backend Status](https://img.shields.io/badge/Backend_API-Render_Live-blue?style=for-the-badge&logo=render)](https://render.com)
[![Hardware](https://img.shields.io/badge/Hardware-ESP32_Microcontroller-orange?style=for-the-badge&logo=espressif)](https://www.espressif.com/)

An end-to-end Internet of Things (IoT) solution designed to eliminate water wastage and optimize crop yields through real-time soil moisture telemetry and automated irrigation management. Built with a farmer-first user experience including multi-language support (English, Telugu, Hindi) and voice alerts.

---

## 🚀 Live Links
- **Interactive Web App**: [https://bhargavi17-jpg.github.io/Smart-Soil-IOT-/](https://bhargavi17-jpg.github.io/Smart-Soil-IOT-/)
- **Repository**: [https://github.com/bhargavi17-jpg/Smart-Soil-IOT-](https://github.com/bhargavi17-jpg/Smart-Soil-IOT-)

---

## 🌟 Key Features

- **Real-Time Soil Telemetry**: Visual dynamic dial and historical trend charts displaying field moisture percentage, ambient temperature, and relative air humidity.
- **Multilingual & Voice Assistance**: Regional voice announcer supporting English, Telugu (తెలుగు), and Hindi (हिन्दी) for non-technical rural accessibility.
- **Autonomous Irrigation Engine**: Auto-triggers the relay-controlled submersible pump when soil moisture drops below preset crop thresholds and turns off once optimal saturation is reached.
- **Manual Cloud Override**: Farmers can remotely toggle the water pump on or off directly from the web dashboard.
- **Crop & Soil Profiler**: Pre-configured moisture thresholds tailored for Black Cotton Soil, Red Soil, and key crops like Cotton, Chilli, Paddy, and Vegetables.

---

## 🛠️ Hardware Architecture & Wiring

| Component | Pin | ESP32 Pin | Signal / Voltage | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Capacitive Soil Sensor v1.2** | VCC | 3V3 | 3.3V DC | Sensor power |
| **Capacitive Soil Sensor v1.2** | GND | GND | 0V Ground | Ground reference |
| **Capacitive Soil Sensor v1.2** | AOUT | GPIO 34 | Analog (0–3.3V) | Moisture impedance reading |
| **5V Relay Module** | VCC | VIN (5V) | 5.0V DC | Coil activation power |
| **5V Relay Module** | GND | GND | 0V Ground | Common ground |
| **5V Relay Module** | IN | GPIO 26 | Digital Output | Pump switch trigger |

---

## 💻 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Chart.js, Web Speech API (Hosted on GitHub Pages)
- **Backend**: Node.js, Express.js, REST API, WebSockets (Hosted on Render)
- **Firmware**: C++ / Arduino Framework on ESP32 DevKit V1
- **Protocols**: HTTP REST / JSON Telemetry

---

## ⚡ How It Works

1. The **Capacitive Soil Moisture Sensor** samples soil impedance to prevent galvanic corrosion commonly caused by resistive probes.
2. The **ESP32** averages multi-sample analog readings, maps them to a calibrated 0–100% moisture scale, and transmits JSON payloads to the cloud backend every 5 seconds.
3. The **Node.js Cloud Engine** evaluates incoming values against crop-specific thresholds, automatically commanding the relay to actuate irrigation.
4. The **Web Dashboard** updates telemetry live, allowing full monitoring and manual control from any browser worldwide.
