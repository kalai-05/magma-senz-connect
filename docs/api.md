# API

Base URL: `http://localhost:4000`

All requests require `Authorization: Bearer <Firebase ID Token>`.

## Auth
### POST /api/auth/me
Upserts a user by Firebase UID and returns the profile.

Response:
```json
{
  "_id": "...",
  "uid": "firebase_uid",
  "name": "Jane",
  "email": "jane@example.com",
  "role": "buyer",
  "status": "active"
}
```

## Users (admin)
### GET /api/users
### PATCH /api/users/:id/role
Body:
```json
{ "role": "ccr" }
```

### PATCH /api/users/:id/status
Body:
```json
{ "status": "disabled" }
```

## Products
### POST /api/products (farmer)
### GET /api/products/mine (farmer)
### GET /api/products/public (buyer/ccr/admin)
### PATCH /api/products/:id (owner farmer or admin)

## Demands
### POST /api/demands (buyer)
### GET /api/demands/mine (buyer)
### GET /api/demands/all (ccr/admin)
### PATCH /api/demands/:id (owner buyer or admin)

## Matches
### GET /api/matches/pending (ccr/admin)
### GET /api/matches/mine (buyer/farmer)
### PATCH /api/matches/:id/approve (ccr/admin)
### PATCH /api/matches/:id/reject (ccr/admin)
### POST /api/matches/recompute (ccr/admin)
