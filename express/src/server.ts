import express, { json } from "express";
import connectDB from "./utils/connect";
import { config } from "dotenv";
import videoRouter from "./routes/video.route";

const app = express();
config();

app.use(json());

connectDB()
  .then(() => {
    app.use("/video", videoRouter);
  })
  .catch((error) => {
    console.error(error.message);
  });

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(error.message);
  }

  console.log(`The app is running on port ${port}`);
});
