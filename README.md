This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Github page 部屬失敗紀錄

- 原規劃: 將本專案部屬至 Github page
- 實際狀況: 部屬失敗，查看 Github Actions [錯誤紀錄](https://github.com/JoyChangDev/debounce-input/actions/runs/16552157584/job/46808574823) / [screenshot↗](/public/github-action-error.png)
- 錯誤訊息摘要:
  ```javascript
  Error: export const dynamic = "force-static"/export const revalidate not configured on route "/apis/movies" with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export
  ```

### 原因說明

1. Next.js 靜態匯出（static export）限制，根據官方文件 [static-exports](https://nextjs.org/docs/app/guides/static-exports#route-handlers):

- Route Handler（如 app/apis/movies/route.js）在執行 next build 時，只能產生靜態回應，且僅支援 `GET` 方法。
- 如果需要根據請求內容動態產生回應（例如根據查詢參數、header、cookie 等），則無法使用靜態匯出，會導致部署失敗。
- 原文:

  > Route Handlers will render a static response when running next build. Only the `GET` HTTP verb is supported.  
  > If you need to read dynamic values from the incoming request, you **cannot** use a static export.

2. `export const dynamic = "force-static"` 的限制，根據官方文件 [dynamic](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) :

- 強制將頁面或 API 設為靜態，所有 cookies、headers 及 useSearchParams() 都會回傳空值，無法取得動態資料。
- 原文:

  > Force static rendering and cache the data of a layout or page by forcing cookies, headers() and useSearchParams() to return empty values.

### 專案設計說明

- 本專案在 app/apis/movies/route.js 中設計了一個動態 `GET` API：
  - 路徑: `/api/movies?keyword={keyword}`
  - 作用: 於 Next.js 伺服器端發送 API 請求，避免將 API token（如 TMDB_TOKEN）暴露在瀏覽器端
  - 此設計需要伺服器動態處理請求，因此無法用 Github Pages（僅支援靜態檔案）部署。

### 補充

- 若需支援動態 API，建議改用支援 Serverless Function 的平台（如 Vercel、Netlify 等）部署
- 官方文件參考 [Deploying](https://nextjs.org/docs/app/getting-started/deploying)
