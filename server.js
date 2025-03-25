const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 33000;

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// API代理端点
app.get('/api/ip-info', async (req, res) => {
  try {
    const ip = req.query.ip;
    if (!ip) {
      return res.status(400).json({ error: '请提供IP地址' });
    }

    const response = await axios.get(`http://140.245.69.89:37099/ip/${ip}`, {
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Authorization': 'qz1941131',
        'Connection': 'keep-alive',
        'User-Agent': 'PostmanRuntime-ApipostRuntime/1.1.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('API请求失败:', error);
    res.status(500).json({ error: '查询失败，请稍后再试' });
  }
});

// 所有其他路由都返回index.html，实现单页应用路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 本地开发时使用
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
}

// 为Vercel无服务器环境导出
module.exports = app; 