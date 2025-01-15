# 命令行接口 (CLI)

---

## 目录 <!-- omit in toc -->

- [生成资源](#生成资源)
  - [面向文档数据库 (MongoDB + Mongoose)](#面向文档数据库-mongodb--mongoose)
  - [关系型数据库 (PostgreSQL + TypeORM)](#关系型数据库-postgresql--typeorm)
    - [关系型数据库视频指南 (PostgreSQL + TypeORM)](#关系型数据库视频指南-postgresql--typeorm)
  - [两种数据库](#两种数据库)
- [为资源添加属性](#为资源添加属性)
  - [面向文档数据库的属性 (MongoDB + Mongoose)](#面向文档数据库的属性-mongodb--mongoose)
  - [关系型数据库的属性 (PostgreSQL + TypeORM)](#关系型数据库的属性-postgresql--typeorm)
    - [如何为关系型数据库添加属性视频指南 (PostgreSQL + TypeORM)](#如何为关系型数据库添加属性视频指南-postgresql--typeorm)
  - [两种数据库的属性](#两种数据库的属性)

---

## 生成资源

使用以下命令生成资源：

### 面向文档数据库 (MongoDB + Mongoose)
  
```bash
npm run generate:resource:document -- --name 资源名称
```

示例：

```bash
npm run generate:resource:document -- --name Category
```

### 关系型数据库 (PostgreSQL + TypeORM)

```bash
npm run generate:resource:relational -- --name 资源名称
```

示例：

```bash
npm run generate:resource:relational -- --name Category
```

#### 关系型数据库视频指南 (PostgreSQL + TypeORM)

<https://github.com/user-attachments/assets/f7f91a7d-f9ff-4653-a78a-152ac5e7a95d>

### 两种数据库

```bash
npm run generate:resource:all-db -- --name 资源名称
```

示例：

```bash
npm run generate:resource:all-db -- --name Category
```

## 为资源添加属性

### 面向文档数据库的属性 (MongoDB + Mongoose)

```bash
npm run add:property:to-document
```

### 关系型数据库的属性 (PostgreSQL + TypeORM)

```bash
npm run add:property:to-relational
```

#### 如何为关系型数据库添加属性视频指南 (PostgreSQL + TypeORM)

<https://github.com/user-attachments/assets/95b9d70a-70cf-442a-b8bf-a73d32810e0c>

### 两种数据库的属性

```bash
npm run add:property:to-all-db
```

---

上一节: [架构](architecture.md)

下一节: [数据库操作](database.md)
