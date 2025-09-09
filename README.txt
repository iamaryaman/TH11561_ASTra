https://github.com/iamaryaman/TH11561_ASTra
Project Title - ASTra (Automated Speaking Tracker)
Team ID: TH11561

1. Overview:
ASTra is an innovative wearable device designed for the Ujjain Mahakumbh to help lost children, elderly, and disabled individuals navigate to safety through voice-guided GPS directions. The system operates independently of cellular networks using a 433MHz mesh network infrastructure deployed across event poles. It combines real-time location tracking with emergency messaging capabilities, ensuring families can be reunited quickly even in massive crowd situations where traditional communication fails.


2. Problem & Solution
Problem Statement: During large-scale events like Mahakumbh, vulnerable individuals (children, elderly, disabled) often get separated from their families in dense crowds. Cellular networks become unreliable due to congestion, creating critical communication gaps when emergency help is needed most.

Solution: ASTra provides a comprehensive safety ecosystem featuring voice-guided navigation wearables, mesh network communication, offline map storage, and real-time family tracking through mobile apps and centralized dashboards.

3. Logic & Workflow

The  pole  devices  which  make  up  our  dense  transceiver  network  take  up  distress  message  to  centres  using  the  established  433MHz  network
The  ASTra’s  GPS  gets  activated  and  gets  a  quick  lock  using  the  assistance  from  centres  for  rough  location
The  GPS  with  the  help  of magnetometer  positions  itself as  a  vector  on  our  offline  pre-stored  map  as  a  vector
Using  pre-defined  algorithm  we  guide  the  person  to  the  nearest  lost&found  centres
We  use  player  module  to  play  basic  commands  such  as  “walk  straight”, “turn  right”, etc.
Notification   of  emergency,  location  and  updates gets  sent  also  to  guardian’s  app

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

OTA map updates and emergency broadcast capabilities

4. Tech Stack
Frontend: HTML5, CSS, Swift (Mobile Apps)
Backend: Node.js + Express, Arduino C++ (Embedded Systems)
Database: PostgreSQL, MongoDB
Hardware: ESP32 Devkit, GP-02 GPS Module, DFPlayer Mini Audio Module, 433MHz RF Transceivers
File System: LittleFS for offline map storage
Communication: 433MHz mesh network protocol
Mobile Development: Cross-platform iOS and Android applications

5. Future Scope
Correction of direction axis’s which is disrupted by the position of wrist
Large scale implementation and testing of Transceivers.
Scaling into multilingualism for voice commands