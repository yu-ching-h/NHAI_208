// Main JavaScript for Code with Heart Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    handleLoading();
    initThemeToggle();
    initCountdownTimer();
    initSmoothScrolling();
    // 暫時移除動畫初始化
    // initAnimations();
    //initProjectFilters();
    // initRegistrationForm(); // 已移除，避免與新的表單處理衝突
    initSkillRadars();
    initScrollAnimations();
    initPageTransitions();
}

// Loading Screen Handler
function handleLoading() {
    const loadingScreen = document.getElementById('loading');

    if (!loadingScreen) return; // 如果沒有 loading screen 就跳過

    // Simulate loading time - 縮短載入時間
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        // Remove from DOM after transition
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }, 800); // 從 2000ms 改為 800ms
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply the theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    } else {
        body.setAttribute('data-theme', 'light');
        themeSwitch.checked = false;
    }

    // Theme switch event listener
    themeSwitch.addEventListener('change', function () {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }

        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

// Countdown Timer
function initCountdownTimer() {
    // Set target date: 2026.04.22 13:00
    const targetDate = new Date('2026-04-22T13:00:00');

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            // Event has started
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add animation when numbers change
        updateNumberWithAnimation(daysElement, days.toString().padStart(2, '0'));
        updateNumberWithAnimation(hoursElement, hours.toString().padStart(2, '0'));
        updateNumberWithAnimation(minutesElement, minutes.toString().padStart(2, '0'));
        updateNumberWithAnimation(secondsElement, seconds.toString().padStart(2, '0'));
    }

    function updateNumberWithAnimation(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.color = 'var(--accent-color)';

            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
                element.style.color = 'var(--accent-color)';
            }, 150);
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // 增加 offset 避免被導航欄遮住

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// GSAP Animations
function initAnimations() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded, using fallback animations');
        return;
    }

    // 導航欄滾動效果 - 固定在頂部，滾動時降低透明度
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // 滾動超過 50px 時添加 scrolled 類別
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Utility Functions
// Sparkle effect disabled - 已停用閃爍效果
/*
function addSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '1.5rem';
    sparkle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    // Animate sparkle
    if (typeof gsap !== 'undefined') {
        gsap.timeline()
            .to(sparkle, { 
                duration: 0.6, 
                y: -50, 
                opacity: 0, 
                scale: 0, 
                ease: 'power2.out' 
            })
            .call(() => sparkle.remove());
    } else {
        setTimeout(() => sparkle.remove(), 600);
    }
}

// Add sparkle effect to buttons on hover
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            addSparkleEffect(this);
        });
    });
});
*/

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function (e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // Create multiple flying birds
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFlyingBird();
        }, i * 200);
    }

    // Show special message
    const message = document.createElement('div');
    message.innerHTML = '🎉 小肥啾大軍來襲！你發現了隱藏彩蛋！ 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--accent-color);
        color: var(--primary-dark);
        padding: 2rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

function createFlyingBird() {
    const bird = document.createElement('div');
    const birdImg = document.createElement('img');
    birdImg.src = '小肥啾.PNG';
    birdImg.alt = '小肥啾';
    birdImg.style.cssText = `
        width: 40px;
        height: 40px;
        object-fit: contain;
    `;
    bird.appendChild(birdImg);

    bird.style.cssText = `
        position: fixed;
        z-index: 9999;
        pointer-events: none;
        left: -50px;
        top: ${Math.random() * window.innerHeight}px;
    `;

    document.body.appendChild(bird);

    if (typeof gsap !== 'undefined') {
        gsap.to(bird, {
            duration: 3,
            x: window.innerWidth + 100,
            rotation: 360,
            ease: 'none',
            onComplete: () => bird.remove()
        });
    } else {
        setTimeout(() => bird.remove(), 3000);
    }
}



// 舊的註冊表單函數已移除，避免衝突
// Registration Form - REMOVED to avoid conflicts

