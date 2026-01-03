## API Documentation

This project provides REST APIs built using Django Rest Framework.

### Base URL
http://127.0.0.1:8000/api


---

### API Testing using Insomnia or Postman

An Insomnia collection is provided in YAML format.

#### How to import:
1. Open Insomnia or Postman
2. Click **Application → Import**
3. Select `insomnia-api.yaml`
4. All API requests will be available for testing

---

### Available APIs

#### Users
- `GET /users/`
- `POST /users/`
- `PUT /users/{id}/`
- `DELETE /users/{id}/`

#### Products
- `GET /products/`
- `GET /products/{id}`
- `POST /products/`
- `PATCH /products/{id}/`
- `DELETE /products/{id}/`

#### Orders
- `GET /orders/?status=PAID&page=1&limit=10`
- `GET /orders/status=PAID`
- `GET /orders`
- `POST /orders/`
- `PATCH /orders/{id}/`
- `PUT /orders/{id}/`
- `DELETE /orders/{id}/`

#### Order Items
- `GET /order-items/`
- `GET /order-items/{id}/`
- `POST /order-items/`
- `PATCH /order-items/{id}/`
- `PUT /order-items/{id}/`
- `DELETE /order-items/{id}/`

#### Reports
- `GET /users/top_spenders/`
- `GET /products/out-of-stock/`
- `GET /orders/summary/`
