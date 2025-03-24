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
        // 显示加载指示器
        resultContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');
        
        // 使用我们的代理API端点
        const apiUrl = `/api/ip-info?ip=${ip}`;
        
        fetch(apiUrl)
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
            });
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
        
        const rgeo = data.data.rgeo || {};
        countryResult.textContent = rgeo.country || '-';
        provinceResult.textContent = rgeo.province || '-';
        cityResult.textContent = rgeo.city || '-';
        districtResult.textContent = rgeo.district || '-';
        
        // 经纬度
        latResult.textContent = data.data.lat ? data.data.lat.toFixed(4) : '-';
        lngResult.textContent = data.data.lng ? data.data.lng.toFixed(4) : '-';
        
        // 显示结果容器
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('visible');
        
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
        loadingIndicator.classList.add('hidden');
        resultContainer.classList.add('hidden');
        
        const errorText = errorMessage.querySelector('p');
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }
}); 