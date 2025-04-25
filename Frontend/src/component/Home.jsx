import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/notes/get_user_notes", {
        withCredentials: true,
      });
      
      const temp=Array.from(res.data.data);
  
      
      
    setNotes(temp);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const handleAddNote = async () => {
    const newNote = { title, content, pinned };
    try {
      await axios.post("http://localhost:5000/api/user/notes/create_note", newNote, {
        withCredentials: true,
      });
      setTitle("");
      setContent("");
      setPinned(false);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const logout = () => {
    const userlogoutresponce=axios.post("http://localhost:5000/api/user/logout", {}, { withCredentials: true });
  console.log("logout",userlogoutresponce);
    if(!userlogoutresponce)
    {
      console.error("Error logging out:", userlogoutresponce);
    }
    else{
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-purple-900 text-white px-4 py-6 font-mono">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold tracking-wide text-fuchsia-400">CyberNotes</h1>
        <button
          onClick={logout}
          className="bg-pink-600 px-4 py-2 rounded-xl hover:bg-pink-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-purple-950 border border-fuchsia-500 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add a New Note</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-2 bg-black border border-fuchsia-600 rounded text-white"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full p-2 mb-2 bg-black border border-fuchsia-600 rounded text-white"
        ></textarea>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={pinned}
            onChange={() => setPinned(!pinned)}
            className="mr-2"
          />
          <label className="text-fuchsia-300">Pin this note</label>
        </div>
        <button
          onClick={handleAddNote}
          className="bg-fuchsia-600 px-4 py-2 rounded-xl hover:bg-fuchsia-700 transition w-full"
        >
          Add Note
        </button>
      </div>

      <div>
        <h2 className="text-xl mb-2 text-fuchsia-300">📝 All Notes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {notes?.map((note) => (
            <div
              key={note._id}
              className="bg-black border border-fuchsia-500 p-4 rounded-xl shadow-md hover:shadow-fuchsia-500/30"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-fuchsia-400">{note.title}</h3>
              </div>
              <p className="mb-2 text-gray-300 break-words max-h-40 overflow-y-auto">{note.content}</p>
              <p className="text-sm text-fuchsia-300">Pinned: {note.pinned ? "Yes" : "No"}</p>
              {note.createdAt && (
                <p className="text-sm text-gray-400 mt-1">
                  Created: {new Date(note.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
