# Salon Appointment Booking System

Practical project demonstrating AngularJS, dependency injection, gender filtering, Express, MongoDB CRUD, XML and XSLT.

## Requirements
- Node.js and npm
- Local MongoDB running, or a MongoDB Atlas connection string
- Internet access for the AngularJS CDN

## Run
1. Open this folder in VS Code.
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell).
4. If using Atlas, set `MONGODB_URI` in `.env` to your connection string. Never commit or share `.env`.
5. Start MongoDB if using a local server.
6. Run `npm start`.
7. Open `http://localhost:3000`.

## CRUD API
- GET `/api/appointments` — list
- POST `/api/appointments` — create
- PUT `/api/appointments/:id` — update
- DELETE `/api/appointments/:id` — delete

Required fields: customerName, phone (10 digits), gender, service, stylist, date, timeSlot.

## XML/XSLT
Open `http://localhost:3000/xml/appointments.xml`. It references `appointments.xsl`, which sorts the sample records by customer name ascending and renders an HTML table. Some browsers may not render XSLT directly; if so, use an XML editor or XSLT processor.

AngularJS 1.x is end-of-life, but included because this practical specifically requires AngularJS.
