import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { db } from "../appwrite/databases";

const Color = ({ color }) => {
  const { selectedNote, notes, setNotes } = useContext(NoteContext);
  const changeColor = () => {
    try {
      const currentNoteIndex = notes.findIndex(
        (note) => note.$id === selectedNote.$id
      );
      const upatedNode = {
        ...notes[currentNoteIndex],
        colors: JSON.stringify(color),
      };
      const newNotes = [...notes];
      newNotes[currentNoteIndex] = upatedNode;
      setNotes(newNotes);
      db.notes.update(selectedNote.$id, { colors: JSON.stringify(color) });
    } catch {
      alert("You must select a note before changing colors");
    }
  };
  return (
    <div
      className="color"
      style={{ background: color.colorHeader }}
      onClick={changeColor}
    ></div>
  );
};

export default Color;
