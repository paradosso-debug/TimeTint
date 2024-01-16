// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import reviewsRouter from "./routes/reviews.js";
import productRouter from "./routes/product.js";
import paymentRouter from "./routes/paymentRoutes.js";
import userRouter from "./routes/userRoutes.js";
import loginRouter from "./routes/loginRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URL;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB: ${mongoURI}`);
});

mongoose.connection.on("error", (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

// Mount your routes
app.use("/api/reviews", reviewsRouter);
app.use("/api/products", productRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/register", userRouter);
app.use("/api", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
