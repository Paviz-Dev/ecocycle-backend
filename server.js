const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is alive!" });
});

// ✅ Optional: Serve frontend (only if hosting frontend here)
// Commented because you're using Netlify or Vercel
/*
const path = require("path");
app.use(express.static(path.join(__dirname, "../ecocycle-frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../ecocycle-frontend/dist/index.html"));
});
*/

// ✅ Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
