let canvas = document.getElementById('avionCanvas');
let ctx = canvas.getContext('2d');

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
    if (event.key === 'ArrowLeft' && airplane.x > 200) {
        airplane.x -= 200;
    } else if (event.key === 'ArrowRight' && airplane.x < 1700) {
        airplane.x += 200;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    airplane.draw();
});

setInterval(showObstacles, 2000);
// Creez obstacole si le fac sa se miste
function showObstacles() {
    let obstacle = {
        w: Math.floor(Math.random() * (canvas.width - 1000)),
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
        obstacle.update();
        obstacle.draw();
    }
    
    animate();
}
