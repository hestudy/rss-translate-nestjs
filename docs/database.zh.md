# 数据库操作

---

## 目录 <!-- omit in toc -->

- [关于数据库](#关于数据库)
- [数据库模式操作 (TypeORM)](#数据库模式操作-typeorm)
  - [生成迁移](#生成迁移)
  - [运行迁移](#运行迁移)
  - [回滚迁移](#回滚迁移)
  - [删除数据库中的所有表](#删除数据库中的所有表)
- [数据库模式操作 (Mongoose)](#数据库模式操作-mongoose)
  - [创建模式](#创建模式)
- [数据填充 (TypeORM)](#数据填充-typeorm)
  - [创建填充 (TypeORM)](#创建填充-typeorm)
  - [运行填充 (TypeORM)](#运行填充-typeorm)
  - [工厂和Faker (TypeORM)](#工厂和faker-typeorm)
- [数据填充 (Mongoose)](#数据填充-mongoose)
  - [创建填充 (Mongoose)](#创建填充-mongoose)
  - [运行填充 (Mongoose)](#运行填充-mongoose)
- [性能优化 (PostgreSQL + TypeORM)](#性能优化-postgresql--typeorm)
  - [索引和外键](#索引和外键)
  - [最大连接数](#最大连接数)
- [性能优化 (MongoDB + Mongoose)](#性能优化-mongodb--mongoose)
  - [设计模式](#设计模式)

---

## 关于数据库

样板支持两种类型的数据库：PostgreSQL + TypeORM 和 MongoDB + Mongoose。你可以选择其中一种或在项目中使用两者。数据库的选择取决于项目需求。

为了支持两种数据库，使用了[六边形架构](architecture.md#六边形架构)。

## 数据库模式操作 (TypeORM)

### 生成迁移

1. 创建扩展名为 `.entity.ts` 的实体文件。例如 `post.entity.ts`：

   ```ts
   // /src/posts/infrastructure/persistence/relational/entities/post.entity.ts

   import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
   import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

   @Entity()
   export class Post extends EntityRelationalHelper {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     title: string;

     @Column()
     body: string;

     // 这里可以添加任何你需要的字段
   }
   ```

1. 接下来，生成迁移文件：

   ```bash
   npm run migration:generate -- src/database/migrations/CreatePostTable
   ```

1. 通过 [npm run migration:run](#运行迁移) 将此迁移应用到数据库。

### 运行迁移

```bash
npm run migration:run
```

### 回滚迁移

```bash
npm run migration:revert
```

### 删除数据库中的所有表

```bash
npm run schema:drop
```

---

## 数据库模式操作 (Mongoose)

### 创建模式

1. 创建扩展名为 `.schema.ts` 的实体文件。例如 `post.schema.ts`：

   ```ts
   // /src/posts/infrastructure/persistence/document/entities/post.schema.ts

   import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
   import { HydratedDocument } from 'mongoose';

   export type PostSchemaDocument = HydratedDocument<PostSchemaClass>;

   @Schema({
     timestamps: true,
     toJSON: {
       virtuals: true,
       getters: true,
     },
   })
   export class PostSchemaClass extends EntityDocumentHelper {
     @Prop()
     title: string;

     @Prop()
     body: string;

     // 这里可以添加任何你需要的字段
   }

   export const PostSchema = SchemaFactory.createForClass(PostSchemaClass);
   ```

---

## 数据填充 (TypeORM)

### 创建填充 (TypeORM)

1. 使用 `npm run seed:create:relational -- --name Post` 创建填充文件。其中 `Post` 是实体名称。
1. 转到 `src/database/seeds/relational/post/post-seed.service.ts`。
1. 在 `run` 方法中扩展你的逻辑。
1. 运行 [npm run seed:run:relational](#运行填充-typeorm)

### 运行填充 (TypeORM)

```bash
npm run seed:run:relational
```

### 工厂和Faker (TypeORM)

1. 安装 faker：

   ```bash
   npm i --save-dev @faker-js/faker
   ```

1. 创建 `src/database/seeds/relational/user/user.factory.ts`：

   ```ts
   import { faker } from '@faker-js/faker';
   import { RoleEnum } from '../../../../roles/roles.enum';
   import { StatusEnum } from '../../../../statuses/statuses.enum';
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
   import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
   import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

   @Injectable()
   export class UserFactory {
     constructor(
       @InjectRepository(UserEntity)
       private repositoryUser: Repository<UserEntity>,
       @InjectRepository(RoleEntity)
       private repositoryRole: Repository<RoleEntity>,
       @InjectRepository(StatusEntity)
       private repositoryStatus: Repository<StatusEntity>,
     ) {}

     createRandomUser() {
       // 需要保存 "this" 上下文
       return () => {
         return this.repositoryUser.create({
           firstName: faker.person.firstName(),
           lastName: faker.person.lastName(),
           email: faker.internet.email(),
           password: faker.internet.password(),
           role: this.repositoryRole.create({
             id: RoleEnum.user,
             name: 'User',
           }),
           status: this.repositoryStatus.create({
             id: StatusEnum.active,
             name: 'Active',
           }),
         });
       };
     }
   }
   ```

1. 修改 `src/database/seeds/relational/user/user-seed.service.ts`：

   ```ts
   // 部分代码省略...
   import { UserFactory } from './user.factory';
   import { faker } from '@faker-js/faker';

   @Injectable()
   export class UserSeedService {
     constructor(
       // 部分代码省略...
       private userFactory: UserFactory,
     ) {}

     async run() {
       // 部分代码省略...

       await this.repository.save(
         faker.helpers.multiple(this.userFactory.createRandomUser(), {
           count: 5,
         }),
       );
     }
   }
   ```

1. 修改 `src/database/seeds/relational/user/user-seed.module.ts`：

   ```ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';

   import { UserSeedService } from './user-seed.service';
   import { UserFactory } from './user.factory';

   import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
   import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
   import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

   @Module({
     imports: [TypeOrmModule.forFeature([UserEntity, Role, Status])],
     providers: [UserSeedService, UserFactory],
     exports: [UserSeedService, UserFactory],
   })
   export class UserSeedModule {}
   ```

1. 运行填充：

   ```bash
   npm run seed:run
   ```

---

## 数据填充 (Mongoose)

### 创建填充 (Mongoose)

1. 使用 `npm run seed:create:document -- --name Post` 创建填充文件。其中 `Post` 是实体名称。
1. 转到 `src/database/seeds/document/post/post-seed.service.ts`。
1. 在 `run` 方法中扩展你的逻辑。
1. 运行 [npm run seed:run:document](#运行填充-mongoose)

### 运行填充 (Mongoose)

```bash
npm run seed:run:document
```

---

## 性能优化 (PostgreSQL + TypeORM)

### 索引和外键

不要忘记在外键（FK）列上创建`索引`（如果需要），因为默认情况下 PostgreSQL [不会自动为 FK 添加索引](https://stackoverflow.com/a/970605/18140714)。

### 最大连接数

在 `/.env` 中为你的应用程序设置数据库的[最大连接数](https://node-postgres.com/apis/pool)：

```txt
DATABASE_MAX_CONNECTIONS=100
```

你可以将此参数视为你的应用程序可以处理的并发数据库连接数。

## 性能优化 (MongoDB + Mongoose)

### 设计模式

为 MongoDB 设计模式与为关系型数据库设计模式完全不同。为了获得最佳性能，你应该根据以下内容设计你的模式：

1. [MongoDB 模式设计反模式](https://www.mongodb.com/developer/products/mongodb/schema-design-anti-pattern-massive-arrays)
1. [MongoDB 模式设计最佳实践](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)

---

上一节: [命令行接口](cli.md)

下一节: [认证](auth.md)
