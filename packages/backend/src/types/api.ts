import { Todo } from "@prisma/client";

// API レスポンスの型定義
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Todo 作成時の入力型
export type CreateTodoInput = {
  title: string;
};

// Todo 更新時の入力型
export type UpdateTodoInput = {
  title?: string;
  completed?: boolean;
};

// エクスポートする型
export type { Todo };
