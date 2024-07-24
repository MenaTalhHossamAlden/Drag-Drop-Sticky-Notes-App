import { useRef, useEffect, React, useState, useContext } from "react";
import Trash from "../icons/Trash";
import Spinner from "../icons/Spinner";
import { setNewPosition, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import DeleteButton from "./DeleteButton";
import { NoteContext } from "../context/NoteContext";

const NoteCard = ({ note }) => {
  const [position, setPosition] = useState(bodyParser(note.position));
  const [body, setBody] = useState(bodyParser(note.body));
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);
  const colors = bodyParser(note.colors);
  const { setSelectedNote } = useContext(NoteContext);

  let mouseStartPos = { x: 0, y: 0 };

  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  });

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);

      setZIndex(cardRef.current);
      setSelectedNote(note);
    }
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
    setSaving(false);
  };

  const keyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }
    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
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
        <DeleteButton id={note.$id} />
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} className="spinner" />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
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
            setSelectedNote(note);
          }}
          onKeyUp={keyUp}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
