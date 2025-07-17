<p align="center">
  <img src="https://raw.githubusercontent.com/TzuHanChen/todo-list/a8077a2f01e98c643dbbf12f3d36551d83b46a05/public/icon.svg" alt="ToDo List 圖示" />
</p>

<h1 align="center">ToDo List</h1>

<p align="center">實作完整 CRUD 功能的任務管理系統，可顯示或隱藏已完成的任務</p>

![截圖](/public/screenshot.png)

## 專案簡介

* 任務管理：新增、檢視、編輯、刪除、標記完成 / 未完成
* 篩選：顯示所有 / 已完成 / 未完成的任務
* 排序：根據創建時間 / 更新時間、舊到新 / 新到舊排序

## 開發工具

前端

* 使用 Next.js (App Router) + TypeScript + Tailwind CSS + Headless UI + Material Symbols 製作頁面與功能邏輯
* 使用 Server Actions 串接自行實作的 REST API

後端

* 使用 TypeScript 撰寫 SQL 腳本，連接 Neon Serverless PostgreSQL 建立資料表並新增初始資料
* 使用 Next.js route handler 實作 REST API

版本控制與部署

* 使用 GitHub 管理版本與專案開發流程
* 透過 Vercel 部署專案，並自動取得 GitHub 提交紀錄進行 CI/CD 部署

## 相關連結

[上線網站 DEMO](https://todo-list-tzuhanchen.vercel.app)：首頁、任務頁面、API 文件頁面

[Figma 設計稿](https://www.figma.com/design/qOMq50w0AbuaNXFSReg1df/ToDo-List?node-id=17-188&t=uXS0l8xv0dF2lkYW-1)：SEO 預覽圖、網站圖示、線框圖、元件

[Meta Tags](https://metatags.io/?url=https%3A%2F%2Ftodo-list-tzuhanchen.vercel.app)：可測試各項 SEO 資訊

## 未來規劃

* 搜尋任務
* 清除篩選 / 排序 / 搜尋條件
* 前端所有表單使用 React Hook Form 處理格式驗證、即時顯示錯誤訊息、顯示正在提交狀態
* 後端所有 API 加入 Zod 處理格式驗證、錯誤訊息
* 新增使用者登入 / 登出功能

<!-- ## 授權金鑰

``` bash
npx auth secret
```

上述指令產生出來的 AUTH_SECRET 要放在 .env.local -->
