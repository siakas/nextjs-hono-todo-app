// Todo の型定義
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

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
