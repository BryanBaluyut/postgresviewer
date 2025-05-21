# PostgreSQL Database Viewer

A modern web application that allows you to connect to PostgreSQL servers and view their databases. Built with React, TypeScript, and Express.

## Features

- 🔐 Secure PostgreSQL server connection management
- 💾 Save and manage multiple database connections
- 🌙 Dark mode interface
- 📋 List all databases on the connected server
- 🔒 Secure password handling (never stored locally)

## Usage

1. **Connect to a Database Server:**
   - Enter your PostgreSQL server details (host, port, username, password)
   - Optionally save the connection for future use
   - Click "Connect" to establish the connection

2. **View Databases:**
   - Once connected, you'll see a list of all available databases
   - The list excludes template databases

3. **Managing Saved Connections:**
   - Save frequently used connections with a custom name
   - Select saved connections from the dropdown
   - Delete saved connections when no longer needed
   - Passwords are never stored for security

## Development

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start only the frontend
- `npm run dev:server` - Start only the backend
- `npm run build` - Build for production

## Security

- Passwords are never stored locally
- All connection details are secured and only stored in memory during the session
- Backend uses environment variables for sensitive data

## License

This project is licensed under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

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
