import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const body = await req.json();

		// Check if the message field is empty
		if (!body?.message) {
			console.error("Error: Message field is empty");
			return new NextResponse("Message field is empty", {
				status: 400,
			});
		}

		await axios.get(
			`https://api.telegram.org/${process.env.BOT_API_KEY}/sendMessage?chat_id=${process.env.CHAT_ID}&text=${body.message}`
		);

		return new NextResponse("Message Sent", {
			status: 200,
		});
	} catch (error) {
		// Handle errors by logging them to the console
		console.error("Error:", error);
		return new NextResponse("Internal Server Error", {
			status: 500,
		});
	}
}
