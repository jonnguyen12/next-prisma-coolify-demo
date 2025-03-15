"use client"

import { useState } from "react"
import prisma from "@/lib/prisma"

export default function DemoPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])

    const createUser = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            })
            if (response.ok) {
                fetchUsers()
                setName("")
                setEmail("")
            }
        } catch (error) {
            console.error("Error creating user:", error)
        }
    }

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            })
            if (response.ok) {
                fetchPosts()
                setTitle("")
                setContent("")
            }
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users")
            const data = await response.json()
            setUsers(data)
        } catch (error) {
            console.error("Error fetching users:", error)
        }
    }

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/posts")
            const data = await response.json()
            setPosts(data)
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Prisma Demo</h1>

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Create User</h2>
                    <form onSubmit={createUser} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Create User
                        </button>
                    </form>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Users</h3>
                        <button
                            type="button"
                            onClick={fetchUsers}
                            className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Refresh Users
                        </button>
                        <div className="space-y-2">
                            {users.map((user: any) => (
                                <div
                                    key={user.id}
                                    className="border p-2 rounded"
                                >
                                    <p>Name: {user.name}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Create Post</h2>
                    <form onSubmit={createPost} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            placeholder="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={4}
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Create Post
                        </button>
                    </form>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Posts</h3>
                        <button
                            type="button"
                            onClick={fetchPosts}
                            className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Refresh Posts
                        </button>
                        <div className="space-y-2">
                            {posts.map((post: any) => (
                                <div
                                    key={post.id}
                                    className="border p-2 rounded"
                                >
                                    <h4 className="font-semibold">
                                        {post.title}
                                    </h4>
                                    <p>{post.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
