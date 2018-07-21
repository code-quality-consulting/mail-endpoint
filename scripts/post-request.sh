curl -X POST https://api.mailerlite.com/api/v2/subscribers \
-d '{"email":"demo@mailerlite.com", "name": "Zach and Ben", "fields": {"company":"MailerLite"}}' \
-H "Content-Type: application/json" \
-H "X-MailerLite-ApiKey: 3c4ca8904371ef697f6d306d75d1d463"
