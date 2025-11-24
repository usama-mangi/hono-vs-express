import { Handler } from "hono";
import VideoModel from "../models/video.model";

export const getVideoById: Handler = async (c) => {
	const id = c.req.param("id");

	try {
		const video = await VideoModel.findById(id);

		if (!video) return c.json({ message: "Video not found!" }, 404);

		return c.json(video.toObject());
	} catch (error: any) {
		console.error(error.message);
		return c.json({ message: "There was a server error!" }, 500);
	}
};

export const getAllVideos: Handler = async (c) => {
	try {
		const videos = await VideoModel.find();

		return c.json(videos);
	} catch (error: any) {
		console.error(error.message);
		return c.json({ message: "There was a server error!" }, 500);
	}
};

export const saveVideo: Handler = async (c) => {
	const { title, description, thumbnailUrl, watched } = await c.req.json();

	const newVideo = await VideoModel.create({
		title,
		description,
		thumbnailUrl,
		watched,
	});
	try {
		const document = await newVideo.save();

		return c.json(document.toObject(), 201);
	} catch (error: any) {
		console.error(error.message);
		return c.json({ message: "There was a server error!" }, 500);
	}
};

export const updateVideo: Handler = async (c) => {
	const id = c.req.param("id");
	const { title, description, thumbnailUrl, watched } = await c.req.json();

	try {
		const updatedVideo = await VideoModel.findByIdAndUpdate(
			id,
			{
				title,
				description,
				thumbnailUrl,
				watched,
			},
			{
				new: true,
			},
		);

		return c.json(updatedVideo?.toObject());
	} catch (error: any) {
		console.error(error.message);
		return c.json({ message: "There was a server error!" }, 500);
	}
};

export const deleteVideo: Handler = async (c) => {
	const id = c.req.param("id");

	try {
		const deletedVideo = await VideoModel.findByIdAndDelete(id);

		return c.json(deletedVideo?.toObject());
	} catch (error: any) {
		console.error(error.message);
		return c.json({ message: "There was a server error!" }, 500);
	}
};
