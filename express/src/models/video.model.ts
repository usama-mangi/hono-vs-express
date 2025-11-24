import { Schema, model } from "mongoose";

export interface IVideo {
	title: string;
	description: string;
	thumbnailUrl?: string;
	watched?: boolean;
}

const VideoSchema = new Schema<IVideo>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	thumbnailUrl: {
		type: String,
		required: false,
	},
	watched: {
		type: Boolean,
		default: false,
	},
});

const VideoModel = model("video", VideoSchema);

export default VideoModel;
