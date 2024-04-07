import "../styles/note.css"
import { Note as NoteType } from "../types"

type NoteProps = {
	note: NoteType
	onDelete: (id: number) => void
}

function Note({ note, onDelete }: NoteProps) {
	const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

	return (
		<div className="note-container">
			<p className="note-title">{note.title}</p>
			<p className="note-content">{note.content}</p>
			<p className="note-date">{formattedDate}</p>
			<button className="delete-button" onClick={() => onDelete(note.id)}>
				Delete
			</button>
		</div>
	)
}

export default Note
