export const handleResize = (gameState) => {
  // fix caret depending on window
  let caret = document.querySelector(".caret");
  let char = Array.from(document.querySelectorAll(".character"))[
    gameState.currentIndex
  ];

  if (char !== undefined) {
    let charWinPosition = char.getBoundingClientRect();
    caret.style.top = charWinPosition.top.toString() + "px";
    caret.style.left = charWinPosition.left.toString() + "px";
  } else {
    return;
  }
};