function showRegistrationSuccess(name) {
    // Create success modal
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="success-modal">
            <div class="success-content">
                <div class="success-animation">
                    <div class="confetti">🎉</div>
                    <div class="mascot-celebration">
                        <img src="小肥啾.PNG" alt="小肥啾" class="mascot-img celebration-mascot">
                    </div>
                    <div class="confetti">✨</div>
                </div>
                <h3>報名成功！</h3>
                <p>謝謝 ${name}，我們已經收到您的報名資料！</p>
                <div class="ticket">
                    <div class="ticket-header">
                        <h4>Algorithms - 內湖高中資訊成發</h4>
                        <span class="ticket-number">#${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</span>
                    </div>
                    <div class="ticket-details">
                        <p>📅 2026年4月22日</p>
                        <p>🕐 下午1:00 - 5:00</p>
                        <p>📍 內湖高中 國際會議廳</p>
                    </div>
                </div>
                <button class="btn btn-primary" onclick="closeSuccessModal()">太棒了！</button>
            </div>
        </div>
    `;

    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(modal);

    // Add styles for success modal
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            background: var(--card-bg);
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: scaleIn 0.3s ease;
        }
        
        .success-animation {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
            font-size: 3rem;
        }
        
        .confetti {
            animation: bounce 1s infinite;
        }
        
        .mascot-celebration {
            animation: wiggle 0.5s infinite;
        }
        
        .celebration-mascot {
            width: 60px;
            height: 60px;
        }
        
        .ticket {
            background: linear-gradient(135deg, var(--accent-color), var(--accent-brown));
            color: white;
            padding: 2rem;
            border-radius: 15px;
            margin: 2rem 0;
            position: relative;
        }
        
        .ticket::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: var(--bg-primary);
            border-radius: 50%;
        }
        
        .ticket::after {
            content: '';
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: var(--bg-primary);
            border-radius: 50%;
        }
        
        .ticket-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px dashed rgba(255,255,255,0.3);
        }
        
        .ticket-number {
            font-family: monospace;
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Store references for cleanup
    window.currentModal = modal;
    window.currentModalStyle = style;
}

function closeSuccessModal() {
    if (window.currentModal) {
        window.currentModal.remove();
        window.currentModalStyle.remove();
        delete window.currentModal;
        delete window.currentModalStyle;
    }
}

// Skill Radar Charts
function initSkillRadars() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping radar charts');
        return;
    }

    const radarData = [
        {
            id: 'radar-1',
            data: {
                labels: ['前端', '後端', '資料庫', 'DevOps', '設計', 'AI/ML'],
                datasets: [{
                    label: '技能等級',
                    data: [85, 90, 75, 60, 70, 80],
                    backgroundColor: 'rgba(140, 110, 84, 0.2)',
                    borderColor: 'rgba(140, 110, 84, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(140, 110, 84, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140, 110, 84, 1)'
                }]
            }
        },
        {
            id: 'radar-2',
            data: {
                labels: ['前端', '後端', '資料庫', 'DevOps', '設計', 'AI/ML'],
                datasets: [{
                    label: '技能等級',
                    data: [95, 70, 65, 55, 90, 60],
                    backgroundColor: 'rgba(253, 226, 228, 0.2)',
                    borderColor: 'rgba(253, 226, 228, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(253, 226, 228, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(253, 226, 228, 1)'
                }]
            }
        },
        {
            id: 'radar-3',
            data: {
                labels: ['前端', '後端', '資料庫', 'DevOps', '設計', 'AI/ML'],
                datasets: [{
                    label: '技能等級',
                    data: [60, 75, 90, 70, 65, 95],
                    backgroundColor: 'rgba(142, 151, 164, 0.2)',
                    borderColor: 'rgba(142, 151, 164, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(142, 151, 164, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(142, 151, 164, 1)'
                }]
            }
        }
    ];

    radarData.forEach(radar => {
        const canvas = document.getElementById(radar.id);
        if (canvas) {
            new Chart(canvas, {
                type: 'radar',
                data: radar.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                display: false
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            angleLines: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    }
                }
            });
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll(`
        .about-story,
        .tech-showcase,
        .timeline-item,
        .project-card,
        .member-card,
        .register-info,
        .register-form
    `);

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
}

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function () {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const mascot = document.querySelector('.mascot-container');

    if (hero && mascot) {
        const rate = scrolled * -0.5;
        mascot.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic Tech Stack Animation
function animateTechStack() {
    const techTrack = document.querySelector('.tech-track');
    if (techTrack) {
        // Duplicate items for seamless loop
        const items = techTrack.innerHTML;
        techTrack.innerHTML = items + items;
    }
}

// Call tech stack animation after DOM is loaded
document.addEventListener('DOMContentLoaded', animateTechStack);

// Add floating particles background
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = ['💻', '🚀', '⚡', '🎯', '💡'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.1;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
        `;
        particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles after page load
window.addEventListener('load', createFloatingParticles);
// Page Transitions
function initPageTransitions() {
    // Add transition class to main content
    const mainContent = document.querySelector('main') || document.body;
    mainContent.classList.add('page-transition');

    // Trigger loaded state after a short delay
    setTimeout(() => {
        mainContent.classList.add('loaded');
    }, 100);
}

// Enhanced Skill Radar Charts for Team Page
function initSkillRadars() {
    // 只在團隊頁面執行
    if (!document.getElementById('radar-1')) {
        return;
    }

    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping radar charts');
        return;
    }

    const radarData = [
        {
            id: 'radar-1',
            data: {
                labels: ['前端', '後端', '資料庫', 'DevOps', '系統設計', '演算法'],
                datasets: [{
                    label: '技能等級',
                    data: [85, 90, 75, 80, 95, 88],
                    backgroundColor: 'rgba(140, 110, 84, 0.2)',
                    borderColor: 'rgba(140, 110, 84, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(140, 110, 84, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140, 110, 84, 1)'
                }]
            }
        },
        {
            id: 'radar-2',
            data: {
                labels: ['前端', '後端', 'UI/UX', '動畫', '響應式', '使用者體驗'],
                datasets: [{
                    label: '技能等級',
                    data: [95, 70, 90, 85, 92, 88],
                    backgroundColor: 'rgba(253, 226, 228, 0.2)',
                    borderColor: 'rgba(253, 226, 228, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(253, 226, 228, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(253, 226, 228, 1)'
                }]
            }
        },
        {
            id: 'radar-3',
            data: {
                labels: ['機器學習', '資料分析', '統計學', 'Python', '資料視覺化', '演算法'],
                datasets: [{
                    label: '技能等級',
                    data: [90, 95, 85, 92, 88, 90],
                    backgroundColor: 'rgba(142, 151, 164, 0.2)',
                    borderColor: 'rgba(142, 151, 164, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(142, 151, 164, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(142, 151, 164, 1)'
                }]
            }
        },
        {
            id: 'radar-4',
            data: {
                labels: ['視覺設計', '使用者研究', '原型設計', '色彩理論', '互動設計', '設計工具'],
                datasets: [{
                    label: '技能等級',
                    data: [92, 85, 88, 90, 87, 85],
                    backgroundColor: 'rgba(217, 202, 184, 0.2)',
                    borderColor: 'rgba(217, 202, 184, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(217, 202, 184, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(217, 202, 184, 1)'
                }]
            }
        },
        {
            id: 'radar-5',
            data: {
                labels: ['嵌入式', '電路設計', 'Arduino', '感測器', '硬體除錯', '系統整合'],
                datasets: [{
                    label: '技能等級',
                    data: [88, 82, 90, 85, 80, 87],
                    backgroundColor: 'rgba(89, 56, 37, 0.2)',
                    borderColor: 'rgba(89, 56, 37, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(89, 56, 37, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(89, 56, 37, 1)'
                }]
            }
        },
        {
            id: 'radar-6',
            data: {
                labels: ['專案管理', '團隊協調', 'Git 管理', '進度控制', '溝通技巧', '問題解決'],
                datasets: [{
                    label: '技能等級',
                    data: [90, 95, 85, 88, 92, 87],
                    backgroundColor: 'rgba(142, 151, 164, 0.2)',
                    borderColor: 'rgba(142, 151, 164, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(142, 151, 164, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(142, 151, 164, 1)'
                }]
            }
        }
    ];

    radarData.forEach(radar => {
        const canvas = document.getElementById(radar.id);
        if (canvas) {
            new Chart(canvas, {
                type: 'radar',
                data: radar.data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                display: false
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            angleLines: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        }
                    }
                }
            });
        }
    });
}

