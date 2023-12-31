import { useState, useEffect } from "react";
import BoardItemBox from "../board-item-box/board-item-box";
import styles from "./game-board.module.scss";
import { checkAndUpdateCross } from "./services/board-data-updater.service";
import { initialBoardState } from "./services/board-initial-state.service";

export default function GameBoard() {
  const [boardData, setBoardData] = useState(initialBoardState);
  const [currPlayer, setcurrPlayer] = useState(1);
  const [isGameFinished, setIsGameFinished] = useState(false);

  function handleClick(position) {
    if (isGameFinished) return;

    const { rowIndex, colIndex } = position;
    const dummyBoard = JSON.parse(JSON.stringify(boardData));
    dummyBoard[rowIndex][colIndex].markedBy = currPlayer;

    let isWin = checkAndUpdateCross(dummyBoard, position);
    setBoardData(dummyBoard);
    if (isWin) return setIsGameFinished(true);

    currPlayer == 1 ? setcurrPlayer(2) : setcurrPlayer(1);
  }

  function renderBoardItemList(params) {
    return boardData.map((item, rowIndex) => {
      return item.map((item2, colIndex) => {
        return (
          <BoardItemBox
            key={rowIndex + colIndex}
            position={{ rowIndex, colIndex }}
            markedBy={boardData[rowIndex][colIndex].markedBy}
            isUsed={boardData[rowIndex][colIndex].isUsed}
            handleClick={handleClick}
          />
        );
      });
    });
  }

  return (
    <div className={styles.game_board_container}>
      <div className={styles.game_board_List}>{renderBoardItemList()}</div>
      {isGameFinished && <h2>Player {currPlayer} Wins the game</h2>}
      {!isGameFinished && <h2>Player {currPlayer} Turn</h2>}
    </div>
  );
}
