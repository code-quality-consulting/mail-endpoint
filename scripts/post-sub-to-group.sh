KEY=$(cat ./env | grep -o 'KEY.*' | cut -f2- -d=) \
ID=$(cat ./env | grep -o 'ID.*' | cut -f2- -d=) \
curl -v http://api.mailerlite.com/api/v2/groups/${ID}/subscribers \
-X POST \
-H "Content-Type: application/json" \
-H "X-MailerLite-ApiKey: $KEY" \
-d '{"email":"demo@mailerlite.com", "name":"CQC", "fields": {"company": "CQC"}}'
