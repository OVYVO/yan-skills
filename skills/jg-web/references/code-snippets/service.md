## service 调用约定（占位）

TODO(jg-web)：根据你们的请求库（axios/fetch 封装）、返回结构（`{ list, total }` / `data` 包裹等）补齐示例。

建议最少明确：

- **函数命名**：`fetchXxxList` / `fetchXxxDetail` / `createXxx` / `updateXxx` / `deleteXxx`
- **参数结构**：列表请求参数统一为 `{ ...query, page, pageSize }`
- **错误处理**：失败是否 toast、是否吞错、是否需要区分业务码