// 舊的增強註冊表單函數已移除，避免衝突
// Enhanced Registration Form - REMOVED to avoid conflicts

function validateField() {
    const field = this;
    const value = field.value.trim();

    // Remove existing error
    clearFieldError.call(field);

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, '此欄位為必填');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, '請輸入有效的電子郵件地址');
            return false;
        }
    }

    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';

    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.5rem;
        `;
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError() {
    const field = this;
    field.style.borderColor = '';

    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}


// Countdown Timer (only for index page)
function initCountdownTimer() {
    const daysElement = document.getElementById('days');
    if (!daysElement) return; // Not on index page

    // Set target date: 2026.04.22 13:00
    const targetDate = new Date('2026-04-22T13:00:00');

    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            // Event has started
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add animation when numbers change
        updateNumberWithAnimation(daysElement, days.toString().padStart(2, '0'));
        updateNumberWithAnimation(hoursElement, hours.toString().padStart(2, '0'));
        updateNumberWithAnimation(minutesElement, minutes.toString().padStart(2, '0'));
        updateNumberWithAnimation(secondsElement, seconds.toString().padStart(2, '0'));
    }

    function updateNumberWithAnimation(element, newValue) {
        if (element.textContent !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.color = 'var(--accent-color)';

            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
                element.style.color = 'var(--accent-color)';
            }, 150);
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Enhanced Navigation for Multi-page
function initSmoothScrolling() {
    // Handle both internal links and external page links
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // If it's an internal anchor link
        if (href.startsWith('#')) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Page-specific initialization
document.addEventListener('DOMContentLoaded', function () {
    // Force theme initialization before other scripts
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);

    // Add page-specific classes for styling
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.body.classList.add(`page-${currentPage.replace('.html', '')}`);

    // Initialize common functionality with a small delay to ensure DOM is ready
    setTimeout(() => {
        initializeWebsite();
    }, 100);
});
// Google Apps Script 表單提交處理
document.addEventListener('DOMContentLoaded', function () {
    // 添加延遲確保所有元素都已載入
    setTimeout(function () {
        const registerForm = document.getElementById('registerForm');

        if (registerForm) {
            console.log('找到註冊表單，開始設置事件監聽器');

            registerForm.addEventListener('submit', async function (e) {
                e.preventDefault(); // 防止默認提交

                console.log('表單提交事件觸發');

                // 顯示提交中狀態
                const submitBtn = registerForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<span class="btn-text">提交中...</span><span class="btn-icon">⏳</span>';
                submitBtn.disabled = true;

                // 收集表單資料 - 使用更可靠的方法
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const titleSelect = document.getElementById('title');
                const interestSelect = document.getElementById('interest');
                const expectationsTextarea = document.getElementById('expectations');

                console.log('表單元素檢查:');
                console.log('- 姓名欄位:', nameInput);
                console.log('- 信箱欄位:', emailInput);
                console.log('- 身份選單:', titleSelect);
                console.log('- 興趣選單:', interestSelect);
                console.log('- 期待欄位:', expectationsTextarea);

                const data = {
                    name: nameInput ? nameInput.value.trim() : '',
                    email: emailInput ? emailInput.value.trim() : '',
                    title: titleSelect ? titleSelect.value : '',
                    interest: interestSelect ? interestSelect.value : '',
                    expectations: expectationsTextarea ? expectationsTextarea.value.trim() : '',
                    timestamp: new Date().toLocaleString('zh-TW', {
                        timeZone: 'Asia/Taipei',
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                };

                // 除錯：在控制台顯示收集到的資料
                console.log('收集到的表單資料:', data);
                console.log('表單元素檢查:');
                console.log('- 姓名欄位:', nameInput, '值:', nameInput ? nameInput.value : 'null');
                console.log('- 信箱欄位:', emailInput, '值:', emailInput ? emailInput.value : 'null');
                console.log('- 身份選單:', titleSelect, '值:', titleSelect ? titleSelect.value : 'null');
                console.log('- 興趣選單:', interestSelect, '值:', interestSelect ? interestSelect.value : 'null');
                console.log('- 期待欄位:', expectationsTextarea, '值:', expectationsTextarea ? expectationsTextarea.value : 'null');

                // 除錯：檢查是否有空值
                const emptyFields = [];
                if (!data.name) emptyFields.push('姓名');
                if (!data.email) emptyFields.push('電子郵件');
                if (emptyFields.length > 0) {
                    alert('請填寫必填欄位：' + emptyFields.join('、'));
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }

                try {
                    // 使用設定檔中的 Google Apps Script 網址
                    const GOOGLE_SCRIPT_URL = CONFIG.GOOGLE_SCRIPT_URL;

                    // 檢查是否已設定正確的網址
                    if (GOOGLE_SCRIPT_URL.includes('YOUR_SCRIPT_ID_HERE')) {
                        throw new Error('請先設定 Google Apps Script 網址');
                    }

                    console.log('發送資料到 Google Apps Script:', GOOGLE_SCRIPT_URL);
                    console.log('發送的資料:', data);

                    // 發送到 Google Apps Script
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors', // 重要：Google Apps Script 需要 no-cors 模式
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    console.log('Google Apps Script 回應:', response);

                    // 由於 no-cors 模式，我們無法讀取回應內容
                    // 但如果沒有拋出錯誤，就表示請求已發送

                    // 顯示成功訊息
                    const confirmMessage = `✅ 報名成功！

