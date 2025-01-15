# 安装

NestJS Boilerplate 支持使用 [TypeORM](https://www.npmjs.com/package/typeorm) 和 [Mongoose](https://www.npmjs.com/package/mongoose) 来操作数据库。默认情况下，TypeORM 使用 [PostgreSQL](https://www.postgresql.org/) 作为主数据库，但你可以使用任何关系型数据库。

基于[六边形架构](architecture.md#六边形架构)实现了 TypeORM 和 Mongoose 之间的切换。这使得为你的应用程序选择合适的数据库变得容易。

---

## 目录 <!-- omit in toc -->

- [舒适开发 (PostgreSQL + TypeORM)](#舒适开发-postgresql--typeorm)
  - [视频指南 (PostgreSQL + TypeORM)](#视频指南-postgresql--typeorm)
- [舒适开发 (MongoDB + Mongoose)](#舒适开发-mongodb--mongoose)
- [快速运行 (PostgreSQL + TypeORM)](#快速运行-postgresql--typeorm)
- [快速运行 (MongoDB + Mongoose)](#快速运行-mongodb--mongoose)
- [链接](#链接)

---

## 舒适开发 (PostgreSQL + TypeORM)

1. 克隆仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. 进入文件夹，并将 `env-example-relational` 复制为 `.env`

   ```bash
   cd my-app/
   cp env-example-relational .env
   ```

1. 将 `DATABASE_HOST=postgres` 改为 `DATABASE_HOST=localhost`

   将 `MAIL_HOST=maildev` 改为 `MAIL_HOST=localhost`

1. 运行额外的容器：

   ```bash
   docker compose up -d postgres adminer maildev
   ```

1. 安装依赖

   ```bash
   npm install
   ```

1. 运行应用配置

   > 你应该只在项目初始化时运行此命令，之后跳过它。

   > 如果你想为 boilerplate 做贡献，则不应运行此命令。

   ```bash
   npm run app:config
   ```

1. 运行迁移

   ```bash
   npm run migration:run
   ```

1. 运行数据填充

   ```bash
   npm run seed:run:relational
   ```

1. 以开发模式运行应用

   ```bash
   npm run start:dev
   ```

1. 打开 <http://localhost:3000>

### 视频指南 (PostgreSQL + TypeORM)

<https://github.com/user-attachments/assets/136a16aa-f94a-4b20-8eaf-6b4262964315>

---

## 舒适开发 (MongoDB + Mongoose)

1. 克隆仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. 进入文件夹，并将 `env-example-document` 复制为 `.env`

   ```bash
   cd my-app/
   cp env-example-document .env
   ```

1. 将 `DATABASE_URL=mongodb://mongo:27017` 改为 `DATABASE_URL=mongodb://localhost:27017`

1. 运行额外的容器：

   ```bash
   docker compose -f docker-compose.document.yaml up -d mongo mongo-express maildev
   ```

1. 安装依赖

   ```bash
   npm install
   ```

1. 运行应用配置

   > 你应该只在项目初始化时运行此命令，之后跳过它。

   > 如果你想为 boilerplate 做贡献，则不应运行此命令。

   ```bash
   npm run app:config
   ```

1. 运行数据填充

   ```bash
   npm run seed:run:document
   ```

1. 以开发模式运行应用

   ```bash
   npm run start:dev
   ```

1. 打开 <http://localhost:3000>

---

## 快速运行 (PostgreSQL + TypeORM)

如果你想快速运行你的应用，可以使用以下命令：

1. 克隆仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. 进入文件夹，并将 `env-example-relational` 复制为 `.env`

   ```bash
   cd my-app/
   cp env-example-relational .env
   ```

1. 运行容器

   ```bash
   docker compose up -d
   ```

1. 检查状态

   ```bash
   docker compose logs
   ```

1. 打开 <http://localhost:3000>

---

## 快速运行 (MongoDB + Mongoose)

如果你想快速运行你的应用，可以使用以下命令：

1. 克隆仓库

   ```bash
   git clone --depth 1 https://github.com/brocoders/nestjs-boilerplate.git my-app
   ```

1. 进入文件夹，并将 `env-example-document` 复制为 `.env`

   ```bash
   cd my-app/
   cp env-example-document .env
   ```

1. 运行容器

   ```bash
   docker compose -f docker-compose.document.yaml up -d
   ```

1. 检查状态

   ```bash
   docker compose -f docker-compose.document.yaml logs
   ```

1. 打开 <http://localhost:3000>

---

## 链接

- Swagger (API 文档): <http://localhost:3000/docs>
- Adminer (数据库客户端): <http://localhost:8080>
- MongoDB Express (数据库客户端): <http://localhost:8081/>
- Maildev: <http://localhost:1080>

---

上一节: [介绍](introduction.md)

下一节: [架构](architecture.md)
