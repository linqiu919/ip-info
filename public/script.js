document.addEventListener('DOMContentLoaded', function() {
    const ipInput = document.getElementById('ipInput');
    const queryBtn = document.getElementById('queryBtn');
    const resultContainer = document.getElementById('resultContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const errorMessage = document.getElementById('errorMessage');
    
    // 结果元素
    const ipResult = document.getElementById('ipResult');
    const countryResult = document.getElementById('countryResult');
    const provinceResult = document.getElementById('provinceResult');
    const cityResult = document.getElementById('cityResult');
    const districtResult = document.getElementById('districtResult');
    const latResult = document.getElementById('latResult');
    const lngResult = document.getElementById('lngResult');
    const asResult = document.getElementById('asResult');
    
    // 查询按钮点击事件
    queryBtn.addEventListener('click', function() {
        const ipAddress = ipInput.value.trim();
        
        if (!ipAddress) {
            showError('请输入IP地址');
            return;
        }
        
        if (!isValidIP(ipAddress)) {
            showError('请输入有效的IP地址');
            return;
        }
        
        queryIPInfo(ipAddress);
    });
    
    // 回车键触发查询
    ipInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            queryBtn.click();
        }
    });
    
    // 验证IP地址格式
    function isValidIP(ip) {
        const ipPattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
        if (!ipPattern.test(ip)) return false;
        
        const parts = ip.split('.');
        return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
    }
    
    // 查询IP信息
    function queryIPInfo(ip) {
        // 隐藏错误信息
        errorMessage.classList.add('hidden');
        
        // 隐藏结果容器
        resultContainer.classList.add('hidden');
        
        // 显示加载指示器
        loadingIndicator.classList.remove('hidden');
        
        // 发送API请求
        fetch(`/api/ip-info?ip=${ip}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应不正常');
                }
                return response.json();
            })
            .then(data => {
                handleResponse(data, ip);
            })
            .catch(error => {
                console.error('查询失败:', error);
                showError('查询失败，请稍后再试');
                loadingIndicator.classList.add('hidden');
            });
    }
    
    // 添加撒花效果函数
    function createConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `scale(${Math.random()})`;
            
            document.body.appendChild(confetti);
            
            // 动画结束后移除元素
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }
    
    // 处理API响应
    function handleResponse(data, ip) {
        loadingIndicator.classList.add('hidden');
        
        if (!data || !data.data) {
            showError('未找到IP信息');
            return;
        }
        
        // 填充结果
        ipResult.textContent = ip;
        
        const ipData = data.data;
        countryResult.textContent = ipData.country || '-';
        provinceResult.textContent = ipData.province || '-';
        cityResult.textContent = ipData.city || '-';
        districtResult.textContent = ipData.district || '-';
        
        // 经纬度
        latResult.textContent = ipData.latitude ? ipData.latitude.toFixed(4) : '-';
        lngResult.textContent = ipData.longitude ? ipData.longitude.toFixed(4) : '-';
        
        // 运营商
        asResult.textContent = ipData.as || '-';
        
        // 显示结果容器
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('visible');
        
        // 创建撒花效果
        createConfetti();
        
        // 重置动画
        const resultItems = document.querySelectorAll('.result-item');
        resultItems.forEach(item => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = '';
            }, 10);
        });
    }
    
    // 显示错误信息
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
}); 