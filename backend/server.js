const express = require('express');
const router = require("./src/routes")
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Chỉ cho phép origin này
  credentials: true, // Cho phép gửi credentials
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/v1", router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
