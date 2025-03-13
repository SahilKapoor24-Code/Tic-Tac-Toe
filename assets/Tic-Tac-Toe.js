let box = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".reset");
let msg = document.querySelector("#msg");

let turnO = true;
let gameActive = true; 
let count = 0;

let winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    gameActive = true; 
    enablebtns();
    msg.classList.add("hide");
    resetbtn.classList.add("hidebtn");
};

box.forEach((boxs) => {
    boxs.addEventListener("click", () => {
        console.log(count);
        if(gameActive && boxs.innerText === "") {
            if(turnO) {
                boxs.innerText = "O";
                boxs.style.color = "Green";
                turnO = false;
            } else {
                boxs.innerText = "X";
                boxs.style.color = "Red";
                turnO = true;
            }
            count++;
            checkwinner();
        }
    });
});

function checkwinner() {
    for (let patterns of winpatterns) {
        let posval1 = box[patterns[0]].innerText;
        let posval2 = box[patterns[1]].innerText;
        let posval3 = box[patterns[2]].innerText;

        if (posval1 !== "" && posval2 !== "" && posval3 !== "") {
            if (posval1 === posval2 && posval2 === posval3) {
                console.log("Winner!!!");
                showwinner(posval1);
                gameActive = false;
                return; 
            }
        }
    }

    // Check for a draw after verifying all win patterns
    if (count === 9 && gameActive) {
        draw();
        count = 0;
    }
}


function disablebtns() {
    for(let boxs of box) {
        boxs.disabled = true;
    }
}

function enablebtns() {
    for(let boxs of box) {
        boxs.disabled = false;
        boxs.innerText = "";
    }
}

function showwinner(winner) {
    msg.innerText = `Congratulations Winner is ${winner} !`;
    msg.classList.remove("hide");
    resetbtn.classList.remove("hidebtn");
    disablebtns();
}


function draw(){
    msg.innerText = "Game is a Draw! 🤝";
    msg.classList.remove("hide");
    resetbtn.classList.remove("hidebtn");
    disablebtns();
}
resetbtn.addEventListener("click", resetGame);
