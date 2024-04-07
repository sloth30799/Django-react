import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"
import { Note as NoteType } from "../types"
import "../styles/home.css"

const Home = () => {
	const [notes, setNote] = useState<NoteType[]>([])
	const [content, setContent] = useState("")
	const [title, setTitle] = useState("")

	useEffect(() => {
		getNotes()
	}, [])

	const getNotes = () => {
		api.get("/api/notes/")
			.then((res) => res.data)
			.then((data) => setNote(data))
			.catch((err) => console.error(err))
	}

	const deleteNote = (id: number) => {
		api.delete(`api/notes/delete/${id}`)
			.then((res) => {
				if (res.status === 204) alert("Note Deleted!")
				else alert("Failed to delete note.")
			})
			.catch((err) => console.error(err))
	}

	const createNote = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		api.post("/api/notes/", { content, title })
			.then((res) => {
				if (res.status === 201) alert("Note created!")
				else alert("Failed to make note.")
				getNotes()
			})
			.catch((err) => alert(err))
	}

	return (
		<div>
			<div>
				<h2>Notes</h2>
				{notes.map((note) => (
					<Note note={note} onDelete={deleteNote} key={note.id} />
				))}
			</div>
			<h2>Create a Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor="title">Title:</label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor="content">Content:</label>
				<br />
				<textarea
					id="content"
					name="content"
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></textarea>
				<br />
				<input type="submit" value="Submit"></input>
			</form>
		</div>
	)
}

export default Home
