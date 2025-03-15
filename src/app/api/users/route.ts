/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/users - Get all users
export async function GET() {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 },
		);
	}
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
			},
		});
		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create user" },
			{ status: 500 },
		);
	}
}

// PUT /api/users - Update a user
export async function PUT(request: Request) {
	try {
		const body = await request.json();
		const user = await prisma.user.update({
			where: {
				id: body.id,
			},
			data: {
				name: body.name,
				email: body.email,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update user" },
			{ status: 500 },
		);
	}
}

// DELETE /api/users - Delete a user
export async function DELETE(request: Request) {
	try {
		const body = await request.json();
		const user = await prisma.user.delete({
			where: {
				id: body.id,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to delete user" },
			{ status: 500 },
		);
	}
}
