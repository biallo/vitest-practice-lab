# Vitest Practice Lab

一个 Vitest 的学习项目。

## 在线预览

[https://biallo.github.io/vitest-practice-lab/](https://biallo.github.io/vitest-practice-lab/)

## 安装与运行

### 开发模式

```bash
npm install
npm run dev
```

### 运行测试

#### 监视模式（推荐用于开发）
```bash
npm test
```

#### 单次运行
```bash
npm run test:run
```

## 测试文件

项目包含以下测试示例：

- **`src/__tests__/utils.test.ts`** - 基础工具函数测试（加法、减法、乘法）
- **`src/__tests__/types.test.ts`** - TypeScript 类型和接口的测试
- **`src/__tests__/strings.test.ts`** - 字符串工具函数测试（大写、反转、计数）

## 测试特性

- ✅ **快速** - Vitest 提供极速测试执行
- ✅ **TypeScript 支持** - 完整的 TypeScript 类型检查
- ✅ **监视模式** - 文件变化自动重新运行测试
- ✅ **清晰的测试报告** - 直观的测试结果展示

## 编译和构建

```bash
npm run build
```

## 代码检查

```bash
npm run lint
```
