const btn = document.getElementById('dark-mode-toggle');

// 監聽深色模式按鈕
btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        btn.innerText = '☀️ Light Mode';
    } else {
        btn.innerText = '🌙 Coding Night';
    }
});

// 模擬 Loading 結束
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1500); // 1.5秒後關閉
});