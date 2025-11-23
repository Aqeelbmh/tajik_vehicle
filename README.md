# Heavy Vehicle & Spare Parts Distribution Platform

A multilingual B2B/B2C platform for heavy machinery (tractors, lorries, bulldozers) and their genuine/aftermarket spare parts, focused on the Tajikistan market.

## Features

- **Multilingual Support**: English, Russian, and Tajik languages
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Product Catalogs**: Vehicle and spare parts listings with search and filtering
- **CRM Integration**: Lead management and partner inquiries
- **Modern UI/UX**: Professional design with animations and transitions
- **Admin CMS**: Content management system for easy updates
- **Database Integration**: Supabase (PostgreSQL) for persistent data storage

## Technology Stack

### Frontend
- React with Vite
- React Router for navigation
- i18next for internationalization
- Tailwind CSS for styling
- CSS Modules for component-specific styling

### Backend
- Node.js with Express
- PostgreSQL (Supabase) with Prisma ORM
- RESTful API architecture

### Deployment
- Railway for backend hosting
- Vercel for frontend hosting
- Docker containers

## Project Structure

```
tajik/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── admin/      # Admin dashboard components
│   │   ├── services/   # API service layer
│   │   ├── i18n.js     # Internationalization configuration
│   │   └── ...
│   ├── public/         # Static assets
│   └── ...
├── backend/            # Node.js backend API
│   ├── server.js       # Main server file
│   └── ...
└── docker-compose.yml  # Docker orchestration
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose (for containerized deployment)
- MongoDB (for local development without Docker)

### Development Setup

1. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the development servers:**
   
   In one terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   
   In another terminal, start the backend:
   ```bash
   cd backend
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5176
   - Backend API: http://localhost:8081/api
   - Health Check: http://localhost:8081/api/health

### Docker Deployment

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:8081/api
   - MongoDB: mongodb://localhost:27017

## API Endpoints

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update lead status

### Partners
- `GET /api/partners` - Get all partner inquiries
- `POST /api/partners` - Create a new partner inquiry

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `POST /api/vehicles` - Create a new vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Spare Parts
- `GET /api/spare-parts` - Get all spare parts
- `GET /api/spare-parts/:id` - Get spare part by ID
- `POST /api/spare-parts` - Create a new spare part
- `PUT /api/spare-parts/:id` - Update spare part
- `DELETE /api/spare-parts/:id` - Delete spare part

### Content Management
- `GET /api/content` - Get all content
- `GET /api/content/:page` - Get content by page
- `GET /api/content/:page/:section` - Get content by page and section
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Inquiries
- `POST /api/parts-inquiry` - Submit a parts inquiry
- `POST /api/vehicle-quote` - Request a vehicle quote

## Multilingual Support

The application supports three languages:
- English (en)
- Russian (ru)
- Tajik (tg)

Language can be switched using the dropdown in the header.

## Admin Access

### CMS Dashboard
Access the CMS dashboard by pressing `Ctrl+Shift+A` anywhere on the site to manage website content.

### CRM Dashboard
Access the CRM dashboard at `/admin/crm` to manage leads and partner inquiries.

## Styling with Tailwind CSS

This project uses Tailwind CSS for styling with a custom configuration that matches the project's design system:

- Primary color: `#0D2C54` (Deep navy blue)
- Secondary color: `#FFC107` (Vibrant yellow)
- Custom component classes for buttons, cards, and form elements
- Responsive design with mobile-first approach
- Utility-first workflow for faster development

Custom Tailwind components are defined in `src/components/TailwindComponents.css` and include:
- Button styles (`.btn-primary`, `.btn-secondary`, `.btn-outline`)
- Card components (`.card`, `.card-header`, `.card-body`, `.card-footer`)
- Form elements (`.form-input`, `.form-label`, `.form-select`)
- Gradient backgrounds (`.bg-gradient-primary`, `.bg-gradient-secondary`)

## Status

✅ Project is fully functional with all features implemented
✅ MongoDB database connection established and working
✅ All API endpoints operational
✅ Frontend and backend running successfully
✅ Docker configuration ready for deployment
✅ Tailwind CSS integrated for modern styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is proprietary and confidential. All rights reserved.