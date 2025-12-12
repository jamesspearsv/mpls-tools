POST http://localhost:3000/offline/checkouts HTTP/1.1
User-Agent: Local Client
Content-Type: application/json
Accept: */*

{
    "patronBarcode": "12345",
    "itemBarcodes": "123,456,789"
}
