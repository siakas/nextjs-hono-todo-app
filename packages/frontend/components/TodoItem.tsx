import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useDeleteTodo, useUpdateTodo } from "@/hooks/useTodos";
import { cn } from "@/lib/utils";
import { useTodoStore } from "@/stores/TodoStore";
import { Todo } from "@/types/api";
import { Check, Edit2, Trash2, X } from "lucide-react";

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();

  const editingTodoId = useTodoStore((state) => state.editingTodoId);
  const editingText = useTodoStore((state) => state.editingText);
  const setEditingTodo = useTodoStore((state) => state.setEditingTodo);
  const clearEditingTodo = useTodoStore((state) => state.clearEditingTodo);

  const isEditing = editingTodoId === todo.id;

  const handleToggleComplete = () => {
    updateTodo.mutate({
      id: todo.id,
      input: { completed: !todo.completed },
    });
  };

  const handleEdit = () => {
    setEditingTodo(todo.id, todo.title);
  };

  const handleSaveEdit = () => {
    if (editingText.trim() && editingText !== todo.title) {
      updateTodo.mutate({
        id: todo.id,
        input: { title: editingText.trim() },
      });
    }
    clearEditingTodo();
  };

  const handleCancelEdit = () => {
    clearEditingTodo();
  };

  const handleDelete = () => {
    if (confirm("このTodoを削除しますか？")) {
      deleteTodo.mutate(todo.id);
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardContent className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={updateTodo.isPending || isEditing}
          className="size-5"
        />

        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editingText}
              onChange={(e) => setEditingTodo(todo.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
              className="h-8"
              autoFocus
            />
          ) : (
            <span
              className={cn(
                "text-sm",
                todo.completed && "text-muted-foreground line-through",
              )}
            >
              {todo.title}
            </span>
          )}
        </div>

        <div className="flex gap-1">
          {isEditing ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSaveEdit}
                disabled={updateTodo.isPending}
              >
                <Check className="size-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleCancelEdit}>
                <X className="size-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleEdit}
                disabled={deleteTodo.isPending}
              >
                <Edit2 className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                disabled={deleteTodo.isPending}
              >
                <Trash2 className="size-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
