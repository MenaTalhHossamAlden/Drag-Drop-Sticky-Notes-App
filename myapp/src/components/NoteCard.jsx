import { useRef, useEffect, React, useState } from "react";
import Trash from "../icons/Trash";
import { setNewPosition, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";

const NoteCard = ({ note }) => {
  // const body = bodyParser(note.body);
  const [position, setPosition] = useState(bodyParser(note.position));
  const [body, setBody] = useState(bodyParser(note.body));
  const colors = bodyParser(note.colors);

  let mouseStartPos = { x: 0, y: 0 };

  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  });

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewPosition(cardRef.current, mouseMoveDir);

    setPosition(newPosition);
  };

  const mouseUp = (e) => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    const newPosition = setNewPosition(cardRef.current, { x: 0, y: 0 });
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        background: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{ background: colors.colorHeader }}
      >
        <Trash />
      </div>
      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
          onFocus={() => {
            setZIndex(cardRef.current);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
