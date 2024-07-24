export const setNewPosition = (card, mouseMoveDir) => {
  const leftOffset = card.offsetLeft - mouseMoveDir.x;
  const topOffset = card.offsetTop - mouseMoveDir.y;

  return {
    x: leftOffset < 0 ? 0 : leftOffset,
    y: topOffset < 0 ? 0 : topOffset,
  };
};

export const autoGrow = (textarea) => {
  // Destructuring to get the current property of the ref object
  const { current } = textarea;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
};

export const setZIndex = (selectedCard) => {
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    card.style.zIndex = 1;
  });
  selectedCard.style.zIndex = 999;
};

export const bodyParser = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
