# 单词星：21天倒计时 🌟

一个基于 React + TypeScript + Node.js 的全栈沉浸式单词学习应用，通过21天的学习之旅，帮助用户掌握210个英语单词。

## 项目简介

"单词星：21天倒计时"是一款创新的单词学习应用，采用游戏化设计，让用户在21天的学习过程中体验一个完整的科幻故事。用户每天学习10个新单词，通过复习和巩固，最终掌握210个核心词汇。

## 功能特性

### 🎮 游戏化学习体验
- **21天学习计划**：每天学习10个新单词，循序渐进
- **沉浸式故事**：跟随主角在单词星的冒险，体验完整的科幻剧情
- **角色互动**：与单词居民、Lexicon等角色互动，增加学习趣味性
- **剧情分支**：多种结局选择，用户决策影响故事走向

### 📚 学习功能
- **智能单词选择**：根据用户学习进度自动选择合适的单词
- **多模式学习**：新词学习、复习模式、巩固练习
- **艾宾浩斯复习**：基于遗忘曲线的智能复习计划
- **进度追踪**：实时显示学习进度和成就
- **个性化学习**：根据用户熟悉度调整学习重点

### 🎨 用户界面
- **现代设计**：采用玻璃态设计，视觉效果出众
- **流畅动画**：使用 Framer Motion 实现平滑的过渡效果
- **响应式布局**：适配各种屏幕尺寸
- **深色主题**：沉浸式深色界面，保护视力

### 📊 数据统计
- **学习成果展示**：使用无限滚动展示已学单词
- **成就系统**：解锁各种学习成就
- **进度可视化**：直观的学习进度展示
- **数据持久化**：学习数据云端同步，换设备不丢失

### 🔐 用户系统
- **账号注册/登录**：邮箱密码认证
- **游客模式**：无需注册即可体验
- **账号注销**：支持永久删除账号和数据
- **数据同步**：学习进度实时同步到云端

## 技术栈

### 前端
- **框架**：React 18 + TypeScript
- **状态管理**：Zustand
- **路由管理**：React Router
- **UI 组件**：Tailwind CSS + Shadcn/ui
- **动画库**：Framer Motion
- **构建工具**：Vite
- **HTTP 客户端**：原生 Fetch API

### 后端
- **运行时**：Node.js + TypeScript
- **框架**：Express.js
- **ORM**：Prisma
- **数据库**：PostgreSQL
- **缓存**：Redis
- **认证**：JWT (JSON Web Token)
- **安全**：Helmet + CORS + Rate Limiting

### 部署
- **前端**：可部署到 Vercel/Netlify
- **后端**：可部署到 Railway/Render/AWS
- **数据库**：PostgreSQL 云服务

## 项目结构

```
单词星：21天倒计时/
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   │   ├── database.ts # 数据库连接
│   │   │   └── redis.ts    # Redis 连接
│   │   ├── controllers/    # 控制器
│   │   │   ├── auth.controller.ts
│   │   │   ├── progress.controller.ts
│   │   │   └── study.controller.ts
│   │   ├── services/       # 业务逻辑
│   │   │   ├── auth.service.ts
│   │   │   ├── progress.service.ts
│   │   │   └── study.service.ts
│   │   ├── routes/         # 路由定义
│   │   ├── middleware/     # 中间件
│   │   ├── types/          # 类型定义
│   │   └── app.ts          # 应用入口
│   ├── prisma/
│   │   ├── schema.prisma   # 数据库模型
│   │   └── seed.ts         # 种子数据
│   └── .env                # 环境变量
│
├── public/                 # 静态资源
│   ├── image/             # 图片资源
│   └── markdown/          # 故事和角色设定
│
├── src/
│   ├── components/         # 可复用组件
│   │   ├── ui/            # UI基础组件
│   │   ├── Layout.tsx     # 布局组件
│   │   ├── Navbar.tsx     # 导航栏
│   │   ├── Marquee.tsx    # 无限滚动组件
│   │   └── Typewriter.tsx # 打字机效果
│   ├── pages/             # 页面组件
│   │   ├── auth/         # 认证相关页面
│   │   ├── game/         # 游戏相关页面
│   │   ├── story/        # 故事相关页面
│   │   ├── HomePage.tsx   # 首页
│   │   └── ProfilePage.tsx # 个人中心
│   ├── stores/            # 状态管理
│   │   └── gameStore.ts  # 游戏状态
│   ├── services/          # API 服务
│   │   └── api.ts        # API 请求封装
│   ├── data/             # 数据文件
│   │   ├── words.ts      # 单词数据
│   │   └── story.ts      # 故事数据
│   ├── lib/              # 工具函数
│   └── types/            # 类型定义
│
└── 配置文件
```

