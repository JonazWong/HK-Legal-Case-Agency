# API Documentation

## Overview

The HK Legal Case Agency API provides RESTful endpoints for managing cases, clients, users, and other legal practice management features. All API routes require authentication via NextAuth.js session cookies.

## Authentication

All API routes (except `/api/auth/*`) require a valid session. Authentication is handled by NextAuth.js.

### Getting a Session
- **POST** `/api/auth/signin` - Sign in with credentials
- **POST** `/api/auth/signout` - Sign out
- **POST** `/api/auth/signup` - Create a new account

### Session Format
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "OWNER",
    "firmId": "firm_id",
    "locale": "zh"
  }
}
```

## Multi-Tenancy

All data is scoped to the authenticated user's firm (`firmId`). Users can only access data belonging to their firm.

## Common Response Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized to access resource
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Pagination

List endpoints support pagination via query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Response format:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

## Endpoints

### Dashboard

#### Get Dashboard Statistics
```
GET /api/dashboard/stats
```

Returns summary statistics for the authenticated user's firm.

**Response:**
```json
{
  "totalCases": 25,
  "activeCases": 15,
  "totalClients": 30,
  "pendingInvoices": 5
}
```

---

### Cases

#### List Cases
```
GET /api/cases?page=1&limit=10&status=ACTIVE&search=contract
```

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `status` (optional) - Filter by status: ACTIVE, PENDING, COMPLETED, ARCHIVED
- `search` (optional) - Search in case number, title, or description

**Response:**
```json
{
  "cases": [
    {
      "id": "case_id",
      "caseNumber": "HCA-2024-001",
      "title": "Commercial Lease Dispute",
      "description": "...",
      "category": "CORPORATE",
      "status": "ACTIVE",
      "filingDate": "2024-01-15T00:00:00.000Z",
      "closingDate": null,
      "courtReference": "HCA 123/2024",
      "estimatedBudget": "250000.00",
      "actualCost": null,
      "notes": "...",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z",
      "client": {
        "id": "client_id",
        "firstName": "Michael",
        "lastName": "Chan"
      },
      "assignedLawyer": {
        "id": "user_id",
        "name": "David Wong"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

#### Create Case
```
POST /api/cases
```

**Request Body:**
```json
{
  "title": "New Case Title",
  "description": "Case description",
  "category": "CORPORATE",
  "status": "PENDING",
  "filingDate": "2024-01-15",
  "courtReference": "HCA 123/2024",
  "estimatedBudget": "250000",
  "clientId": "client_id",
  "assignedLawyerId": "user_id",
  "notes": "Additional notes"
}
```

**Response:**
```json
{
  "message": "Case created successfully",
  "case": {
    "id": "case_id",
    "caseNumber": "HCA-2024-001",
    ...
  }
}
```

**Note:** Case number is auto-generated in format HCA-YYYY-NNN

#### Get Single Case
```
GET /api/cases/[id]
```

**Response:**
```json
{
  "id": "case_id",
  "caseNumber": "HCA-2024-001",
  ...,
  "client": { ... },
  "assignedLawyer": { ... },
  "timeEntries": [ ... ],
  "documents": [ ... ]
}
```

#### Update Case
```
PUT /api/cases/[id]
```

**Request Body:** Same as Create Case (all fields optional)

**Response:**
```json
{
  "message": "Case updated successfully",
  "case": { ... }
}
```

#### Delete Case
```
DELETE /api/cases/[id]
```

**Response:**
```json
{
  "message": "Case deleted successfully"
}
```

---

### Clients

#### List Clients
```
GET /api/clients?page=1&limit=10&search=chan
```

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `search` (optional) - Search in first name, last name, email, or company

**Response:**
```json
{
  "clients": [
    {
      "id": "client_id",
      "firstName": "Michael",
      "lastName": "Chan",
      "email": "michael.chan@example.com",
      "phone": "+852 9123 4567",
      "alternatePhone": null,
      "address": "...",
      "idNumber": "A123456(7)",
      "dateOfBirth": "1985-05-15T00:00:00.000Z",
      "occupation": "Business Owner",
      "company": "Chan Trading Ltd.",
      "notes": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": { ... }
}
```

#### Create Client
```
POST /api/clients
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+852 9123 4567",
  "alternatePhone": "+852 2123 4567",
  "address": "123 Main St, Hong Kong",
  "idNumber": "A123456(7)",
  "dateOfBirth": "1985-05-15",
  "occupation": "Business Owner",
  "company": "Doe Trading Ltd.",
  "notes": "VIP client"
}
```

**Response:**
```json
{
  "message": "Client created successfully",
  "client": { ... }
}
```

#### Get Single Client
```
GET /api/clients/[id]
```

**Response:**
```json
{
  "id": "client_id",
  ...,
  "cases": [
    {
      "id": "case_id",
      "caseNumber": "HCA-2024-001",
      "title": "...",
      "status": "ACTIVE",
      "filingDate": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### Update Client
```
PUT /api/clients/[id]
```

**Request Body:** Same as Create Client (all fields optional)

**Response:**
```json
{
  "message": "Client updated successfully",
  "client": { ... }
}
```

#### Delete Client
```
DELETE /api/clients/[id]
```

**Note:** Cannot delete client if they have associated cases.

**Response:**
```json
{
  "message": "Client deleted successfully"
}
```

**Error Response (if client has cases):**
```json
{
  "error": "Cannot delete client with associated cases"
}
```

---

## Data Models

### Case Categories
- `CIVIL` - Civil litigation
- `CRIMINAL` - Criminal defense
- `CORPORATE` - Corporate law
- `FAMILY` - Family law
- `PROPERTY` - Property law
- `IMMIGRATION` - Immigration law
- `LABOUR` - Labour law
- `OTHER` - Other cases

### Case Status
- `ACTIVE` - Currently active (進行中)
- `PENDING` - Pending confirmation (待確認)
- `COMPLETED` - Completed (已完成)
- `ARCHIVED` - Archived (已打檔)

### User Roles
- `OWNER` - Firm owner (full access)
- `ADMIN` - Administrator (most access)
- `STAFF` - Staff member (limited access)
- `CLIENT` - Client (read-only access to own data)

### Subscription Tiers
- `STARTER` - HK$3,100/month (1-2 users)
- `PROFESSIONAL` - HK$7,000/month (5-20 users)
- `ENTERPRISE` - HK$10,100+/month (20-100 users)
- `CUSTOM` - Custom pricing (100+ users)

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "details": { ... }  // Optional, for validation errors
}
```

### Validation Errors
```json
{
  "error": "Invalid input data",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email address"
    }
  ]
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. This should be added in production.

## CORS

CORS is configured to allow requests from the same origin only.

## Security

- All routes except `/api/auth/*` require authentication
- Multi-tenancy is enforced via `firmId` checks
- Input validation via Zod schemas
- Passwords are hashed with bcrypt
- Account lockout after 3 failed login attempts (30 minutes)
