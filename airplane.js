let canvas = document.getElementById('avionCanvas');
let ctx = canvas.getContext('2d');
let min = 1500;
let max = 500;
let crashCounter = 0;
let gameOver = false;
let seconds = 0;

// Dimensiunea panzei
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creez avionul
let airplane = {
    x: canvas.width / 2,
    y: canvas.height / 1.3,
    width: 20,
    height: 50,
    color: 'black',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};
airplane.draw()

// Mut avionul
document.addEventListener('keydown', function(event) {
    if (gameOver === false) {
        if (event.key === 'ArrowLeft' && airplane.x > 200) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height);
            airplane.x -= 80;
        } else if (event.key === 'ArrowRight' && airplane.x < 1700) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height);
            airplane.x += 80;
        }
        airplane.draw();
    }
});

setInterval(showObstacles, 2000);

// Creez obstacole si le fac sa se miste
function showObstacles() {
    if (gameOver === false) {
        let obstacle = {
            w: Math.floor(Math.random() * (max - min + 1) + min),
            z: 0,
            width: 100,
            height: 100,
            color: 'white',
            speed: 5,
            draw: function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.w, this.z, this.width, this.height);
            },
            update: function() {
                this.z += this.speed;
            }
        }
    
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(obstacle.w, obstacle.z, obstacle.width, obstacle.height);
            obstacle.update();
            obstacle.draw();
            if (airplane.x < obstacle.w + obstacle.width &&
                airplane.x + airplane.width > obstacle.w &&
                airplane.y < obstacle.z + obstacle.height &&
                airplane.y + airplane.height > obstacle.z) {
                ++crashCounter;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (crashCounter === 1) {
                    gameOver = true;
                    alert('Game OVER! You hit an obstacle! You have ' + seconds + ' points! REFRESH THE PAGE TO START A NEW GAME.');
                }
            }
        }
        animate();
    }
}

function incrementSeconds() {
    seconds += 1;
}
