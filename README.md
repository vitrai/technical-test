# technical-test

Vitr.ai developer technical test

## Project Structure

This repository contains a full-stack application with:

- **Backend**: Express.js API
- **Frontend**: Vue3 application with a textbox that calls the backend
- **Docker Compose**: Configuration to run both apps with hot reload

## Prerequisites

- Docker and Docker Compose
- An IDE of your choice (e.g., VS Code) + NodeJS 22 to run tests.
  - Using Volta or nvm is recommended to manage Node versions!
- A UNIX based system. (Linux, MacOS, WSL2 on Windows)

## Getting Started

### Running with Docker Compose

1. Start both applications:

```bash
docker compose up -d
```

2. Access the applications:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5170

3. Run tests

```bash
cd ./backend && npm test
cd ../frontend && npm run test:unit
```

## Your mission
