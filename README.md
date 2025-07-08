# NestJS CMS Microservice

A robust Content Management System (CMS) microservice built with NestJS, featuring real-time updates, content versioning, and role-based access control.

## Features

- 🔐 User Authentication & Authorization
- 👥 Role-Based Access Control (Admin, Editor, Author, Viewer)
- 📝 Content Management with Versioning
- 🔄 Real-time Updates via WebSockets
- 📊 Swagger API Documentation
- 🐳 Docker Support
- 🧪 Comprehensive Testing Suite

## Tech Stack

- **Framework:** NestJS v11
- **Language:** TypeScript v5.7
- **Database:** PostgreSQL with TypeORM
- **Caching:** Redis with IORedis
- **Queue Management:** BullMQ
- **Authentication:** Passport & JWT
- **Real-time Communication:** Socket.io
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest & Supertest

## Prerequisites

- Node.js (LTS Version)
- PostgreSQL
- Redis
- Docker (optional)

## 🛠️ Installation and Setup

### Local

1. Clone the repository:
```bash
$ git clone git@github.com:LucasSalicano/api-nestjs-microservices.git
```

2. Navigate to the project directory:
```bash
$ cd api-nestjs-microservices
```

3. Create a `.env` file in the root directory and configure your environment variables. You can use the provided `.env.example` as a reference:
```bash
$ cp .env.example .env
```

4. Install dependencies:
```bash
$ npm install
```

5. Run docker-compose to start the application:
```bash
$ docker-compose up -d
```
6. API Documentation will be available at:
```bash
http://localhost:5000/api/docs
```