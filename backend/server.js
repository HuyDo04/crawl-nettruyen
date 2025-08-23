const express = require('express');
require('dotenv').config();
const router = require("./src/routes")
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
const port = process.env.PORT || 3000;
const clientOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

console.log(`CORS Origin configured for: ${clientOrigin}`); // FOR DEBUGGING

app.use(cors({
  origin: clientOrigin,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/v1", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
