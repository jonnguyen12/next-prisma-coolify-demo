/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all posts
export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			include: {
				author: true,
			},
		});
		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching posts" },
			{ status: 500 },
		);
	}
}

// POST create a new post
export async function POST(request: Request) {
	try {
		const json = await request.json();
		const post = await prisma.post.create({
			data: {
				title: json.title,
				content: json.content,
				authorId: json.authorId,
			},
		});
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: "Error creating post" }, { status: 500 });
	}
}

// PUT update a post
export async function PUT(request: Request) {
	try {
		const json = await request.json();
		const post = await prisma.post.update({
			where: {
				id: json.id,
			},
			data: {
				title: json.title,
				content: json.content,
			},
		});
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: "Error updating post" }, { status: 500 });
	}
}

// DELETE a post
export async function DELETE(request: Request) {
	try {
		const json = await request.json();
		const post = await prisma.post.delete({
			where: {
				id: json.id,
			},
		});
		return NextResponse.json(post);
	} catch (error) {
		return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
	}
}
