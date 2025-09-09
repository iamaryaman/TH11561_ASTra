Project Title - ASTra (Automated Speaking Tracker)
Team ID: TH11561

1. Overview:
ASTra is an innovative wearable device designed for the Ujjain Mahakumbh to help lost children, elderly, and disabled individuals navigate to safety through voice-guided GPS directions. The system operates independently of cellular networks using a 433MHz mesh network infrastructure deployed across event poles. It combines real-time location tracking with emergency messaging capabilities, ensuring families can be reunited quickly even in massive crowd situations where traditional communication fails.


2. Problem & Solution
Problem Statement: During large-scale events like Mahakumbh, vulnerable individuals (children, elderly, disabled) often get separated from their families in dense crowds. Cellular networks become unreliable due to congestion, creating critical communication gaps when emergency help is needed most.

Solution: ASTra provides a comprehensive safety ecosystem featuring voice-guided navigation wearables, mesh network communication, offline map storage, and real-time family tracking through mobile apps and centralized dashboards.

3. Logic & Workflow
Data Collection:

GPS coordinates captured via GP-02 GPS modules with A-GPS assistance

User activation through button press on wearable device

Emergency signals transmitted across 433MHz transceiver network

Processing:

Graph-based pathfinding using Dijkstra's algorithm on offline stored maps

Haversine formula calculations for nearest Lost & Found center location

LittleFS file system manages map data and OTA updates

Output:

Multilingual voice commands ("walk straight", "turn right") via DFPlayer Mini module

Real-time location data transmitted to guardian mobile apps

Emergency alerts broadcasted to authorities' centralized dashboard

User Side:

Guardian app with live tracking, battery status, mesh signal quality

QR code pairing system for device registration

Panic alerts and route change notifications

Admin Side:

Centralized dashboard monitoring all active devices

Device management with activation/deactivation controls

OTA map updates and emergency broadcast capabilities

4. Tech Stack
Frontend: HTML5, CSS, JavaScript (Mobile Apps), React.js (Dashboard)
Backend: Node.js + Express, Arduino C++ (Embedded Systems)
Database: PostgreSQL
Hardware: ESP32 Devkit, GP-02 GPS Module, DFPlayer Mini Audio Module, 433MHz RF Transceivers
File System: LittleFS for offline map storage
Communication: 433MHz mesh network protocol
Mobile Development: Cross-platform iOS and Android applications

5. Future Scope
The prototype can be scaled with advanced AI-powered crowd prediction algorithms, integration with smart city infrastructure, and multilingual expansion beyond Hindi and English. Future enhancements include biometric authentication, health monitoring sensors, and deployment across various mass gatherings, festivals, disaster relief scenarios, and institutional safety systems. The mesh network architecture can be adapted for permanent smart city installations, creating a resilient communication backbone for urban emergency management.