## 安装和运行

### 前置要求
- Node.js 18+
- PostgreSQL 14+
- Redis 6+ (可选，用于缓存)
- npm 或 yarn 或 pnpm

### 1. 克隆项目

```bash
git clone https://github.com/bug-zi/Word-Star-21-Day-Countdown.git
cd Word-Star-21-Day-Countdown
```

### 2. 安装前端依赖

```bash
npm install
```

### 3. 安装后端依赖

```bash
cd backend
npm install
```

### 4. 配置环境变量

#### 后端配置
创建 `backend/.env` 文件：

```env
# 数据库
DATABASE_URL="postgresql://用户名:密码@localhost:5432/wordstar?schema=public"

# Redis (可选)
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"

# 服务器
PORT=3002
NODE_ENV=development

# 前端地址
FRONTEND_URL="http://localhost:5173"
```

#### 前端配置
创建 `.env` 文件：

```env
VITE_API_URL="http://localhost:3002/api"
```

### 5. 初始化数据库

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

### 6. 启动开发服务器

#### 启动后端

```bash
cd backend
npm run dev
```
后端将在 `http://localhost:3002` 启动。

#### 启动前端

```bash
# 在项目根目录
npm run dev
```
前端将在 `http://localhost:5173` 启动。

### 7. 访问应用

打开浏览器访问 `http://localhost:5173`

## 使用指南

### 注册和登录
1. 访问应用首页
2. 点击"注册"创建账户
3. 使用邮箱和密码登录
4. 或使用"游客模式"快速体验

### 开始学习
1. 登录后进入首页
2. 点击"开始冒险"进入序章
3. 完成序章后开始21天的学习之旅

### 学习流程
1. **早晨剧情**：观看当天的剧情对话
2. **单词学习**：学习10个新单词，选择"认识"或"不认识"
3. **复习模式**：复习之前学过的单词
4. **晚间剧情**：完成当天的故事剧情
5. **进入下一天**：完成当天所有任务后进入下一天

### 查看学习成果
1. 点击导航栏的"我的"
2. 查看学习统计数据
3. 点击"已学单词"查看所有学过的单词
4. 查看成就解锁情况

### 账号管理
1. 在"我的"页面可以退出登录
2. 点击"注销账号"可永久删除账号和所有数据

## 游戏机制

### 单词状态
- **new**：新单词，待学习
- **learning**：学习中，需要复习
- **reviewing**：复习中，巩固记忆
- **mastered**：已掌握，熟悉度高

### 熟悉度系统
- 0-30%：陌生
- 31-50%：眼熟
- 51-70%：学习中
- 71-90%：掌握
- 91-100%：精通

### 复习机制
基于艾宾浩斯遗忘曲线的复习间隔：
- 第1次复习：1天后
- 第2次复习：2天后
- 第3次复习：4天后
- 第4次复习：7天后
- 第5次复习：15天后

### 成就系统
- 🎉 初次相遇：完成序幕
- ☀️ 第一天：完成第1天的学习
- 📅 一周坚持：完成第7天的学习
- 📚 单词收藏家：学习50个单词
- 🏃 半程英雄：完成第10天的学习
- 🎓 词汇大师：学习100个单词
- 🔥 坚持不懈：连续学习7天
- 👑 最终挑战：完成第21天的学习

## API 文档

### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/refresh` - 刷新令牌
- `GET /api/auth/me` - 获取当前用户信息
- `DELETE /api/auth/account` - 注销账号

### 进度相关
- `GET /api/progress` - 获取用户进度
- `PUT /api/progress` - 更新用户进度
- `GET /api/progress/day/:day` - 获取某日进度
- `PUT /api/progress/day/:day` - 更新某日进度
- `POST /api/progress/prologue/complete` - 完成序幕
- `POST /api/progress/next-day` - 进入下一天

### 学习相关
- `GET /api/study/words?day={day}` - 获取今日单词
- `GET /api/study/words/progress` - 获取单词进度
- `POST /api/study/words/learn` - 学习单词
- `POST /api/study/words/:wordId/know` - 标记为认识
- `GET /api/study/schedule` - 获取复习计划
- `GET /api/study/review` - 获取复习单词
- `POST /api/study/review/:wordId` - 复习单词
- `POST /api/study/complete` - 完成学习
- `GET /api/study/stats` - 获取学习统计

## 数据库模型

### 用户表 (users)
- id, email, username, password, createdAt

### 用户进度表 (user_progress)
- id, userId, currentDay, isPrologueCompleted, currentScene, streakDays, totalWordsLearned

### 每日进度表 (day_progress)
- id, userId, day, isCompleted, wordsLearned, morningDialogueCompleted, eveningDialogueCompleted, studyCompleted

### 单词进度表 (word_progress)
- id, userId, wordId, status, familiarity, lastReviewed, nextReview, reviewCount, dayLearned

### 复习计划表 (review_schedule)
- id, userId, wordId, scheduledDay, reviewInterval, isCompleted, completedAt

### 单词表 (words)
- id, word, meaning, pronunciation, example, level, day

## 开发计划

### 已完成功能
- ✅ 用户认证系统（注册/登录/注销）
- ✅ 游客模式
- ✅ 21天学习流程
- ✅ 单词学习和复习
- ✅ 艾宾浩斯复习算法
- ✅ 剧情对话系统
- ✅ 学习进度云端同步
- ✅ 成就系统
- ✅ 学习成果展示
- ✅ 账号注销功能

### 计划中功能
- 🔄 单词发音功能（TTS）
- 🔄 社交分享功能
- 🔄 学习提醒系统（邮件/推送）
- 🔄 数据导出功能（PDF/Excel）
- 🔄 多语言支持（i18n）
- 🔄 移动端 App（React Native）
- 🔄 管理员后台

## 生产部署

### 前端部署
```bash
npm run build
# 将 dist 目录部署到 Vercel/Netlify
```

### 后端部署
```bash
cd backend
npm run build
npm start
# 或使用 PM2: pm2 start dist/app.js
```

### 环境变量（生产）
- 使用强密码的 JWT_SECRET
- 配置生产数据库 URL
- 设置正确的 FRONTEND_URL
- 启用 HTTPS

## 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！

### 如何贡献
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范
- 遵循 ESLint 规则
- 使用 TypeScript 类型检查
- 保持代码风格一致
- 添加适当的注释
- 提交前运行测试

## 常见问题

### Q: 为什么学习进度没有保存？
A: 请确保：
1. 后端服务器已启动
2. 数据库已正确配置
3. 网络连接正常
4. 使用注册账号登录（游客模式数据仅保存在本地）

### Q: 如何重置学习进度？
A: 在"我的"页面的"调试工具"中点击"重置游戏"，或注销账号重新注册。

### Q: 支持离线学习吗？
A: 目前需要联网同步数据，离线模式正在开发中。

## 许可证

本项目采用 MIT 许可证。

## 联系方式

- 项目地址：[https://github.com/bug-zi/Word-Star-21-Day-Countdown](https://github.com/bug-zi/Word-Star-21-Day-Countdown)
- 问题反馈：[GitHub Issues](https://github.com/bug-zi/Word-Star-21-Day-Countdown/issues)

## 致谢

感谢所有为这个项目做出贡献的开发者和测试者！

---

**开始你的单词学习之旅吧！** 🚀✨
