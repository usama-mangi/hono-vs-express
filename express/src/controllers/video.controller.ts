import { Handler } from "express";
import VideoModel from "../models/video.model";

export const getVideoById: Handler = async (req, res) => {
	const id = req.params.id;

	try {
		const video = await VideoModel.findById(id);

		if (!video) return res.status(404).json({ message: "Video not found!" });

		return res.json(video.toObject());
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ message: "There was a server error!" });
	}
};

export const getAllVideos: Handler = async (_, res) => {
	try {
		const videos = await VideoModel.find();

		return res.json(videos);
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ message: "There was a server error!" });
	}
};

export const saveVideo: Handler = async (req, res) => {
	const { title, description, thumbnailUrl, watched } = req.body;

	const newVideo = await VideoModel.create({
		title,
		description,
		thumbnailUrl,
		watched,
	});
	try {
		const document = await newVideo.save();

		return res.status(201).json(document.toObject());
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ message: "There was a server error!" });
	}
};

export const updateVideo: Handler = async (req, res) => {
	const id = req.params.id;
	const { title, description, thumbnailUrl, watched } = req.body;

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

		return res.json(updatedVideo?.toObject());
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ message: "There was a server error!" });
	}
};

export const deleteVideo: Handler = async (req, res) => {
	const id = req.params.id;

	try {
		const deletedVideo = await VideoModel.findByIdAndDelete(id);

		return res.json(deletedVideo?.toObject());
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ message: "There was a server error!" });
	}
};
