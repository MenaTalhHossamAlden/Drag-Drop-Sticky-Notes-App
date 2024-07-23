import React from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const position = JSON.parse(note.position);
  const colors = JSON.parse(note.colors);

  return (
    <div className="card" style={{ background: colors.colorBody }}>
      <div className="card-header" style={{ background: colors.colorHeader }}>
        <div>
          <Trash />
        </div>
      </div>
      <div className="card-body">
        <textarea style={{ color: colors.colorText }} value={body}></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
