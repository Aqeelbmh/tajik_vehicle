// Script to verify that all required files have been created

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  // Frontend files
  'frontend/package.json',
  'frontend/src/App.jsx',
  'frontend/src/main.jsx',
  'frontend/src/i18n.js',
  'frontend/src/App.css',
  'frontend/src/components/Header.jsx',
  'frontend/src/components/HealthCheck.jsx',
  'frontend/src/pages/Home.jsx',
  'frontend/src/pages/Vehicles.jsx',
  'frontend/src/pages/Parts.jsx',
  'frontend/src/pages/Services.jsx',
  'frontend/src/pages/About.jsx',
  'frontend/src/pages/Partners.jsx',
  'frontend/src/pages/Gallery.jsx',
  'frontend/src/pages/Contact.jsx',
  'frontend/src/admin/CRMDashboard.jsx',
  'frontend/src/admin/CRMDashboard.css',
  'frontend/src/services/api.js',
  'frontend/.env',
  'frontend/Dockerfile',
  'frontend/nginx.conf',
  
  // Backend files
  'backend/package.json',
  'backend/server.js',
  'backend/.env',
  'backend/Dockerfile',
  'backend/scripts/init-db.js',
  'backend/scripts/test-api.js',
  
  // Root files
  'docker-compose.yml',
  'README.md',
  'architecture.md'
];

console.log('Verifying project setup...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} (MISSING)`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✅ All required files have been created successfully!');
  console.log('\nNext steps:');
  console.log('1. Install dependencies:');
  console.log('   cd frontend && npm install');
  console.log('   cd ../backend && npm install');
  console.log('2. Start the development servers:');
  console.log('   # In one terminal');
  console.log('   cd frontend && npm run dev');
  console.log('   # In another terminal');
  console.log('   cd backend && npm run dev');
  console.log('3. For Docker deployment:');
  console.log('   docker-compose up --build');
} else {
  console.log('❌ Some required files are missing. Please check the list above.');
}

console.log('\n' + '='.repeat(50));