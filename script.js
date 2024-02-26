document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset-btn");
    const newBtn = document.querySelector("#new-btn");
    const msgbox = document.querySelector(".msgbox");
    const winmsg = document.querySelector(".winmsg");

    let turnO = true;
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to handle a box click
    const handleBoxClick = (event) => {
        const box = event.target;
        if (!box.innerText.trim()) {
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            box.disabled = true;
            checkWinner();
        }
    };

    // Add click event listener to each box
    boxes.forEach(box => {
        box.addEventListener("click", handleBoxClick);
    });

    // Reset button click event
    resetBtn.addEventListener("click", () => {
        resetGame();
    });

    // New game button click event
    newBtn.addEventListener("click", () => {
        newGame();
    });

    // Function to check for a winner
    const checkWinner = () => {
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                boxes[a].innerText &&
                boxes[a].innerText === boxes[b].innerText &&
                boxes[a].innerText === boxes[c].innerText
            ) {
                showWinner(boxes[a].innerText); // Passing the winning symbol to showWinner
                disableBoxes();
                return;
            }
        }
        // Check for draw
        if ([...boxes].every(box => box.innerText.trim())) {
            winmsg.innerText = "It's a draw!";
            msgbox.classList.remove("hide");
            return;
        }
    };
    

    // Function to display the winner message
    const showWinner = (winner) => {
        winmsg.innerText = `Winner is ${winner}`;
        msgbox.classList.remove("hide");
    };

    // Function to reset the game
    const resetGame = () => {
        enableBoxes();
        winmsg.innerText = ""; // Clear the win message
        msgbox.classList.add("hide"); // Hide the message box
        turnO = true;
    };
    

    // Function to start a new game
    const newGame = () => {
        resetGame();
    };

    // Function to enable all boxes
    const enableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = false;
            box.innerText = "";
        });
    };

    // Function to disable all boxes
    const disableBoxes = () => {
        boxes.forEach(box => {
            box.disabled = true;
        });
    };
});
