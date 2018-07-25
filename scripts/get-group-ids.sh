KEY=$(cat ./env | grep -o 'KEY.*' | cut -f2- -d=) \
curl -v http://api.mailerlite.com/api/v2/groups \
-H "X-MailerLite-ApiKey: $KEY" | jq '.[] | {id: .id, name: .name}'
