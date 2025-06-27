const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
// const feedbackRoute = require("./routes/feedback");
// const adminFormRoute = require("./routes/adminFormData");
// const sheetsReadRoute = require("./routes/sheetsRead"); // add this


dotenv.config();
const app = express();

connectDB(); // ✅ connect DB

app.use(cors());
app.use(express.json());

const chatRoute = require("./routes/chat");
// const googleSheetRoute = require("./routes/googleSheet"); 

app.use("/api/chat", chatRoute);
app.use("/admin/chats", chatRoute); // optional
// app.use("/api/sheets", googleSheetRoute); // ✅
// app.use("/api/feedback", feedbackRoute);
// app.use("/admin/forms", adminFormRoute);
// app.use("/api/admin-data", sheetsReadRoute); // add this line
app.listen(5000, () => console.log("Server running on port 5000"));
