// ==========================================
// 1. ЛЕТАЮЩИЕ ПИКСЕЛЬНЫЕ ЗВЕЗДЫ НА ФОНЕ
// ==========================================
function createParticle() {
    const container = document.getElementById('particle-container');
    if (!container) return; // Если контейнера нет, ничего не делаем

    const particle = document.createElement('div');
    particle.classList.add('mc-particle');

    const randomLeft = Math.random() * 100;
    particle.style.left = randomLeft + '%';

    const randomScale = Math.random() > 0.5 ? 1 : 2;
    particle.style.transform = `scale(${randomScale})`;

    const randomDuration = Math.random() * 10 + 10;
    particle.style.animationDuration = randomDuration + 's';

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, randomDuration * 1000);
}

// Запуск генерации звезд (проверяем, есть ли контейнер на текущей странице)
if (document.getElementById('particle-container')) {
    setInterval(createParticle, 700);
    for(let i = 0; i < 15; i++) {
        setTimeout(createParticle, Math.random() * 5000);
    }
}


// ==========================================
// 2. ИНТЕРАКТИВНОЕ ПРИБЛИЖЕНИЕ КАРТЫ (ТОЛЬКО НА ГЛАВНОЙ)
// ==========================================
const mapWrapper = document.getElementById('mapWrapper');
const worldMap = document.getElementById('worldMap');

// Этот код сработает ТОЛЬКО если элементы карты нашлись на странице
if (mapWrapper && worldMap) {
    mapWrapper.addEventListener('click', function() {
        this.classList.toggle('zoomed');
        if (!this.classList.contains('zoomed')) {
            worldMap.style.transformOrigin = `center center`;
        }
    });

    mapWrapper.addEventListener('mousemove', function(e) {
        if (!this.classList.contains('zoomed')) return;
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        worldMap.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });
}




