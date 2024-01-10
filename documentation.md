# Ticketing System

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`

- `GET /tickets`
- `GET /workOrder`
- `GET /tickets/:ticketId/ticketId`

- `POST /tickets`
- `POST /tickets/:ticketId/ticketId`
- `POST /workOrder`
- `POST /workOrder/accept/:workOrderId/workOrderId`
- `POST /workOrder/done/:workOrderId/workOrderId`
- `POST /notification`

&nbsp;

## 1. POST /register

Description:

- Create new user where email and user should be unique

Request:

- body:

```json
{
  "user": "User Name Here",
  "password": "userpass12345",
  "email": "user@gmail.com"
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Register success",
  "data": {
    "userId": 3,
    "user": "User Name Here",
    "email": "user@gmail.com",
    "updatedAt": "2024-01-10T03:02:21.331Z",
    "createdAt": "2024-01-10T03:02:21.331Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "code": 400,
    "success": false,
    "message": "User name already used",
    "data": null
}
OR
{
    "code": 400,
    "success": false,
    "message": "Email already used",
    "data": null
}
OR
{
    "code": 400,
    "success": false,
    "message": "Email is required",
    "data": null
}
OR
{
    "code": 400,
    "success": false,
    "message": "User name is required",
    "data": null
}
```

&nbsp;

## 2. POST /login

Description:

- Validate user existence and credentials. Return access token

Request:

- body:

```json
{
  "user": "User Name Here",
  "password": "userpass12345"
}
```

_Response (200 - OK)_

```json
{
  "code": 200,
  "success": true,
  "message": "Login success",
  "data": {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXIiOiJLYW1pc2F0byBBeWFrYSIsImlhdCI6MTcwNDg1NjE1NH0.Pz84rEwbvlLCWeY3uqA_teYGRpzL0qnLtk9oA_Pr-uw",
    "userId": 3,
    "user": "User Name Here",
    "email": "user@gmail.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "success": false,
  "message": "Please fill password and user completely",
  "data": null
}
```

_Response (401 - Unauthorized)_

```json
{
  "code": 401,
  "success": false,
  "message": "Wrong email or password",
  "data": null
}
```

&nbsp;

## 3. GET /tickets

Description:

- Get tickets data

Request:

- headers:

```json
{
  "authorization": "string (Bearer Token)"
}
```

- query params:

```json

  userId: "number"

```

_Response (200 - OK)_

```json
  {
    "code": 200,
    "success": true,
    "message": "Data fetched",
    "data": [
        {
            "ticketId": 2,
            "client": "XL-Axiata",
            "company": "XL",
            "trouble": "Engine Breakdown",
            "status": "ON PROGRESS",
            "statusLevel": 30,
            "userId": 1,
            "createdAt": "2024-01-04T03:07:14.000Z",
            "createdBy": "system@ebconnect.com",
            "updatedAt": "2024-01-04T03:49:32.000Z",
            "updatedBy": null,
            "deletedAt": null,
            "deletedBy": null
        },
        {
            "ticketId": 3,
            "client": "EB",
            "company": "Telkom",
            "trouble": "Unauthorized Consent",
            "status": "ON PROGRESS",
            "statusLevel": 30,
            "userId": 1,
            "createdAt": "2024-01-04T03:07:14.000Z",
            "createdBy": "system@ebconnect.com",
            "updatedAt": "2024-01-04T03:41:07.000Z",
            "updatedBy": null,
            "deletedAt": null,
            "deletedBy": null
        },
        ...
    ],
    "count": 2
}
```

&nbsp;

## 4. GET /workOrder

Description:

- Get work order data

Request:

- headers:

```json
{
  "authorization": "string (Bearer Token)"
}
```

- query params:

```json

  ticketId: "number",
  status: "string",

```

_Response (200 - OK)_

```json
  {
    "code": 200,
    "success": true,
    "message": "Data fetched",
    "data": [
        {
            "workOrderId": 4,
            "ticketId": 1,
            "status": "ON PROGRESS",
            "statusLevel": 30,
            "isAccepted": true,
            "createdAt": "2024-01-04T03:07:27.000Z",
            "createdBy": "arlie",
            "updatedAt": "2024-01-04T03:33:09.000Z",
            "updatedBy": null,
            "deletedAt": null,
            "deletedBy": null
        },
        ...
    ],
    "count": 1
}
```

&nbsp;

## 5. GET /tickets/:ticketId/ticketId

Description:

- Get ticket by ticketId

Request:

- headers:

```json
{
  "authorization": "string (Bearer Token)"
}
```

- query params:

```json

  ticketId: "number",

```

_Response (200 - OK)_

```json
{
  "code": 200,
  "success": true,
  "message": "Data fetched",
  "data": {
    "ticketId": 1,
    "client": "BACH",
    "company": "PTI",
    "trouble": "Vandalism",
    "status": "DONE",
    "statusLevel": 40,
    "userId": 2,
    "createdAt": "2024-01-04T03:07:14.000Z",
    "createdBy": "system@ebconnect.com",
    "updatedAt": "2024-01-04T04:09:14.000Z",
    "updatedBy": "arlie",
    "deletedAt": null,
    "deletedBy": null
  }
}
```

_Response (404 - Requested Data Not Found)_

```json
{
  "code": 404,
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

&nbsp;

## 6. POST /tickets

Description:

- Create new ticket

Request:

- body:

```json
{
  "client": "SMARTFREN",
  "company": "SMF",
  "trouble": "Electrical surge",
  "userId": 1
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Data created",
  "data": {
    "ticketId": 5,
    "client": "SMARTFREN",
    "company": "SMF",
    "trouble": "Electrical surge",
    "userId": 1,
    "status": "OPEN",
    "statusLevel": 10,
    "createdBy": "arlie",
    "updatedBy": "arlie",
    "updatedAt": "2024-01-10T03:20:42.414Z",
    "createdAt": "2024-01-10T03:20:42.414Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "success": false,
  "message": "User ID is required",
  "data": null
}
```

&nbsp;

## 7. POST /tickets/done/:ticketId/ticketId

Description:

- Change ticket status to done

Request:

- path params:

```json

  ticketId: "number"

```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Ticket status changed",
  "data": {
    "ticketId": 6,
    "client": null,
    "company": "SMF",
    "trouble": "Electrical surge",
    "status": "DONE",
    "statusLevel": 40,
    "userId": 1,
    "createdAt": "2024-01-10T03:21:38.000Z",
    "createdBy": "arlie",
    "updatedAt": "2024-01-10T03:30:29.000Z",
    "updatedBy": "arlie",
    "deletedAt": null,
    "deletedBy": null
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "success": false,
  "message": "Ticket status already done",
  "data": null
}
```

&nbsp;

## 8. POST /workOrder

Description:

- Create Work Order

Request:

- body:

```json
{
  "ticketId": 1
}
```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Data created successfully",
  "data": {
    "workOrderId": 14,
    "ticketId": 1,
    "status": "OPEN",
    "statusLevel": 10,
    "isAccepted": false,
    "createdBy": "arlie",
    "updatedBy": "arlie",
    "updatedAt": "2024-01-10T03:44:51.134Z",
    "createdAt": "2024-01-10T03:44:51.134Z",
    "ticket": {
      "ticketId": 1,
      "client": "BACH",
      "company": "PTI",
      "trouble": "Vandalism",
      "status": "DONE",
      "statusLevel": 40,
      "userId": 2,
      "createdAt": "2024-01-04T03:07:14.000Z",
      "createdBy": "system@ebconnect.com",
      "updatedAt": "2024-01-04T04:09:14.000Z",
      "updatedBy": "arlie",
      "deletedAt": null,
      "deletedBy": null
    }
  }
}
```

_Response (404 - Requested Data Not Found)_

```json
{
  "code": 404,
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

&nbsp;

## 9. POST /workOrder/accept/:workOrderId/workOrderId

Description:

- Change status work order to on progress

Request:

- path params:

```json

  workOrderId: "number"

```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Data updated successfully",
  "data": {
    "workOrderId": 9,
    "ticketId": 2,
    "status": "ON PROGRESS",
    "statusLevel": 30,
    "isAccepted": true,
    "createdAt": "2024-01-04T03:07:35.000Z",
    "createdBy": "arlie",
    "updatedAt": "2024-01-10T03:46:58.000Z",
    "updatedBy": "arlie",
    "deletedAt": null,
    "deletedBy": null,
    "Ticket": {
      "ticketId": 2,
      "client": "XL-Axiata",
      "company": "XL",
      "trouble": "Engine Breakdown",
      "status": "ON PROGRESS",
      "statusLevel": 30,
      "userId": 1,
      "createdAt": "2024-01-04T03:07:14.000Z",
      "createdBy": "system@ebconnect.com",
      "updatedAt": "2024-01-04T03:49:32.000Z",
      "updatedBy": null,
      "deletedAt": null,
      "deletedBy": null
    }
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "success": false,
  "message": "Can not accept work order that is already on progress or done",
  "data": null
}
```

_Response (404 - Requested Data Not Found)_

```json
{
  "code": 404,
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

&nbsp;

## 10. POST /workOrder/done/:workOrderId/workOrderId

Description:

- Change status work order to on progress

Request:

- path params:

```json

  workOrderId: "number"

```

_Response (201 - Created)_

```json
{
  "code": 201,
  "success": true,
  "message": "Data updated successfully",
  "data": {
    "workOrderId": 9,
    "ticketId": 2,
    "status": "DONE",
    "statusLevel": 40,
    "isAccepted": true,
    "createdAt": "2024-01-04T03:07:35.000Z",
    "createdBy": "arlie",
    "updatedAt": "2024-01-10T03:55:23.000Z",
    "updatedBy": "arlie",
    "deletedAt": null,
    "deletedBy": null,
    "Ticket": {
      "ticketId": 2,
      "client": "XL-Axiata",
      "company": "XL",
      "trouble": "Engine Breakdown",
      "status": "ON PROGRESS",
      "statusLevel": 30,
      "userId": 1,
      "createdAt": "2024-01-04T03:07:14.000Z",
      "createdBy": "system@ebconnect.com",
      "updatedAt": "2024-01-04T03:49:32.000Z",
      "updatedBy": null,
      "deletedAt": null,
      "deletedBy": null
    }
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "code": 400,
  "success": false,
  "message": "Work order status already done",
  "data": null
}
```

_Response (404 - Requested Data Not Found)_

```json
{
  "code": 404,
  "success": false,
  "message": "Resource not found",
  "data": null
}
```

&nbsp;

## 11. POST /notification

Description:

- Send email notification to multiple user that listed in body

Request:

- body:

```json
{
  "workOrderId": 1,
  "receiver": ["firstuser@gmail.com", "seconduser@gmail.com"]
}
```

_Response (201 - Created)_

```json
{
    "code": 201,
    "success": true,
    "message": "Email notifictaion created",
    "data": null
}
```

&nbsp;
