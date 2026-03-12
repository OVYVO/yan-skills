// 前端开发代码风格规范

module.exports = {
  name: "code-style",
  description:
    "提供前端开发工程师的代码风格和规范指南。当用户需要编写前端代码、进行代码审查或统一代码风格时调用。",

  // 代码风格规范
  codeStyle: {
    // 缩进和空格
    indentation: {
      size: 2,
      type: "spaces",
    },
    spacing: {
      beforeFunctionParentheses: true,
      aroundOperators: true,
      afterComma: true,
    },

    // 命名规范
    naming: {
      variables: "camelCase",
      functions: "camelCase",
      constants: "UPPER_SNAKE_CASE",
      classes: "PascalCase",
      components: "PascalCase",
      files: ["lower_snake_case", "camelCase"],
    },

    // 代码结构
    structure: {
      maxLineLength: 80,
      braceStyle: "K&R", // 同行情节，换行结束
      blankLines: {
        betweenFunctions: 2,
        betweenBlocks: 1,
      },
    },

    // 语法偏好
    syntax: {
      quotes: "double", // 使用双引号
      semi: true, // 使用分号
      trailingComma: "es5",
    },
  },

  // 前端技术栈规范
  techStack: {
    html: {
      semanticTags: true,
      indentation: 2,
      attributeQuotes: "double",
      selfClosingTags: true,
    },

    css: {
      namingConvention: "BEM", // .block__element--modifier
      selectorOrder: ["layout", "box-model", "typography", "visual"],
      useVariables: true,
      avoidImportant: true,
    },

    javascript: {
      es6Plus: true,
      preferConstLet: true,
      arrowFunctions: true,
      templateStrings: true,
      destructuring: true,
      asyncAwait: true,
    },

    vue: {
      compositionAPI: true,
      scriptSetup: true,
      propsTypes: true,
      scopedStyles: true,
      componentNaming: "kebab-case", // 组件使用短横线命名法
      variableDeclaration: "let", // 使用let声明变量
      reactiveUsage: {
        ref: true, // 基本类型使用ref
        reactive: true, // 对象类型使用reactive
      },
      componentCommunication: {
        defineModel: true, // 使用defineModel实现双向绑定
        defineEmits: true, // 使用defineEmits定义事件
      },
      arrowFunctions: true, // 优先使用箭头函数
      destructuring: true, // 广泛使用解构赋值
      asyncAwait: true, // 使用async/await处理异步操作
    },
  },

  // 最佳实践
  bestPractices: {
    performance: {
      lazyLoading: true,
      codeSplitting: true,
      imageOptimization: true,
      reduceHttpRequests: true,
      caching: true,
    },

    codeQuality: {
      eslint: true,
      prettier: true,
      unitTests: true,
      typescript: true,
      codeReview: true,
    },

    maintainability: {
      clearComments: true,
      singleResponsibility: true,
      avoidDuplication: true,
      designPatterns: true,
    },
  },

  // 工具配置
  toolConfig: {
    eslint: {
      extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "no-console": "warn",
        "no-unused-vars": "error",
        indent: ["error", 2],
        quotes: ["error", "double"],
        semi: ["error", "always"],
      },
    },

    typescript: {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
      },
      include: ["src"],
    },
  },

  // 常用代码片段
  codeSnippets: {
    vueFormComponent: `
<template>
  <el-form :inline="true" @submit.native.prevent>
    <el-form-item>
      <el-input
        maxlength="100"
        style="width: 260px"
        placeholder="搜索内容"
        v-model="queryForm.searchText"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-select clearable v-model="queryForm.status" placeholder="状态">
        <el-option v-for="(k, v) in statusOptions" :key="v" :label="k" :value="v" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="() => emits('resetSearch')">重置</el-button>
      <el-button type="primary" @click="() => emits('searchList')" native-type="submit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
const { statusOptions } = useType(['statusOptions']);

let queryForm = defineModel('queryForm');
let emits = defineEmits(['resetSearch', 'searchList']);
</script>
`,

    vueTableComponent: `
<template>
  <my-page title="页面标题" :loading="loading">
    <template #searchForm>
      <search-form
        v-model:queryForm="queryForm"
        @resetSearch="handerResetSearch"
        @searchList="searchList"
      ></search-form>
    </template>
    <template #buttonGroup>
      <jg-actbtn actType="export" exportAll @click="exportData"></jg-actbtn>
    </template>
    <template #tableBox>
      <vxe-table
        ref="tableRef"
        :data="tableData"
        height="100%"
        :sort-config="sortConfig"
        @sort-change="sortChange"
        stripe
      >
        <vxe-column type="seq" title="序号" width="60" />
        <vxe-column field="name" title="名称" minWidth="160" />
        <vxe-column field="status" title="状态" minWidth="120" />
        <vxe-column title="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="viewDetail(row)">详情</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </template>
    <template #paginationBox>
      <my-pagination
        v-model:pageNum="queryForm.pageNum"
        v-model:pageSize="queryForm.pageSize"
        :totalNum="totalNum"
        @getList="getList"
      ></my-pagination>
    </template>
  </my-page>
  <!--详情弹窗-->
  <jg-dialog
    class="detail-dialog"
    close-on-click-modal
    :footer="false"
    title="详情"
    v-model="detailDialogShow"
  >
    <detail-form :activeRow="activeRow"></detail-form>
  </jg-dialog>
</template>

<script setup>
import searchForm from "./searchForm.vue"
import detailForm from "./detailForm.vue"
import { getDataList, exportData } from "@/api/api.js"

let typeMap = reactive({
  1: "success",
  2: "primary",
  3: "info",
  4: "warning",
  5: "danger"
})

const { tableData, totalNum, queryForm, loading, resetSearch, searchList, getList } = useList(getDataList, {
  searchText: undefined,
  status: undefined,
  startDate: undefined,
  endDate: undefined,
  orders: [],
  pageNum: 1,
  pageSize: 15
})
const { sortConfig, sortChange, handerResetSearch } = useTablesort({ queryForm, getList, resetSearch })

const exportData = async type => {
  const payload = {
    searchText: queryForm.value.searchText,
    status: queryForm.value.status,
    startDate: queryForm.value.startDate,
    endDate: queryForm.value.endDate,
    orders: queryForm.value.orders,
    pageNum: type == "all" ? 1 : queryForm.value.pageNum,
    pageSize: type == "all" ? 999999 : queryForm.value.pageSize
  }
  await exportData(payload)
  ElMessage.success("导出成功")
}

//预览详情
let activeRow = ref({})
let detailDialogShow = ref(false)
const viewDetail = row => {
  activeRow.value = row
  detailDialogShow.value = true
}
</script>
`,

    javascriptFunction: `
const functionName = (param1, param2) => {
  // 函数逻辑
  return result;
};
`,
    scssStructure: `
.component-name {
  padding: 20px;
  background-color: #f5f5f5;
  
  .child-element {
    margin-top: 10px;
    font-size: 14px;
    
    &:hover {
      color: #409eff;
    }
  }
}
`,
  },

  // 代码审查清单
  codeReviewChecklist: [
    "代码风格符合规范",
    "命名规范一致",
    "代码逻辑清晰",
    "性能优化考虑",
    "错误处理完善",
    "测试覆盖充分",
    "注释清晰明了",
    "依赖管理合理",
    "使用 <script setup> 语法",
    "使用 let 声明变量",
    "正确使用 ref 和 reactive 进行状态管理",
    "使用 defineModel 和 defineEmits 进行组件通信",
    "优先使用箭头函数",
    "广泛使用解构赋值",
    "使用 async/await 处理异步操作",
    "组件使用短横线命名法",
    "样式使用 scoped 特性",
  ],

  // 版本控制规范
  versionControl: {
    commitMessages: "semantic", // feat: add new feature
    branchNaming: {
      feature: "feature/",
      bugfix: "bugfix/",
      chore: "chore/",
    },
    mergeStrategy: "regular merges from main",
    preReleaseChecks: ["code review", "testing"],
  },

  // 工具推荐
  recommendedTools: {
    editors: ["VS Code"],
    plugins: ["ESLint", "TypeScript", "GitLens", "oxfmt", "Volar"], // 推荐使用oxfmt插件进行代码格式化，Volar为Vue官方IDE插件
    packageManagers: ["npm", "yarn", "pnpm"],
    buildTools: ["Vite", "Webpack"],
    testTools: ["Vitest", "Cypress"],
    stateManagement: ["Pinia"], // Vue 3官方推荐的状态管理库
    httpClients: ["Axios", "Fetch API"],
    cssPreprocessors: ["Sass", "Less", "PostCSS"],
    uiLibraries: ["Element Plus", "Vuetify", "Ant Design Vue"], // Vue相关的UI库
  },

  // 学习资源
  learningResources: {
    documentation: ["MDN Web Docs", "Vue 文档"],
    tutorials: ["Vue 官方教程", "YouTube 视频教程"],
    blogs: ["DEV.to", "Medium", "掘金"],
    communities: ["Stack Overflow", "GitHub Discussions", "Vue 社区"],
    books: ["JavaScript 高级程序设计", "Vue 实战"],
  },

  // 常见问题
  commonIssues: {
    codeStyleConflicts: {
      solution: "使用 ESLint 和 Prettier 统一配置",
      prevention: "在项目初始化时配置好代码风格工具",
    },
    performanceIssues: {
      solution: "使用 Chrome DevTools 分析性能瓶颈",
      prevention: "遵循性能优化最佳实践",
    },
    typeErrors: {
      solution: "使用 TypeScript 并添加类型定义",
      prevention: "编写完整的类型定义和接口",
    },
    dependencyManagement: {
      solution: "定期更新依赖并检查安全性",
      prevention: "使用 package-lock.json 或 yarn.lock 锁定依赖版本",
    },
  },
};
