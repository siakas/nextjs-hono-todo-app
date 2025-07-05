import todos from "@backend/routes/todos";
import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// 環境変数を読み込み
config();

// Hono アプリケーションを作成
const app = new Hono();

// ミドルウェアの設定
app.use("*", logger()); // リクエストログ
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"], // Next.js のデフォルトエクスポート
    credentials: true,
  }),
);

// ヘルスチェックエンドポイント
app.get("/", (c) => {
  return c.json({
    message: "Todo API Server",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API ルートをマウント
app.route("/api/todos", todos);

// 404 ハンドラー
app.notFound((c) => {
  return c.json(
    {
      success: false,
      error: "Not Found",
    },
    404,
  );
});

// エラーハンドラー
app.onError((err, c) => {
  console.error("サーバーエラー:", err);
  return c.json(
    {
      success: false,
      error: "Internal Server Error",
    },
    500,
  );
});

// サーバーの起動
const port = parseInt(process.env.PORT || "8080");

console.log(`🚀 Server is starting on port ${port}...`);

serve({
  fetch: app.fetch,
  port,
});

console.log(`✅ Server is running on http://localhost:${port}`);
