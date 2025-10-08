import { useState } from "react";
import {
  NotesList,
  NoteCard,
  NoteEditor,
} from "@s2m-pac/ui";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const mockNotes: Note[] = [
  {
    id: "1",
    title: "Authentication Strategy",
    content: `<h3>Decision</h3>
<p>We decided to use JWT tokens for authentication instead of traditional session-based auth.</p>

<h3>Options Considered</h3>
<ul>
  <li>Sessions with Redis</li>
  <li>JWT tokens</li>
  <li>OAuth only</li>
</ul>

<h3>Rationale</h3>
<p>JWT provides stateless authentication which is better for scaling horizontally. We can also use it for microservices communication.</p>`,
    createdAt: "2 days ago",
    modifiedAt: "5m ago",
  },
  {
    id: "2",
    title: "API Design",
    content: `<h3>REST vs GraphQL</h3>
<p>We chose REST for simplicity and better tooling support.</p>`,
    createdAt: "3 days ago",
    modifiedAt: "1 day ago",
  },
  {
    id: "3",
    title: "Database Schema",
    content: `<h3>Schema Design</h3>
<p>Using Prisma with PostgreSQL for type safety and migrations.</p>`,
    createdAt: "5 days ago",
    modifiedAt: "2 days ago",
  },
  {
    id: "4",
    title: "Architecture Decisions",
    content: `<h3>Monorepo Structure</h3>
<p>We went with Bun workspaces for better code sharing.</p>`,
    createdAt: "1 week ago",
    modifiedAt: "3 days ago",
  },
];

export function Notes() {
  const [activeNoteId, setActiveNoteId] = useState<string>(mockNotes[0].id);
  const [notes] = useState<Note[]>(mockNotes);
  const [isEditing, setIsEditing] = useState(false);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  const handleNewNote = () => {
    console.log("Create new note");
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    console.log("Delete note");
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Notes</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-200px)]">
        {/* Notes List Sidebar */}
        <div className="overflow-y-auto">
          <NotesList onNew={handleNewNote}>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                isActive={note.id === activeNoteId}
                onClick={() => setActiveNoteId(note.id)}
              />
            ))}
          </NotesList>
        </div>

        {/* Note Editor */}
        <div className="overflow-y-auto">
          {activeNote && (
            <NoteEditor
              title={activeNote.title}
              content={activeNote.content}
              createdAt={activeNote.createdAt}
              modifiedAt={activeNote.modifiedAt}
              onEdit={handleEdit}
              onDelete={handleDelete}
              readOnly={!isEditing}
            />
          )}
        </div>
      </div>
    </div>
  );
}
