import { ExpressPeerServer } from "peer";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://explosion-scratch.github.io",
  }),
);

const PORT = process.env.PORT || 9000;
const PATH = "/";

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}${PATH}`);
});

function generateClientId() {
  const randomWords = [
    "alpha",
    "bravo",
    "charlie",
    "delta",
    "echo",
    "foxtrot",
    "golf",
    "hotel",
    "india",
    "juliett",
    "kilo",
    "lima",
    "mike",
    "november",
    "oscar",
    "papa",
    "quebec",
    "romeo",
    "sierra",
    "tango",
    "uniform",
    "victor",
    "whiskey",
    "x-ray",
    "yankee",
    "zulu",
  ];
  return `${randomWords[Math.floor(Math.random() * randomWords.length)]}-${randomWords[Math.floor(Math.random() * randomWords.length)]}-${Math.floor(Math.random() * 1000)}`;
}

const peerServer = ExpressPeerServer(server, {
  path: PATH,
  generateClientId,
  allow_discovery: true,
  proxied: true,
});

app.use(PATH, peerServer);

peerServer.on("connection", (client) => {
  console.log(`Client connected: ${client.id}`);
});

peerServer.on("disconnect", (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

export default app;
