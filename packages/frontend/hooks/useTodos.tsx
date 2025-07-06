import { todoApi } from "@/lib/api/client";
import { CreateTodoInput, UpdateTodoInput } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TODOS_QUERY_KEY = ["todos"];

// Todo リストを取得
export const useTodos = () => {
  return useQuery({
    queryKey: TODOS_QUERY_KEY,
    queryFn: todoApi.getAll,
  });
};

// Todo 作成
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTodoInput) => todoApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("✅ Todoを作成しました");
    },
    onError: (error: Error) => {
      toast.error("❌ エラーが発生しました", {
        description: error.message,
      });
    },
  });
};

// Todo 更新
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTodoInput }) =>
      todoApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("✅ Todoを更新しました");
    },
    onError: (error: Error) => {
      toast.error("❌ エラーが発生しました", {
        description: error.message,
      });
    },
  });
};

// Todo 削除
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
      toast.success("🗑️ Todoを削除しました");
    },
    onError: (error: Error) => {
      toast.error("❌ エラーが発生しました", {
        description: error.message,
      });
    },
  });
};
