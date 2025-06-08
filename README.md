# AI Stylist App

An intelligent styling assistant application that provides personalized fashion recommendations using AI.

## Description

AI Stylist App is a modern web application that leverages artificial intelligence to help users discover their personal style and get customized fashion recommendations. The app analyzes user preferences and style goals to suggest outfits and styling tips.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- Git

## Installation

1. Clone the repository:

```bash
git clone git@github.com:ipra-kollektivet/ai-fashion.git
cd ai-stylist-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create database and user
CREATE DATABASE ai_stylist_dev;
CREATE USER stylist_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE ai_stylist_dev TO stylist_user;
\q
```

4. Create environment variables:

```bash
cp .env
```

5. Update your `.env` file with the database configuration:

```
DATABASE_URL=postgresql://stylist_user:your-password@localhost:5432/ai_stylist_dev
```

## Usage

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## Database Configuration

Your PostgreSQL database is configured with:

- **Database**: `ai_stylist_dev`
- **User**: `stylist_user`
- **Password**: `your-password`
- **Host**: `localhost`
- **Port**: `5432`

## Tech Stack

- Frontend: [To be added based on your chosen framework]
- Backend: [To be added based on your chosen framework]
- Database: PostgreSQL
- AI/ML: [To be specified]

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a merge request

## License

This project is licensed under the MIT License.

## Project Status

🚧 **Under Development** - This project is currently in active development.
