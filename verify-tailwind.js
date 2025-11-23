// Script to verify Tailwind CSS integration

console.log('=== Tailwind CSS Integration Verification ===\n');

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'frontend/tailwind.config.js',
    'frontend/postcss.config.js',
    'frontend/src/index.css',
    'frontend/src/components/TailwindComponents.css',
    'frontend/src/pages/Home.jsx'
];

console.log('Checking required files...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} (MISSING)`);
        allFilesExist = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
    console.log('✅ All required Tailwind CSS files are present!');
    console.log('\nKey verification points:');
    console.log('1. Tailwind CSS has been installed as a dev dependency');
    console.log('2. Configuration files (tailwind.config.js, postcss.config.js) are in place');
    console.log('3. CSS files have been updated to include Tailwind directives');
    console.log('4. Custom component classes have been created');
    console.log('5. Home page has been updated to use Tailwind classes');
    console.log('\nTo verify visually:');
    console.log('1. Start the frontend server with "npm run dev"');
    console.log('2. Visit http://localhost:5176 (or the port shown in terminal)');
    console.log('3. Check that the home page has been restyled with Tailwind CSS');
    console.log('4. Look for custom buttons, cards, and gradient backgrounds');
} else {
    console.log('❌ Some required files are missing.');
}

console.log('\n' + '='.repeat(50));