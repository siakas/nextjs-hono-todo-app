import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/hooks/useTodos";
import { useTodoStore } from "@/stores/TodoStore";
import { Plus } from "lucide-react";
import { FormEvent } from "react";

export const TodoForm = () => {
  const createTodo = useCreateTodo();

  const newTodoText = useTodoStore((state) => state.newTodoText);
  const setNewTodoText = useTodoStore((state) => state.setNewTodoText);
  const clearNewTodoText = useTodoStore((state) => state.clearNewTodoText);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newTodoText.trim()) {
      createTodo.mutate(
        {
          title: newTodoText.trim(),
        },
        {
          onSuccess: () => {
            clearNewTodoText();
          },
        },
      );
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="新しいTodoを入力..."
            disabled={createTodo.isPending}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!newTodoText.trim() || createTodo.isPending}
            size="icon"
          >
            <Plus className="size-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
