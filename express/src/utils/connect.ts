import { connect } from "mongoose";

export default async function connectDB() {
	return connect(String(process.env.MONGODB_URI));
}
