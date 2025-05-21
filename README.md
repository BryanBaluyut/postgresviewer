# PostgreSQL Database Viewer

A modern, lightweight web application that allows you to connect to PostgreSQL servers and view their databases. Built with React, TypeScript, and Express.

## Features

- 🔐 Secure PostgreSQL server connection handling
- 🌙 Modern dark mode interface
- 📋 List all databases on connected servers
- ⚡ Fast and responsive user interface
- 🔒 Secure password handling (never stored)

## Usage

1. **Connect to a Database Server:**
   - Enter your PostgreSQL server details:
     - Host (default: localhost)
     - Port (default: 5432)
     - Username
     - Password
   - Click "Connect" to establish the connection

2. **View Databases:**
   - Upon successful connection, you'll see a list of all available databases
   - The list excludes template databases for clarity
   - Each database is displayed with a clear, clickable interface

## Development

To run the application locally:

1. **Install Dependencies:**
   ```powershell
   npm install
   ```

2. **Start Development Servers:**
   ```powershell
   # Start both frontend and backend
   npm run dev

   # Or start them separately:
   npm run dev:client  # Frontend only (port 3000)
   npm run dev:server  # Backend only (port 3002)
   ```

3. **Build for Production:**
   ```powershell
   npm run build
   ```

## Security Features

- No data persistence - all connection details are only held in memory
- Secure password handling - never stored or logged
- CORS enabled backend API
- Input validation on both client and server
- Error handling with user-friendly messages

## Technical Stack

- Frontend: React, TypeScript, Vite, Mantine UI
- Backend: Node.js, Express, pg (node-postgres)
- Development: ESLint, TypeScript, Concurrently

## License

This project is licensed under the MIT License.

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
