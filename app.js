// Function to play winning sound
const playWinSound = () => {
    const winAudio = new Audio("./assets/win-audio.mp3");
    winAudio.play();
}

// Function to play losing sound
const playLossSound = () => {
    const lossAudio = new Audio("./assets/loss-audio.mp3");
    lossAudio.play();
}
const handleGameLogic = (player, choice) => {
    let winnerMessage = "";
    let winnerColor = "";
    const randomNumberBetween0to1 = Math.floor(Math.random() * 2); // Random Result: 0 (Tail) or 1 (Head)
    console.log(randomNumberBetween0to1);

    // play the sound
    choice === randomNumberBetween0to1 ? playWinSound() : playLossSound();

    if (randomNumberBetween0to1 === choice && player === "Player 1") {
        winnerMessage += `Player 1 Wins! ${choice === 0 ? "🐍 (Tail)" : "🧠 (Head)"}`; 
        winnerColor = "#4CAF50"; // green color for winning
    } else if (randomNumberBetween0to1 === choice && player === "Player 2") {
        winnerMessage += `Player 2 Wins! ${choice === 0 ? "🐍 (Tail)" : "🧠 (Head)"}`;
        winnerColor = "#4CAF50"; // green color
    } else {
        winnerMessage += `${player === "Player 1" ? "Player 2" : "Player 1"} ${choice === 0 ? "🧠 (Head)" : "🐍 (Tail)"}`;
        winnerColor = "#f44336"; // red color for losing
    }

    // Display the result with SweetAlert
    Swal.fire({
        title: winnerMessage,
        html: `<p style="color:#dadada; font-size: 1rem; ">you choose <b>${choice === 0 ? "Tail" : "Head"}</b></p>`,
        background: winnerColor,
        iconColor: "#fff",
        icon: "success",
        customClass: {
            confirmButton: "swal-confirm-btn"
        },
        showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
        }


    });
}
const player1 = () => {
    sweetInput("Player 1");
}
const player2 = () => {
    sweetInput("Player 2");
}

// SweetAlert Input Handler
const sweetInput = (player) => {
    Swal.fire({
        title: `<strong>${player}'s Turn</strong>`,
        html: `
            <p style="font-size: 1.1rem; margin-bottom: 15px;">
                What would you like to choose?
            </p>
            <ul style="list-style-type: none; padding: 0;">
                <li style="font-size: 1rem; margin-bottom: 5px;">🔵 <strong>Head:</strong> Enter <code>1</code></li>
                <li style="font-size: 1rem;">🔴 <strong>Tail:</strong> Enter <code>0</code></li>
            </ul>
        `,
        input: "number",
        showCancelButton: true,
        inputPlaceholder: "Enter 0 for Tail or 1 for Head",
        confirmButtonText: "Submit",
        confirmButtonColor: "#4a90e2",
        showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
        }, hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
        },
        inputValidator: (value) => {
            if (value === "" || value === null) {
                return "⚠️ Please enter a value!"
            }
            if (value != 0 && value != 1) {
                return "⚠️ Input must be 0 or 1!";
            }
        }
    }).then(res => {
        if (res.isConfirmed) {
            const choice = Number(res.value);
            handleGameLogic(player, choice);
        } else {
            console.log("canceled by " + player);
        }

    });
}