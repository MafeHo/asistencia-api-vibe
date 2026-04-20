const serverless = require('serverless-http');
const app = require('../src/server');

// Exportar como función serverless para Vercel
module.exports = serverless(app);