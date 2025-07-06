import {
  ApiResponse,
  CreateTodoInput,
  Todo,
  UpdateTodoInput,
} from "@/types/api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

// Todo API 関数
export const todoApi = {
  // 全件取得
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<ApiResponse<Todo[]>>("/api/todos");
    return data.data || [];
  },

  // 新規作成
  create: async (input: CreateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.post<ApiResponse<Todo>>(
      "/api/todos",
      input,
    );
    if (!data.data) throw new Error(data.error || "Todoの作成に失敗しました");
    return data.data;
  },

  // 更新
  update: async (id: string, input: UpdateTodoInput): Promise<Todo> => {
    const { data } = await apiClient.patch<ApiResponse<Todo>>(
      `/api/todos/${id}`,
      input,
    );
    if (!data.data) throw new Error(data.error || "Todoの更新に失敗しました");
    return data.data;
  },

  // 削除
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/todos/${id}`);
  },
};
