import { Hono } from "hono";
import {
	deleteVideo,
	getAllVideos,
	getVideoById,
	saveVideo,
	updateVideo,
} from "../controllers/video.controller";

const videoRouter = new Hono();

videoRouter.get("/:id", getVideoById);
videoRouter.get("/", getAllVideos);
videoRouter.post("/", saveVideo);
videoRouter.put("/:id", updateVideo);
videoRouter.delete("/:id", deleteVideo);

export default videoRouter;
