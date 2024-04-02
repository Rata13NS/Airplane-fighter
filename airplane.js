let canvas = document.getElementById('airplaneCanvas');
let ctx = canvas.getContext('2d');
let min = 700;
let max = 1300;
let crashCounter = 0;
let gameOver = false;
let destroyedObstacle = false;
let seconds = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let obstacles = [];
let ammunitions = [];
let destroyedObstacles = 0;

// Create the airplane
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

// Move the airplane
document.addEventListener('keydown', function(event) {
    if (gameOver === false) {
        if (event.key === 'ArrowLeft' && airplane.x > 200) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height + 1);
            airplane.x -= 80;
        } else if (event.key === 'ArrowRight' && airplane.x < 1700) {
            ctx.clearRect(airplane.x, airplane.y, airplane.width, airplane.height + 1);
            airplane.x += 80;
        }
        airplane.draw();
    }
});

// Create the obstacles, make them move and display the points
function showObstacles() {
    if (gameOver === false) {
        destroyedObstacle = false;
        let obstacle = {
            w: Math.floor(Math.random() * (max - min + 1) + min),
            z: 0,
            width: 100,
            height: 100,
            color: 'white',
            speed: 4,
            draw: function() {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.w, this.z, this.width, this.height);
            },
            update: function() {
                this.z += this.speed;
            }
        }
        obstacles.push(obstacle); 
    
        function animateObstacles() {
            collisionWithAmmunitions();
            if (destroyedObstacle === false) {
                requestAnimationFrame(animateObstacles);
                ctx.clearRect(obstacle.w, obstacle.z, obstacle.width, obstacle.height);
                obstacle.update();
                obstacle.draw();
            }
            collisionWithAirplane(obstacle);
        }
        animateObstacles();
    }
}

function collisionWithAmmunitions() {
    for (let i = 0; i < ammunitions.length; ++i) {
        for (let j = 0; j < obstacles.length; ++j) {
            if (ammunitions[i].m < obstacles[j].w + obstacles[j].width &&
                ammunitions[i].m + ammunitions[i].width > obstacles[j].w &&
                ammunitions[i].n < obstacles[j].z + obstacles[j].height &&
                ammunitions[i].n + ammunitions[i].height > obstacles[j].z) {
                    ctx.clearRect(ammunitions[i].m, ammunitions[i].n, ammunitions[i].width, ammunitions[i].height + 2);
                    ctx.clearRect(obstacles[j].w, obstacles[j].z, obstacles[j].width, obstacles[j].height);
                    ++destroyedObstacles;
                    destroyedObstacle = true;
                    ammunitions.splice(i, 1);
                    obstacles.splice(j, 1);
            }  
        }
    }
}

function collisionWithAirplane(obstacle) {
    if (airplane.x < obstacle.w + obstacle.width &&
        airplane.x + airplane.width > obstacle.w &&
        airplane.y < obstacle.z + obstacle.height &&
        airplane.y + airplane.height > obstacle.z) {
        ++crashCounter;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (crashCounter === 1) {
            gameOver = true;
            alert('Game OVER! You hit an obstacle! You have ' + destroyedObstacles + ' points! REFRESH THE PAGE TO START A NEW GAME.');
        } 
    }
}

document.addEventListener('keydown', function(event) {
    if (gameOver === false) {
        if (event.code === 'Space') {
            let ammunition = {
                m: airplane.x + 5,
                n: airplane.y - 10,
                width: 8,
                height: 8,
                color: 'red',
                speed: 8,
                draw: function() {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(this.m, this.n, this.width, this.height);
                },
                update: function() {
                    this.n -= this.speed;
                }
            }
            ammunitions.push(ammunition);
        }
    }
});

function animateAmmunition() {
    requestAnimationFrame(animateAmmunition);
    for (let i = 0; i < ammunitions.length; i++) {
        ctx.clearRect(ammunitions[i].m, ammunitions[i].n, ammunitions[i].width, ammunitions[i].height + 2);
        ammunitions[i].update();
        ammunitions[i].draw();
    }
}
animateAmmunition();
