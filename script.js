function loadNewPage () { 
        window.location.href = "6klasse.html"     
}

function loadOldPage () {
    window.location.href = "index.html"
}

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

let particlesArray = [];

function handleParticels() {
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0.3) {
            particlesArray.splice(index, 1);
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticels();
    requestAnimationFrame(animate);
}

function init() {
    let mouse = {
        x: null,
        y: null
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;

        for (let i = 0; i < 5; i++) {
            particlesArray.push(new Particle(mouse.x, mouse.y));
        }     
    });

    animate();
}

init();