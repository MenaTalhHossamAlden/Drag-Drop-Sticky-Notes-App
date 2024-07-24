import { React, useContext } from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";

const DeleteButton = ({ id }) => {
  const { setNotes } = useContext(NoteContext);

  const handleDelete = async () => {
    db.notes.delete(id);
    setNotes((prevState) => prevState.filter((note) => note.$id !== id));
  };

  return (
    <div onClick={handleDelete}>
      <Trash />
    </div>
  );
};

export default DeleteButton;
