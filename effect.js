// ==========================================
// 1. ЛЕТАЮЩИЕ ПИКСЕЛЬНЫЕ ЗВЕЗДЫ
// ==========================================
function createParticle() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    const particle = document.createElement('div');
    particle.classList.add('mc-particle');

    // Рандомная позиция по ширине экрана
    const randomLeft = Math.random() * 100;
    particle.style.left = randomLeft + '%';

    // Рандомный размер (масштаб х1 или х2)
    const randomScale = Math.random() > 0.5 ? 1 : 2;
    particle.style.transform = `scale(${randomScale})`;

    // Скорость полета (от 10 до 20 секунд)
    const randomDuration = Math.random() * 10 + 10;
    particle.style.animationDuration = randomDuration + 's';

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, randomDuration * 1000);
}

// Частота появления звезд (каждые 700мс)
setInterval(createParticle, 700);

// Быстрый спавн первых звезд при загрузке
for(let i = 0; i < 15; i++) {
    setTimeout(createParticle, Math.random() * 5000);
}

// ==========================================
// 2. ИНТЕРАКТИВНОЕ ПРИБЛИЖЕНИЕ КАРТЫ СЛЕДОМ ЗА МЫШКОЙ
// ==========================================
const mapWrapper = document.getElementById('mapWrapper');
const worldMap = document.getElementById('worldMap');

if (mapWrapper && worldMap) {
    // Клик по карте включает/выключает зум
    mapWrapper.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        
        // Если зум выключили, возвращаем карту в центр
        if (!this.classList.contains('zoomed')) {
            worldMap.style.transformOrigin = `center center`;
        }
    });

    // Движение мышки двигает область увеличения
    mapWrapper.addEventListener('mousemove', function(e) {
        if (!this.classList.contains('zoomed')) return;

        // Находим координаты мышки внутри рамки с картой
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Переводим координаты в проценты
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Сдвигаем точку фокуса увеличения за курсором
        worldMap.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
}