let score = 0;
let cross = true;

document.onkeydown = function(e){
    console.log("Key code is: ", e.keyCode);
    let dino = document.querySelector(".dino");

    if (e.keyCode === 38) { // Up Arrow Key
        if (!dino.classList.contains('animateDino')) { // Prevent double jumps
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove("animateDino");
            }, 1000);
        }
    }

    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    if (e.keyCode === 39) { // Right Arrow Key
        dino.style.left = dinoX + 110 + 'px';
    }

    if (e.keyCode === 37) { // Left Arrow Key
        if (dinoX > 0) { // Prevent moving beyond left boundary
            dino.style.left = (dinoX - 110) + 'px';
        }
    }
}

let gameInterval = setInterval(() => {
    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');
    
    // Get positions and sizes
    let dinoRect = dino.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();
    
    // Check for collision
    let isCollision = !(dinoRect.right < obstacleRect.left || 
                        dinoRect.left > obstacleRect.right || 
                        dinoRect.bottom < obstacleRect.top || 
                        dinoRect.top > obstacleRect.bottom);
    
    if (isCollision) {
        gameOver.style.visibility = "visible";
        obstacle.classList.remove("obstacleAni");
        clearInterval(gameInterval); // Stop the game loop
    } else if (cross && dinoRect.right < obstacleRect.left) {
        score++;
        cross = false;
        updateScore(score);
        setTimeout(() => { cross = true; }, 1000); // Reset cross after 1 second
    }
}, 150);

function updateScore(score) {
    let scoreContainer = document.querySelector('.score');
    scoreContainer.innerHTML = "Your Score: " + score;
}
