const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sheetsReadRoute = require("./routes/spreadsheet"); // add this


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admin-data", sheetsReadRoute); // add this line
app.listen(5050, () => console.log("Server running on port 5050"));
