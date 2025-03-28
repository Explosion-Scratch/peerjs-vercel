import { ExpressPeerServer } from 'peer';
import express from 'express';

// Create Express app
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const PATH = '/peerjs';

// Set up the PeerJS server as middleware
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  path: PATH,
  allow_discovery: true,
  proxied: true, // Important for Vercel
});

// Use PeerJS as middleware
app.use(PATH, peerServer);

// Event handlers
peerServer.on('connection', (client) => {
  console.log(`Client connected: ${client.id}`);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

// Basic route for health check
app.get('/', (req, res) => {
  res.send('PeerJS server is running');
});

// Export for Vercel serverless function
export default app;
