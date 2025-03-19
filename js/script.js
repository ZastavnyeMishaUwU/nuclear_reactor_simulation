console.log("помагав робити Заставний Михайло")
console.log("варіант №4, дубель №15")
const canvas = document.getElementById('explosionCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let stage = 0;
let time = 0;
const centerX = canvas.width / 2;
const groundY = canvas.height - 100;
const maxTime = 10 * 60;
const damageDisplay = document.getElementById('damageDisplay');


class Particle {
    constructor(x, y, size, color, speedX, speedY, fade) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.fade = fade;
    }

    update() {
        this.x += this.speedX;
        this.y -= this.speedY;
        this.size *= this.fade;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}


function updateDamage(yieldKt) {
    const radius = Math.sqrt(yieldKt) * 0.1;
    damageDisplay.textContent = `Радіус ураження: ${radius.toFixed(2)} км`;
    damageDisplay.classList.remove('hidden');
    setTimeout(() => {
        damageDisplay.classList.add('hidden');
    }, 5000);
}


function createExplosion(yieldKt) {
    for (let i = 0; i < 50 * yieldKt / 10; i++) {
        let size = Math.random() * 40 + 20;
        let x = centerX + (Math.random() - 0.5) * 200;
        let y = groundY;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = Math.random() * 3 + 2;
        let color = `rgba(255, ${Math.random() * 150}, 0, 1)`;
        particles.push(new Particle(x, y, size, color, speedX, speedY, 0.98));
    }
}


function createMushroomCloud(yieldKt) {
    for (let i = 0; i < 80 * yieldKt / 10; i++) {
        let size = Math.random() * 50 + 30;
        let x = centerX + (Math.random() - 0.5) * 250;
        let y = groundY - 250 + (Math.random() - 0.5) * 100;
        let speedX = (Math.random() - 0.5) * 1;
        let speedY = Math.random() * 1;
        let color = `rgba(150, 100, 50, 0.9)`;
        particles.push(new Particle(x, y, size, color, speedX, speedY, 0.99));
    }
}


function createStem(yieldKt) {
    for (let i = 0; i < 50 * yieldKt / 10; i++) {
        let size = Math.random() * 30 + 10;
        let x = centerX + (Math.random() - 0.5) * 80;
        let y = groundY - (Math.random() * 200);
        let speedY = Math.random() * 1.5;
        let color = `rgba(100, 100, 100, 0.7)`;
        particles.push(new Particle(x, y, size, color, 0, speedY, 0.98));
    }
}


function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.size < 1) {
            particles.splice(index, 1);
        }
    });

    time++;
    if (time > maxTime) {
        return;
    }


    if (time % 40 === 0) {
        if (stage === 0) {
            createExplosion(10);
            stage++;
        } else if (stage === 1) {
            createStem(10);
            stage++;
        } else if (stage === 2) {
            createMushroomCloud(10);
            stage++;
        }
    }


    requestAnimationFrame(animate);
}


function startSimulation() {
    particles = [];
    stage = 0;
    time = 0;
    let yieldKt = parseFloat(document.getElementById('yield').value);
    createExplosion(yieldKt);
    updateDamage(yieldKt);
    animate();
}