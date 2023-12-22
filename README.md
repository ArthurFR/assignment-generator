This is a Code challenge/skill assessment generator built with [Next.js](https://nextjs.org/) powered by [GPT](https://openai.com/product)

## Getting Started

First, copy the `.env.local.example` file with the name `.env.local`

Fill up the environment variable values with the following:
 - `AUTH_SECRET`: A random string that will be used to sign/encrypt cookies. You can use openssl `$ openssl rand -base64 32`.
 - `AUTH_GITHUB_ID`: [`Create a GitHub OAuth app`](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and get the Client ID.
 - `AUTH_GITHUB_SECRET`: [`Create a GitHub OAuth app`](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and generate a new client secret.
 - `OPENAI_API_KEY`: Create an [`OpenAI account`](https://platform.openai.com/signup) or [`sign in`](https://platform.openai.com/login). Navigate to the API key page and Create new secret key.


Next, in your terminal on the project folter run: 

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

