document.addEventListener('DOMContentLoaded', () => {
    // 1. Petal Animation System
    const petalContainer = document.getElementById('particles-js');
    if (petalContainer) {
        const petalCount = 35;
        function createPetal() {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            const size = Math.random() * 15 + 10;
            petal.style.width = `${size}px`;
            petal.style.height = `${size * 0.8}px`;
            petal.style.left = `${Math.random() * 100}vw`;
            petal.style.top = `-20px`;
            const duration = Math.random() * 5 + 5;
            const delay = Math.random() * 5;
            const rotation = Math.random() * 360;
            const horizontalMove = (Math.random() - 0.5) * 200;

            petal.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.6 },
                { transform: `translate(${horizontalMove}px, 100vh) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                easing: 'linear'
            });
            petalContainer.appendChild(petal);
        }
        for (let i = 0; i < petalCount; i++) { createPetal(); }
    }

    // 2. Envelope & Multi-Page Card Logic
    const envelope = document.getElementById('envelope');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pages = document.querySelectorAll('.card-page');
    const dots = document.querySelectorAll('.dot');
    const cardContent = document.getElementById('cardContent');

    let currentPage = 0;

    function updatePage() {
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === currentPage);
        });
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });

        prevBtn.disabled = currentPage === 0;
        nextBtn.textContent = currentPage === pages.length - 1 ? 'Selesai' : 'Berikutnya';

        // Scroll back to top of card when changing page
        cardContent.scrollTop = 0;
    }

    function createHeartBurst() {
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart-burst');
            heart.innerHTML = '❤';
            const tx = (Math.random() - 0.5) * 300;
            const ty = (Math.random() - 0.5) * 400 - 200;
            heart.style.setProperty('--tx', `${tx}px`);
            heart.style.setProperty('--ty', `${ty}px`);
            heart.style.color = i % 2 === 0 ? '#ff4081' : '#f06292';
            heart.style.left = '50%';
            heart.style.top = '50%';
            envelope.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }
    }

    if (envelope) {
        envelope.addEventListener('click', (e) => {
            if (e.target.closest('.card-navigation') || e.target.classList.contains('close-btn')) return;
            if (!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                createHeartBurst();
                document.body.style.overflow = 'hidden';
                currentPage = 0;
                updatePage();
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            envelope.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentPage > 0) {
                currentPage--;
                updatePage();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentPage < pages.length - 1) {
                currentPage++;
                updatePage();
            } else {
                envelope.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
});
