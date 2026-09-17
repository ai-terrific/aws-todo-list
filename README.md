# AWS Todo List

A full-stack todo application with a React and Vite frontend and a Serverless Framework backend running on AWS Lambda and DynamoDB.

## Project Structure

```text
backend/    AWS Lambda handlers, Serverless configuration, and DynamoDB access
frontend/   React and Vite application
.github/    GitHub Actions deployment workflow
```

## Requirements

- Node.js 20 or newer
- npm
- AWS credentials with permission to deploy Lambda, API Gateway, DynamoDB, CloudFormation, and IAM resources

## Run Locally

Install dependencies in both applications:

```powershell
cd backend
npm install

cd ..\frontend
npm install
```

Start the backend locally:

```powershell
cd backend
npm run dev
```

Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

The frontend runs on `http://localhost:3000`.

The frontend reads the API URL from `VITE_API_BASE_URL`. Create `frontend/.env` with the deployed API URL when testing against AWS:

```env
VITE_API_BASE_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev
```

## API

The deployed development API uses these routes:

```text
POST   /tasks       Create a task
GET    /tasks       List all tasks
GET    /tasks/:id   Get one task
PUT    /tasks/:id   Update a task
DELETE /tasks/:id   Delete a task
```

Example request:

```powershell
$body = @{ title = "Read the documentation"; description = "Review the project setup" } | ConvertTo-Json
Invoke-RestMethod `
  -Uri "https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/dev/tasks" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## Backend Deployment

Configure AWS credentials in your shell, then run:

```powershell
cd backend
npm run deploy:dev
```

The production stage is available with:

```powershell
npm run deploy:prod
```

The deployment creates the API Gateway endpoints, Lambda functions, and a DynamoDB table named `crud-api-tasks-<stage>` in `us-east-1`.

To display the deployed endpoint and functions:

```powershell
npx serverless info --stage dev
```

## Frontend Build

Create a production build with:

```powershell
cd frontend
npm run build
```

The static files are written to `frontend/dist`. Deploy this directory to a static host such as Amazon S3 with CloudFront, Vercel, or Netlify.

The GitHub Actions workflow deploys the backend. PM2 commands in a GitHub-hosted runner do not provide permanent frontend hosting because the runner is removed after the workflow completes.

## Validation

Backend type check:

```powershell
cd backend
npm run type-check
```

Frontend type check:

```powershell
cd frontend
npm run lint
```

## Security Notes

- Never commit `.env` files or AWS credentials.
- Store `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` as GitHub Actions secrets.
- The API is currently public. Add authentication and authorization before production use.
