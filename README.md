# Client to movies database

Database https://0kadddxyh3.execute-api.us-east-1.amazonaws.com

To create a new auth token, use the following command:

```bash
(echo -n 'PUBLIC_KEY='; curl -s https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token | jq .token) >> .env
```

This will save the key in the `.env` file (only stored on your computer).
