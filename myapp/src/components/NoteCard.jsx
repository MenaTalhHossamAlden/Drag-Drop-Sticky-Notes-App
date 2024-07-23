import { useRef, useEffect, React, useState } from "react";
import Trash from "../icons/Trash";

const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  //   const position = JSON.parse(note.position);
  const [position, setPosition] = useState(JSON.parse(note.position));
  const colors = JSON.parse(note.colors);

  let mouseStartPos = { x: 0, y: 0 };

  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    autoGrow(textAreaRef);
  });

  const autoGrow = (textarea) => {
    // Destructuring to get the current property of the ref object
    const { current } = textarea;
    current.style.height = current.scrollHeight + "px";
  };

  const mouseDown = (e) => {
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    console.log(mouseMoveDir.x, mouseMoveDir.y);

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const { current } = cardRef;
    current.style.left += mouseMoveDir.x;
    current.style.top += mouseMoveDir.y;
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
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
