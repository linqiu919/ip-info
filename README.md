# IP查询应用

这是一个简单的IP地址查询工具页面，可以查询IP地址的地理位置和运营商信息。

后端接口服务基于：<a href="https://github.com/deanxv/go-geoip">go-geoip</a>，对你有用请点个Star

# 列表比较工具
可以比较A和B两个列表数据，找出在A中但不在B中的项目。

# Demo站点
<a href="https://ip.wxnext.top">IP地址查询</a>

## 环境变量配置

本应用使用环境变量来配置API接口地址和认证信息。你可以通过以下两种方式设置环境变量：

### 方法1：使用.env文件

1. 复制`.env.example`文件并重命名为`.env`
2. 根据需要修改`.env`文件中的配置

```
# API配置
API_BASE_URL=http://your-api-url.com
API_AUTH_TOKEN=your-auth-token

# 端口配置
PORT=33000
```

### 方法2：直接设置环境变量

在启动应用前设置环境变量：

```bash
# Linux/Mac
export API_BASE_URL=http://your-api-url.com
export API_AUTH_TOKEN=your-auth-token
export PORT=33000

# Windows
set API_BASE_URL=http://your-api-url.com
set API_AUTH_TOKEN=your-auth-token
set PORT=33000
```

## 可配置的环境变量

| 变量名 | 描述 | 默认值                   |
|--------|------|-----------------------|
| API_BASE_URL | API接口的基础URL | http://127.0.0.1:3000 |
| API_AUTH_TOKEN | API认证令牌 | xxxxxxxx              |
| PORT | 服务器监听端口 | 33000                 |

## 启动应用

```bash
# 安装依赖
npm install

# 开发模式启动
npm run dev

# 生产模式启动
npm start
```

## Vercel部署说明

本项目已配置好适用于Vercel的部署文件，可以直接部署到Vercel平台。

### 部署步骤

1. 在GitHub上fork或克隆本仓库

2. 在Vercel上创建新项目
   - 登录[Vercel](https://vercel.com/)
   - 点击"New Project"
   - 导入你fork的GitHub仓库

3. 配置环境变量
   - 在Vercel项目设置中找到"Environment Variables"部分
   - 添加以下环境变量：
     - `API_BASE_URL`
     - `API_AUTH_TOKEN`
     - 其他需要自定义的环境变量

4. 点击"Deploy"开始部署

### 更新部署

当你更新代码并推送到GitHub仓库后，Vercel会自动重新部署你的应用。

### 自定义域名

1. 在Vercel项目的"Settings"中找到"Domains"部分
2. 添加你的自定义域名
3. 按照Vercel提供的说明配置DNS记录

### 查看日志和监控

在Vercel项目的"Logs"部分可以查看应用的运行日志，帮助你排查问题。

### Vercel环境变量管理

在Vercel上，环境变量的管理非常灵活，可以根据不同的部署环境设置不同的变量值：

1. **项目设置中的环境变量**
   - 进入项目设置 > Environment Variables
   - 可以为每个环境变量选择应用的环境（Production、Preview、Development）

2. **使用团队级别的环境变量**
   - 在团队设置中可以创建共享的环境变量
   - 这些变量可以在多个项目中使用

3. **使用加密的环境变量**
   - 对于敏感信息（如API密钥），可以启用加密选项
   - 加密的环境变量在部署日志中不会被显示

这种方式使得你可以在不同的部署环境中使用不同的API接口地址和认证信息，而无需修改代码。

### 使用Vercel CLI进行本地开发

你也可以使用Vercel CLI在本地开发时使用与Vercel部署环境相同的环境变量：

1. **安装Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录到你的Vercel账户**
   ```bash
   vercel login
   ```

3. **拉取环境变量并本地运行**
   ```bash
   vercel env pull .env.local
   vercel dev
   ```

这样，你就可以在本地开发环境中使用与Vercel部署环境相同的环境变量配置。
