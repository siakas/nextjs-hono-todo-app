import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TodoStore = {
  // 新規 Todo 入力用のテキスト
  newTodoText: string;
  setNewTodoText: (text: string) => void;
  clearNewTodoText: () => void;

  // 編集中の Todo
  editingTodoId: string | null;
  editingText: string;
  setEditingTodo: (id: string | null, text?: string) => void;
  clearEditingTodo: () => void;

  // UI 状態
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    (set) => ({
      // 新規 Todo 入力
      newTodoText: "",
      setNewTodoText: (text) =>
        set({ newTodoText: text }, undefined, "TodoStore/setNewTodoText"),
      clearNewTodoText: () =>
        set({ newTodoText: "" }, undefined, "TodoStore/clearNewTodoText"),

      // 編集状態
      editingTodoId: null,
      editingText: "",
      setEditingTodo: (id, text = "") =>
        set(
          { editingTodoId: id, editingText: text },
          undefined,
          "TodoStore/setEditingTodo",
        ),
      clearEditingTodo: () =>
        set(
          { editingTodoId: null, editingText: "" },
          undefined,
          "TodoStore/clearEditingTodo",
        ),

      // UI 状態
      isCreating: false,
      setIsCreating: (isCreating) =>
        set({ isCreating }, undefined, "TodoStore/setIsCreating"),
    }),
    {
      name: "useTodoStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
