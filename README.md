# technical-test
Vitr.ai developer technical test

## Project Structure

This repository contains a full-stack application with:
- **Backend**: Express.js API with a `/do-work` endpoint
- **Frontend**: Vue3 application with a textbox that calls the backend
- **Docker Compose**: Configuration to run both apps with hot reload

## Prerequisites

- Node.js 22.x
- Docker and Docker Compose (optional, for containerized deployment)

## Getting Started

### Running with Docker Compose

1. Start both applications:
```bash
docker-compose up
```

2. Access the applications:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

### Running Locally

#### Backend

```bash
cd backend
npm install
npm run dev    # Development mode with hot reload
npm test       # Run tests
```

The backend API will be available at `http://localhost:3001`

#### Frontend

```bash
cd frontend
npm install
npm run dev         # Development mode with hot reload
npm run test:unit   # Run tests
npm run build       # Production build
```

The frontend will be available at `http://localhost:5173`

## Features

### Backend
- Express.js server with CORS enabled
- POST `/do-work` endpoint that returns 200 OK
- Jest tests for HTTP endpoints
- Hot reload with `--watch` flag

### Frontend
- Vue3 single-page application
- Textbox that calls backend on input change
- Vitest tests for component functionality
- Hot reload with Vite

## Testing

Run all tests:

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm run test:unit
```

## Docker Configuration

The `docker-compose.yaml` file:
- Uses Node 22 base image
- Installs packages automatically on startup
- Mounts local directories as volumes for hot reload
- Exposes ports 3001 (backend) and 5173 (frontend)

