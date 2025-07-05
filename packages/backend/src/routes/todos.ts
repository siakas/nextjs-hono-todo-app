import { prisma } from "@backend/lib/prisma";
import {
  ApiResponse,
  CreateTodoInput,
  Todo,
  UpdateTodoInput,
} from "@backend/types/api";
import { Hono } from "hono";

const todos = new Hono();

// GET /api/todos - 全件取得
todos.get("/", async (c) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });

    return c.json<ApiResponse<Todo[]>>({
      success: true,
      data: todos,
    });
  } catch (error) {
    console.error("Todoの取得に失敗しました:", error);
    return c.json<ApiResponse<never>>(
      {
        success: false,
        error: "Todoの取得に失敗しました",
      },
      500,
    );
  }
});

// POST /api/todos - 新規作成
todos.post("/", async (c) => {
  try {
    const body = await c.req.json<CreateTodoInput>();

    if (!body.title || body.title.trim() === "") {
      return c.json<ApiResponse<never>>(
        {
          success: false,
          error: "タイトルは必須です",
        },
        400,
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: body.title.trim(),
      },
    });

    return c.json<ApiResponse<Todo>>(
      {
        success: true,
        data: todo,
      },
      201,
    );
  } catch (error) {
    console.error("Todoの作成に失敗しました:", error);
    return c.json<ApiResponse<never>>(
      {
        success: false,
        error: "Todoの作成に失敗しました",
      },
      500,
    );
  }
});

// PATCH /api/todos/:id - 更新
todos.patch("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json<UpdateTodoInput>();

    // 既存の Todo を確認
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json<ApiResponse<never>>(
        {
          success: false,
          error: "Todoが見つかりません",
        },
        404,
      );
    }

    // 更新
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title: body.title?.trim() || existingTodo.title,
        completed:
          body.completed !== undefined
            ? body.completed
            : existingTodo.completed,
      },
    });

    return c.json<ApiResponse<Todo>>({
      success: true,
      data: todo,
    });
  } catch (error) {
    console.error("Todoの更新に失敗しました:", error);
    return c.json<ApiResponse<never>>(
      {
        success: false,
        error: "Todoの更新に失敗しました",
      },
      500,
    );
  }
});

// DELETE /api/todos/:id - 削除
todos.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    // 既存の Todo を確認
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return c.json<ApiResponse<never>>(
        {
          success: false,
          error: "Todoが見つかりません",
        },
        404,
      );
    }

    // 削除
    await prisma.todo.delete({
      where: { id },
    });

    return c.json<ApiResponse<{ id: string }>>({
      success: true,
      data: { id },
    });
  } catch (error) {
    console.error("Todoの削除に失敗しました:", error);
    return c.json<ApiResponse<never>>(
      {
        success: false,
        error: "Todoの削除に失敗しました",
      },
      500,
    );
  }
});

export default todos;
