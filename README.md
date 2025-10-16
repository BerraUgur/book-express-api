# book-express-api

## Project Structure

```
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── views/
│   └── data/
│       └── books.json
├── logs/
├── utils/
├── package.json
└── .gitignore
```

## Features
- User authentication (JWT, refresh token)
- Book CRUD operations
- Modular and modern file structure
- Centralized error handling and logging
- Environment variable support for secrets

## Usage
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Environment variables:**
   Create a `.env` file and add your JWT secrets:
   ```env
   JWT_ACCESS_SECRET=your_access_secret
   JWT_REFRESH_SECRET=your_refresh_secret
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `POST /api/auth/refresh-token` — Refresh JWT
- `POST /api/auth/logout` — Logout user

### Book Endpoints
- `GET /api/books` — List all books (supports pagination: `?page=1&limit=5`)
- `GET /api/books?genre=...` — Filter books by genre
- `GET /api/books?year=...` — Filter books by year
- `POST /api/books` — Add new book (validation middleware checks required fields and duplicate title)
- `PUT /api/books/:id` — Update book by id (validation middleware checks required fields)
- `DELETE /api/books/:id` — Delete book by id

## Best Practices
- All secrets and sensitive data are managed via environment variables.
- File read/write operations are optimized.
- Centralized error handling and logging.
- Unnecessary repetition and loops are removed, code is simplified.
- Validation middleware is used for all book endpoints to ensure data integrity and proper error handling.

## Example Book Data (books.json)

```json
[
   {
      "id": 1,
      "title": "1984",
      "author": "George Orwell",
      "year": 1949,
      "genre": "Dystopian",
      "pages": 328
   },
   {
      "id": 2,
      "title": "The Little Prince",
      "author": "Antoine de Saint-Exupéry",
      "year": 1943,
      "genre": "Children's literature",
      "pages": 96
   }
]
```

## Contribution & Development
- The codebase follows ES6+ and modern JavaScript standards.
- To add new features, use the relevant folders under `src/`.

---
For any questions, please contact the project owner.
