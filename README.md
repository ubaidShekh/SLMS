# Smart Street Light Monitoring System

A real-time IoT-based street light monitoring and fault management system built for technicians and maintenance teams.

This system continuously monitors street lights using IoT hardware and automatically assigns fault-repair tasks to nearby technicians through a mobile application.

---

# Overview

Traditional street light maintenance is slow, manual, and inefficient. Fault detection often depends on public complaints or physical inspection.

This project automates the entire workflow:

- Street lights continuously send live status data to the backend
- Faults are detected automatically
- Nearby technicians receive instant task notifications
- Technicians can track assigned repair tasks directly from the mobile app
- Task status updates automatically after repair completion

---

# Core Features

## Real-Time Device Monitoring

Every street light sends live device status data to the backend every second.

Possible statuses:

- Working
- Fault Detected
- Offline

---

## Automatic Fault Detection

The system detects:

- Device offline state
- Electrical faults
- Power/current abnormalities

using voltage and current sensor data.

---

## Smart Technician Assignment

When a fault is detected:

- The nearest technician receives an instant notification
- A repair task is automatically generated
- The task appears inside the technician mobile application

---

## Technician Mobile App

Technicians can:

- View assigned repair tasks
- Track faulty street light status
- Visit the fault location
- Complete repair operations
- Automatically update task status after fixing the device

---

# Tech Stack

## Mobile Application

- React Native
- Expo

---

## Backend

- Express.js
- MongoDB Atlas

---

## IoT Hardware

- ESP8266
- Voltage Sensor
- Current Sensor

---

# System Workflow

```txt
Street Light Device
        ↓
ESP8266 sends live data
        ↓
Express.js Backend API
        ↓
MongoDB Atlas
        ↓
Fault Detection Engine
        ↓
Nearest Technician Notification
        ↓
Technician Mobile App
        ↓
Repair Completed
        ↓
Task Automatically Marked Done
```

---

# Screenshots

## Technician Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Assigned Tasks

![Tasks](assets/screenshots/completedTask.png)

---

## Fault Monitoring

![Monitoring](screenshots/taskDetailModal.png)

---

# Folder Structure

```txt
project-root/
│
├── app/
├── components/
├── screens/
├── backend/
├── assets/
│
──screenshots/
│
├── package.json
└── README.md
```

---

# Objectives

- Automate street light fault monitoring
- Reduce manual inspection work
- Improve repair response time
- Enable smart city infrastructure
- Provide real-time maintenance workflow

---

# Future Improvements

- Admin Panel
- Live GPS Tracking
- AI-Based Fault Prediction
- Energy Consumption Analytics
- Technician Performance Dashboard
- Real-Time Pole Location Mapping
- Push Notification System
- Maintenance History Logs

---

# Installation



## Install Dependencies

```bash
npm install
```

---

## Start Mobile App

```bash
npx expo start
```

---

# Developer

**Ubaid Shekh**  
React Native Developer  
Jamia Millia Islamia

---

# Project Status

Currently under active development.

---

# License

This project is developed for educational and smart city research purposes.