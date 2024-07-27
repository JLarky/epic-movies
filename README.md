# Client to the movies database

Database https://0kadddxyh3.execute-api.us-east-1.amazonaws.com

To create a new auth token, use the following command:

```bash
(echo -n 'PUBLIC_KEY='; curl -s https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/auth/token | jq .token) >> .env
```

This will save the key in the `.env` file (only stored on your computer).

Make sure to set this value in production (where you deploy your code) as an environment variable.

## Some notes

- instead of using just plain client-side data fetching I'm using Astro action, which allowed me to have better type safety (and it could be even better ;)) and potentially things like hiding the api key from the client, and using stuff like `node-cache` for caching API requests on the server side.
- This implementation is a nice example of using jotai for inter-island communication.
- it was nice to take a break from my usual Vercel/Netlify/Deno Deploy environment and use Zeabur for a change.
 
## Things I wish I could improve

- pass `const movies = await movieSearch();` to the `initialData` of react-query to fix the initial loading of the page
- obviously the design, I have zero designed components, everything is just using React inline styles :)
- I wish I had time to debug accessibility of the components
- Everything is done as an SPA without any state saved to the URL state, which makes using the app a bit clunky 
