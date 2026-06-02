<img src="https://i.ibb.co/N27JpMw0/512-1x-shots-so.png" alt="512 1x shots so" border="0">

# Sentiment Analysis App

A full-stack sentiment analysis application that classifies user-provided text through a FastAPI backend and a React frontend. The backend loads trained machine learning artifacts, preprocesses the input text, predicts the sentiment class, and returns the result to the frontend for display.

## Project Overview

The project is split into two main parts:

| Area             | Description                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| Backend          | FastAPI API service that loads the trained model, vectorizer, and label encoder from serialized `.pkl` files.  |
| Frontend         | Vite React application with a text input interface for submitting text and displaying the predicted sentiment. |
| Machine Learning | Uses a scikit-learn model with a stored vectorizer and label encoder for text classification.                  |
| Deployment       | Backend includes a `vercel.json` configuration for Vercel Python deployment.                                   |

## Tech Stack

| Layer                    | Technology                                                     |
| ------------------------ | -------------------------------------------------------------- |
| Frontend Framework       | React 19                                                       |
| Frontend Build Tool      | Vite                                                           |
| Frontend Language        | TypeScript                                                     |
| Styling                  | Tailwind CSS, shadcn/ui styles                                 |
| UI Utilities             | Radix UI, class-variance-authority, lucide-react, motion, GSAP |
| HTTP Client              | Axios                                                          |
| Backend Framework        | FastAPI                                                        |
| Backend Language         | Python 3.13                                                    |
| Validation and Settings  | Pydantic, pydantic-settings                                    |
| Machine Learning         | scikit-learn                                                   |
| Model Serialization      | joblib                                                         |
| Backend Package Manager  | uv                                                             |
| Frontend Package Manager | npm                                                            |

## Features

- Text sentiment prediction through a REST API.
- Preprocessing for URLs, digits, emojis, and punctuation before prediction.
- Serialized model loading from `backend/ai_models`.
- CORS configuration through an environment variable.
- Responsive React interface with loading and error states.
- Sentiment-based visual result styling.

## Project Structure

```text
sentiment-analysis/
|-- backend/
|   |-- ai_models/
|   |   |-- LabelEncoder.pkl
|   |   |-- model.pkl
|   |   `-- vectorizer.pkl
|   |-- config.py
|   |-- helper.py
|   |-- main.py
|   |-- pyproject.toml
|   |-- uv.lock
|   `-- vercel.json
|-- frontend/
|   |-- public/
|   |   `-- logo.svg
|   |-- src/
|   |   |-- api/
|   |   |   `-- base.ts
|   |   |-- components/
|   |   |-- App.tsx
|   |   |-- index.css
|   |   `-- main.tsx
|   |-- package.json
|   |-- package-lock.json
|   `-- vite.config.ts
|-- .gitignore
`-- README.md
```

## Backend Details

The backend is defined in `backend/main.py`.

| Endpoint   | Method | Description                                                   |
| ---------- | ------ | ------------------------------------------------------------- |
| `/`        | `GET`  | Health check endpoint that returns the API status.            |
| `/predict` | `POST` | Accepts text input and returns the predicted sentiment label. |

### Prediction Flow

1. The API receives raw text in the request body.
2. The text is preprocessed in `backend/helper.py`.
3. The cleaned text is transformed with `vectorizer.pkl`.
4. The transformed vector is passed to `model.pkl`.
5. The numeric prediction is converted to a readable label with `LabelEncoder.pkl`.
6. The API returns the prediction number and sentiment label.

### Request Example

```json
{
      "text": "I really like this product"
}
```

### Response Example

```json
{
      "prediction": 1,
      "Label": "joy"
}
```

## Frontend Details

The frontend is a Vite React application located in `frontend`.

| File                                      | Purpose                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------- |
| `src/App.tsx`                             | Main page layout and application shell.                                         |
| `src/api/base.ts`                         | Axios API client configuration.                                                 |
| `src/components/chatgpt-prompt-input.tsx` | Text input, submit handling, loading state, error handling, and result display. |
| `src/components/alert.tsx`                | Reusable alert component used for sentiment output.                             |
| `src/index.css`                           | Tailwind CSS imports, theme variables, and base styles.                         |

The frontend sends a `POST` request to `/predict` and displays the returned `Label` value.

## Environment Variables

Create environment files in the backend and frontend folders.

### Backend

Create `backend/.env`:

```env
FRONTEND_URL=http://localhost:5173
```

| Variable       | Description                                         |
| -------------- | --------------------------------------------------- |
| `FRONTEND_URL` | Frontend origin allowed by FastAPI CORS middleware. |

### Frontend

Create `frontend/.env`:

```env
VITE_FRONTEND_URL=http://localhost:8000
```

| Variable            | Description                                     |
| ------------------- | ----------------------------------------------- |
| `VITE_FRONTEND_URL` | Base URL used by Axios to call the backend API. |

## Installation and Setup

### Backend Setup

Run the backend from the `backend` directory because the model files are loaded with paths relative to that folder.

```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

The backend will run by default at:

```text
http://localhost:8000
```

### Frontend Setup

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run by default at:

```text
http://localhost:5173
```

## Available Frontend Scripts

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Starts the Vite development server.                          |
| `npm run build`     | Runs TypeScript build checks and creates a production build. |
| `npm run lint`      | Runs ESLint on the frontend code.                            |
| `npm run format`    | Formats TypeScript and TSX files with Prettier.              |
| `npm run typecheck` | Runs TypeScript checks without emitting files.               |
| `npm run preview`   | Serves the production build locally.                         |

## Notes

- The trained model files must remain available in `backend/ai_models`.
- The backend should be started from the `backend` directory unless the model loading paths are changed.
- The frontend environment variable name is currently `VITE_FRONTEND_URL`, but it stores the backend API base URL.
- The current UI maps common labels such as `joy`, `anger`, `surprise`, `fear`, `sadness`, and `love` to different alert styles.
