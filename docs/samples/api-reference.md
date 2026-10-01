# Orders API reference

!!! info "Sample document"
    Shows how I structure REST API reference documentation.

The Orders API lets you create, retrieve and update customer orders in Acme Commerce.

**Base URL:** `https://api.acme-example.com/v1`

## Authentication

All requests need a bearer token in the `Authorization` header. Generate a token in **Settings > API keys**.

```http
Authorization: Bearer <your_api_token>
```

!!! warning
    Keep your token secret. Don't commit it to source control or share it in client-side code.

## Rate limits

You can make up to **100 requests per minute** per token. If you exceed the limit, the API returns `429 Too Many Requests`. Check the `Retry-After` header for the number of seconds to wait.

---

## Create an order

`POST /orders`

Creates a new order for an existing customer.

### Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_id` | string | Yes | ID of an existing customer |
| `currency` | string | Yes | ISO 4217 currency code, e.g. `USD` |
| `items` | array | Yes | One or more order lines (see below) |
| `items[].sku` | string | Yes | Product SKU |
| `items[].quantity` | integer | Yes | Must be 1 or more |
| `notes` | string | No | Internal notes, up to 500 characters |

### Example request

=== "cURL"

    ```bash
    curl -X POST https://api.acme-example.com/v1/orders \
      -H "Authorization: Bearer $ACME_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "customer_id": "cus_8f21",
        "currency": "USD",
        "items": [
          { "sku": "LIC-PRO-ANNUAL", "quantity": 10 }
        ]
      }'
    ```

=== "Python"

    ```python
    import requests

    response = requests.post(
        "https://api.acme-example.com/v1/orders",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "customer_id": "cus_8f21",
            "currency": "USD",
            "items": [{"sku": "LIC-PRO-ANNUAL", "quantity": 10}],
        },
    )
    print(response.json())
    ```

### Example response

`201 Created`

```json
{
  "id": "ord_51c9",
  "status": "pending",
  "customer_id": "cus_8f21",
  "currency": "USD",
  "total": 4990.00,
  "items": [
    { "sku": "LIC-PRO-ANNUAL", "quantity": 10, "unit_price": 499.00 }
  ],
  "created_at": "2026-09-14T10:32:00Z"
}
```

---

## Retrieve an order

`GET /orders/{order_id}`

Returns a single order.

| Path parameter | Type | Description |
|---|---|---|
| `order_id` | string | The order ID, e.g. `ord_51c9` |

### Example response

`200 OK` – returns the same order object shown in [Create an order](#create-an-order).

---

## Order statuses

| Status | Meaning |
|---|---|
| `pending` | Order created, awaiting payment |
| `paid` | Payment received |
| `fulfilled` | Goods delivered or licenses provisioned |
| `cancelled` | Order cancelled before fulfilment |

## Errors

The API uses standard HTTP status codes and returns an error object:

```json
{
  "error": {
    "code": "invalid_sku",
    "message": "SKU 'LIC-PRO-ANUAL' does not exist."
  }
}
```

| HTTP status | Error code | Meaning |
|---|---|---|
| 400 | `invalid_request` | A required field is missing or malformed |
| 400 | `invalid_sku` | The SKU doesn't exist |
| 401 | `unauthorized` | Token is missing or invalid |
| 404 | `not_found` | No order with that ID |
| 429 | `rate_limited` | Too many requests – retry later |

## Related documents

- [Order-to-Cash process](order-to-cash.md)
- [Campaign-to-Order process](../streams/campaign-to-order.md)
- [Release notes example](release-notes.md)
