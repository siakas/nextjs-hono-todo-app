import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTodos } from "@/hooks/useTodos";
import { Loader2 } from "lucide-react";
import { Geist } from "next/font/google";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  const { data: todos, isLoading, error } = useTodos();

  return (
    <>
      <Head>
        <title>Todo App - Next.js + Hono</title>
        <meta name="description" content="Modern Todo Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={`${geistSans.className} min-h-screen bg-gray-50 dark:bg-gray-900`}
      >
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                ✨ My Todo List
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TodoForm />

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="text-muted-foreground size-8 animate-spin" />
                </div>
              ) : error ? (
                <div className="py-8 text-center text-red-500">
                  エラーが発生しました: {error.message}
                </div>
              ) : todos && todos.length > 0 ? (
                <div className="space-y-2">
                  {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  Todo がありません。新しい Todo を追加してください。
                </div>
              )}

              {todos && todos.length > 0 && (
                <div className="text-muted-foreground pt-4 text-center text-sm">
                  {todos.filter((todo) => todo.completed).length} /{" "}
                  {todos.length} 完了
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
