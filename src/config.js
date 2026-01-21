const config = {
  API_URL: process.env.REACT_APP_API_URL || 'https://investa-backend-1fih.vercel.app',
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || 'https://investa-lilac.vercel.app'
};

export default config;
```

### 8. **Dashboard - Create `.env` file** (for local development)
```
REACT_APP_API_URL=http://localhost:3002
REACT_APP_FRONTEND_URL=http://localhost:3001
```

### 9. **Dashboard - Create `.env.production` file** (for production)
```
REACT_APP_API_URL=https://investa-backend-1fih.vercel.app
REACT_APP_FRONTEND_URL=https://investa-lilac.vercel.app
