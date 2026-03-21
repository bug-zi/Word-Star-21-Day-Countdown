# 单词星项目部署指南

本文档介绍如何在本地开发环境和腾讯云生产环境部署项目。

## 快速开始

### 本地开发环境

```bash
# 1. 安装依赖
npm install
cd backend && npm install && cd ..

# 2. 创建环境配置文件
cp .env.example .env.development
cp backend/.env.example backend/.env.development

# 3. 启动 Docker 环境（数据库 + Redis）
docker-compose up -d

# 4. 启动后端
cd backend
npm run dev

# 5. 启动前端（新终端）
npm run dev
```

访问地址：
- 前端：http://localhost:5173
- 后端 API：http://localhost:3002/api

### 腾讯云生产环境

#### 方式一：使用部署脚本

```bash
# 1. 配置生产环境变量
vi .env.production
vi backend/.env.production

# 2. 运行部署脚本
./deploy.sh
# 选择选项 2：腾讯云生产环境
```

#### 方式二：手动部署

```bash
# 1. 构建生产版本
npm run build:prod

# 2. 上传到腾讯云服务器
scp -r dist/* root@你的服务器IP:/opt/wordstar/frontend/

# 3. 在服务器上启动
docker-compose -f docker-compose.prod.yml up -d
```

## 环境配置说明

### 本地开发环境

使用 `.env.development` 和 `backend/.env.development`：
- 前端 API 地址指向 localhost:3002
- 后端连接本地数据库和 Redis
- 开启调试模式

### 腾讯云生产环境

使用 `.env.production` 和 `backend/.env.production`：
- 前端 API 地址指向腾讯云域名
- 后端连接腾讯云数据库和 Redis
- 关闭调试模式

## 常用命令

```bash
# 本地开发
npm run dev              # 启动前端
cd backend && npm run dev  # 启动后端
docker-compose up -d     # 启动数据库和 Redis

# 构建
npm run build:dev        # 构建开发版本
npm run build:prod       # 构建生产版本

# 部署
./deploy.sh              # 交互式部署脚本
docker-compose -f docker-compose.prod.yml up -d  # 生产环境

# 查看日志
docker-compose logs -f
docker-compose -f docker-compose.prod.yml logs -f

# 停止服务
docker-compose down
docker-compose -f docker-compose.prod.yml down
```

## 注意事项

1. **环境变量安全**：生产环境的 `.env.production` 文件包含敏感信息，不要提交到 Git
2. **数据库迁移**：首次部署需要执行 `npx prisma migrate deploy`
3. **JWT 密钥**：生产环境务必使用强密码，至少 32 位随机字符
4. **防火墙设置**：确保腾讯云安全组开放 80、443、3002 端口