📋 您的報名資訊已成功提交：
👤 姓名：${data.name}
📧 信箱：${data.email}
🏫 身份：${data.title || '未填寫'}
🎯 感興趣的專題：${data.interest || '未填寫'}
💭 期待：${data.expectations || '未填寫'}

📧 確認信將發送到您的信箱
📞 如有問題請聯絡：
📧 Email: ${CONFIG.CONTACT.EMAIL}
📱 Instagram: ${CONFIG.CONTACT.INSTAGRAM}

🎉 感謝您報名參加${CONFIG.EVENT.NAME}！
我們期待在活動中與您見面！`;

                    alert(confirmMessage);

                    // 跳轉到感謝頁面
                    window.location.href = 'thanks.html';

                } catch (error) {
                    console.log('Google Apps Script 失敗，使用備用方案');

                    // 方案 B：備用報名方案
                    alert('✅ 報名資料已記錄！\n\n' +
                        '感謝您的報名：\n' +
                        '姓名：' + data.name + '\n' +
                        '信箱：' + data.email + '\n' +
                        '身份：' + (data.title || '未填寫') + '\n' +
                        '興趣：' + (data.interest || '未填寫') + '\n\n' +
                        '我們會透過以下方式與您確認：\n' +
                        '📧 Email: 1stnhai@gmail.com\n' +
                        '📱 Instagram: @nhai1st_208\n\n' +
                        '感謝您的參與！');

                    // 跳轉到感謝頁面
                    window.location.href = 'thanks.html';

                    /* 本地測試模式 - 已停用
                    console.log('本地測試模式：模擬發送到 Google Apps Script');
                    console.log('資料:', data);
                    
                    // 模擬 API 延遲
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // 顯示成功訊息
                    alert('✅ 報名成功！(測試模式)\n\n' + 
                          '姓名：' + data.name + '\n' +
                          '信箱：' + data.email + '\n' +
                          '身份：' + (data.title || '未填寫') + '\n' +
                          '興趣：' + (data.interest || '未填寫') + '\n\n' +
                          '注意：這是本地測試模式\n' +
                          '實際部署到正式網站時會自動同步到 Google Sheets');
                    
                    // 跳轉到感謝頁面
                    window.location.href = 'thanks.html';
                    */

                    // 恢復按鈕狀態
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });

            // Google Forms 備用連結處理
            const googleFormLink = document.getElementById('googleFormLink');
            if (googleFormLink) {
                googleFormLink.addEventListener('click', function (e) {
                    e.preventDefault();

                    // 請替換為你的 Google Forms 連結
                    const formUrl = 'https://forms.gle/rt8XLEWq5uQ3u2Br6'; // 替換為實際的 Google Forms 連結

                    alert('🔄 即將跳轉到 Google 表單\n\n' +
                        '我們將開啟 Google 表單讓您填寫報名資料。\n' +
                        '這是一個完全可靠的備用方案！');

                    // 在新視窗開啟 Google Forms
                    window.open(formUrl, '_blank');
                });
            }

            // 表單驗證增強
            const requiredFields = registerForm.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                field.addEventListener('blur', function () {
                    if (!this.value.trim()) {
                        this.style.borderColor = '#ff6b6b';
                    } else {
                        this.style.borderColor = 'var(--accent-color)';
                    }
                });
            });
        } else {
            console.error('找不到註冊表單元素');
        }
    }, 500); // 延遲 500ms 確保所有元素都已載入
});
// 人氣獎投票系統
class VotingSystem {
    constructor() {
        this.votingEnabled = false;
        this.votingStartDate = new Date('2026-04-22T13:00:00'); // 成發當天下午2點開始投票
        this.userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
        this.voteCounts = JSON.parse(localStorage.getItem('voteCounts') || '{}');

        this.init();
    }

    init() {
        this.checkVotingStatus();
        this.setupVoteButtons();
        this.updateVoteCounts();
        this.startCountdown();

        // 每分鐘檢查一次投票狀態
        setInterval(() => {
            this.checkVotingStatus();
        }, 60000);
    }

    checkVotingStatus() {
        const now = new Date();
        const wasEnabled = this.votingEnabled;
        this.votingEnabled = now >= this.votingStartDate;

        if (!wasEnabled && this.votingEnabled) {
            this.enableVoting();
        }

        this.updateVoteButtons();
    }

    enableVoting() {
        console.log('投票系統已開放！');

        // 顯示通知
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                z-index: 10000;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                animation: scaleIn 0.5s ease;
            ">
                <h3>🗳️ 投票開始了！</h3>
                <p>人氣獎投票現在開放，快來為你喜歡的專題投票吧！</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top: 1rem; padding: 0.5rem 1rem; background: white; color: #4CAF50; border: none; border-radius: 5px; cursor: pointer;">
                    知道了
                </button>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    setupVoteButtons() {
        const voteButtons = document.querySelectorAll('.btn-vote');

        voteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.getAttribute('data-project');
                this.handleVote(projectId, button);
            });
        });
    }

    handleVote(projectId, button) {
        if (!this.votingEnabled) {
            alert('投票尚未開放，請等待成發開始！');
            return;
        }

        if (this.userVotes[projectId]) {
            alert('您已經為這個專題投過票了！');
            return;
        }

        // 檢查用戶是否已經投票給其他專題
        const hasVoted = Object.values(this.userVotes).some(voted => voted);
        if (hasVoted) {
            alert('您只能投票給一個專題！');
            return;
        }

        // 執行投票
        this.userVotes[projectId] = true;
        this.voteCounts[projectId] = (this.voteCounts[projectId] || 0) + 1;

        // 保存到 localStorage
        localStorage.setItem('userVotes', JSON.stringify(this.userVotes));
        localStorage.setItem('voteCounts', JSON.stringify(this.voteCounts));

        // 更新顯示
        this.updateVoteCounts();
        button.classList.add('voted', 'vote-success');

        // 顯示投票成功訊息
        this.showVoteSuccess(projectId);
    }

    showVoteSuccess(projectId) {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                z-index: 10000;
                box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
                animation: slideInRight 0.5s ease;
            ">
                ✅ 投票成功！感謝您的支持！
            </div>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    updateVoteCounts() {
        const voteElements = document.querySelectorAll('.popularity-vote');

        voteElements.forEach(element => {
            const projectId = element.getAttribute('data-project');
            const countElement = element.querySelector('.vote-count');
            const count = this.voteCounts[projectId] || 0;

            if (countElement) {
                countElement.textContent = count;
            }
        });
    }

    updateVoteButtons() {
        const voteButtons = document.querySelectorAll('.btn-vote');

        voteButtons.forEach(button => {
            const projectId = button.getAttribute('data-project');

            if (this.votingEnabled) {
                button.disabled = false;
                button.querySelector('.vote-text').textContent = '投票給我們';
            } else {
                button.disabled = true;
                button.querySelector('.vote-text').textContent = '投票給我們';
            }

            if (this.userVotes[projectId]) {
                button.classList.add('voted');
                button.querySelector('.vote-text').textContent = '已投票';
            }
        });
    }

    startCountdown() {
        if (this.votingEnabled) return;

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.votingStartDate.getTime() - now;

            if (distance < 0) {
                this.checkVotingStatus();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // 更新投票倒數計時（如果有的話）
            const countdownElements = document.querySelectorAll('.countdown-timer-vote');
            countdownElements.forEach(countdown => {
                const daysEl = countdown.querySelector('.days');
                const hoursEl = countdown.querySelector('.hours');
                const minutesEl = countdown.querySelector('.minutes');
                const secondsEl = countdown.querySelector('.seconds');

                if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
                if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
                if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
                if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            });
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 管理員功能：重置投票
    resetVotes() {
        if (confirm('確定要重置所有投票嗎？此操作無法復原！')) {
            localStorage.removeItem('userVotes');
            localStorage.removeItem('voteCounts');
            this.userVotes = {};
            this.voteCounts = {};
            this.updateVoteCounts();
            this.updateVoteButtons();
            alert('投票已重置！');
        }
    }

    // 獲取投票排行榜
    getVoteRanking() {
        const projects = [
            { id: 'face-recognition', name: '第一組 - 臉部辨識鎖' },
            { id: 'sky-catcher', name: '第二組 - 天際捕手' },
            { id: 'broken-spirit', name: '第三組 - 折斷的骨氣' },
            { id: 'ai-network', name: '第四組 - AI 網路封包系統' },
            { id: 'sky-eye', name: '第五組 - 天空之眼' },
            { id: 'mega-bus', name: '第六組 - Mega公車' },
            { id: 'toilet-world', name: '第七組 - 毛廁異世界' },
            { id: 'kebi-robot', name: '第八組 - 凱比機器人' },
            { id: 'smart-space', name: '第九組 - 方寸間的智慧' }
        ];

        return projects
            .map(project => ({
                ...project,
                votes: this.voteCounts[project.id] || 0
            }))
            .sort((a, b) => b.votes - a.votes);
    }
}

// 初始化投票系統
document.addEventListener('DOMContentLoaded', function () {
    // 延遲初始化確保所有元素都已載入
    setTimeout(() => {
        window.votingSystem = new VotingSystem();
    }, 1000);
});

// 管理員快捷鍵：Ctrl+Shift+R 重置投票
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        if (window.votingSystem) {
            window.votingSystem.resetVotes();
        }
    }
});

// 添加 CSS 動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes scaleIn {
        from {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);