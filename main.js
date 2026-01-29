// 1. 初始化 AOS 動畫
AOS.init({ 
    duration: 1000, 
    once: true 
});

// 2. 移除 Loading 畫面
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// 3. 深色模式切換邏輯
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// 4. 繪製雷達圖 (Chart.js)
const ctx = document.getElementById('skillChart').getContext('2d');
new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['前端', '後端', 'AI', 'UI設計', 'Git'],
        datasets: [{
            label: '技能點數',
            data: [90, 70, 85, 60, 95],
            backgroundColor: 'rgba(255, 183, 197, 0.4)',
            borderColor: 'rgba(255, 183, 197, 1)',
            borderWidth: 2
        }]
    },
    options: {
        scales: { 
            r: { 
                suggestMin: 0, 
                ticks: { display: false } 
            } 
        },
        plugins: { 
            legend: { display: false } 
        }
    }
});