FROM node:20-alpine

# pnpmをインストール
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 依存関係ファイルをコピー
COPY package.json pnpm-lock.yaml* ./

# 依存関係をインストール
RUN pnpm install --frozen-lockfile

# アプリケーションコードをコピー
COPY . .

# Prisma Clientを生成
RUN pnpm prisma generate

# ポートを公開
EXPOSE 8080

# 開発サーバーを起動
CMD ["pnpm", "dev"]