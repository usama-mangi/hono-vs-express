import { Hono } from "hono";
import connectDB from "./utils/connect";
import videoRouter from "./routes/video.route";

const app = new Hono();

connectDB()
  .then(() => {
    app.route("/video", videoRouter);
  })
  .catch((error) => {
    console.error(error.message);
  });

const port = process.env.PORT || 3000;
export default {
  fetch: app.fetch,
  port: port,
};
