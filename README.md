<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  Backend API built with <a href="http://nodejs.org" target="_blank">Node.js</a> and
  <a href="https://nestjs.com" target="_blank">NestJS</a> for managing candidates and processing Excel uploads.
</p>

---

## Candidates Backend API

Backend service developed as part of a technical assessment.  
The API allows creating, retrieving, updating and deleting candidates. Candidate creation combines form data with information extracted from an uploaded Excel file.

---

## Author

- **Name:** Andrés Felipe Serrano Barrios  
- **Email:** andresfserrano1@gmail.com  

---

## Tech Stack

- **Framework:** NestJS (TypeScript)
- **Database:** SQLite
- **ORM:** TypeORM
- **File Upload:** Multer
- **Excel Parsing:** xlsx
- **Validation:** class-validator / class-transformer

---

## Architecture Overview

The application follows a clean and modular architecture:

```
Controller  →  Service  →  Repository (TypeORM)
                    ↓
               Excel Parser
```

---

## Database

SQLite is used as the default database to keep the project lightweight and easy to run locally.

The application is designed to support PostgreSQL through environment-based configuration without requiring code changes, making it suitable for production environments if needed.

---

## API Endpoints

- **POST** `/candidates`
- **GET** `/candidates`
- **GET** `/candidates/:id`
- **PATCH** `/candidates/:id`
- **DELETE** `/candidates/:id`

---

## Excel Format

The uploaded Excel file must contain exactly one data row with the following headers:

| Seniority | Years of experience | Availability |

Example:
```
junior | 6 | true
```

---

## Project Setup

```bash
npm install
```

---

## Running the Application

```bash
npm run start:dev
```

Application runs on:
```
http://localhost:3000
```

---

## License

MIT License
