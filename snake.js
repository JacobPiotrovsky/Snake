const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

let snake = [{ x: 200, y: 200 }];
let direction = { x: 10, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function createFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rysowanie jedzenia
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Rysowanie węża
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    }

    // Ruch węża
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Sprawdzanie kolizji z jedzeniem
    if (head.x === food.x && head.y === food.y) {
        score++;
        createFood();
    } else {
        snake.pop(); // Usunięcie ostatniego segmentu
    }

    // Sprawdzanie kolizji ze sobą i ścianami
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(seg => seg.x === head.x && seg.y === head.y)) {
        alert('Koniec gry! Twój wynik: ' + score);
        document.location.reload();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -10 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 10 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -10, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 10, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);
createFood();
setInterval(draw, 100);
