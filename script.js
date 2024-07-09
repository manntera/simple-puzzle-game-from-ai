document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    let tiles = [];
    let emptyIndex = 15;

    // タイルを作成し、ゲームボードに追加
    for (let i = 0; i < 15; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        tile.textContent = i + 1;
        tiles.push(tile);
    }

    // 空のタイルを追加
    let emptyTile = document.createElement("div");
    emptyTile.classList.add("tile");
    emptyTile.style.backgroundColor = "transparent";
    tiles.push(emptyTile);

    // ボードを更新する関数
    function updateBoard() {
        gameBoard.innerHTML = "";
        tiles.forEach((tile, index) => {
            tile.removeEventListener("click", tile.clickHandler); // 既存のイベントリスナーを削除
            tile.clickHandler = () => moveTile(index); // 新しいイベントリスナーを追加
            tile.addEventListener("click", tile.clickHandler);
            gameBoard.appendChild(tile);
        });
    }

    // タイルを移動する関数
    function moveTile(index) {
        if (isAdjacent(index, emptyIndex)) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            emptyIndex = index;
            updateBoard();
            checkWin(); // 移動のたびにゲームクリアの判定を行う
        }
    }

    // 隣接しているか確認する関数
    function isAdjacent(index1, index2) {
        const row1 = Math.floor(index1 / 4);
        const col1 = index1 % 4;
        const row2 = Math.floor(index2 / 4);
        const col2 = index2 % 4;

        return (
            (row1 === row2 && Math.abs(col1 - col2) === 1) ||
            (col1 === col2 && Math.abs(row1 - row2) === 1)
        );
    }

    // タイルをシャッフルする関数
    function shuffleTiles() {
        // Fisher-Yates シャッフルアルゴリズムを使用
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        emptyIndex = tiles.indexOf(emptyTile); // 空のタイルの位置を更新
        updateBoard();
    }

    // ゲームクリアの判定を行う関数
    function checkWin() {
        for (let i = 0; i < 15; i++) {
            if (tiles[i].textContent != i + 1) {
                return false; // 1つでも正しくないタイルがあれば終了
            }
        }
        alert("おめでとうございます！パズルが完成しました！");
        return true;
    }

    // 完成状態のパズルにする関数
    function completePuzzle() {
        tiles = [];
        for (let i = 0; i < 15; i++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = i + 1;
            tiles.push(tile);
        }
        let emptyTile = document.createElement("div");
        emptyTile.classList.add("tile");
        emptyTile.style.backgroundColor = "transparent";
        tiles.push(emptyTile);
        emptyIndex = 15; // 空のタイルのインデックスを更新
        updateBoard();
    }

    // キーダウンイベントリスナーを追加
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            completePuzzle();
        }
    });

    // 初期状態のボードを更新
    updateBoard();

    // シャッフル実行
    shuffleTiles();
});
