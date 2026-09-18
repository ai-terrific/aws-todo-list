import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { CheckSquare } from "lucide-react";
import { theme } from "./theme";
import { Task, TodoFilter } from "./types";
import { TodoInput } from "./components/TodoInput";
import { TodoItem } from "./components/TodoItem";
import { TodoFilters } from "./components/TodoFilters";
import { TodoStats } from "./components/TodoStats";
import { EmptyState } from "./components/EmptyState";
import api from "./api/axios";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<TodoFilter>("all");

  // Save to localStorage whenever tasks change
  useEffect(() => {
    try {
      handleGetAllTasks();
    } catch {
      // Ignore write errors
    }
  }, []);

  // Create Todo with title and description
  const handleAddTask = async (title: string, description?: string) => {
    try {
      const response = await api.post<Task>("/tasks", {
        title,
        description,
        completed: false,
      });

      setTasks((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleGetAllTasks = async () => {
    try {
      const response = await api.get<Task[]>("/tasks");
      console.log("Fetched tasks:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  // Toggle completion
  const handleToggleTodo = async (
    id: string,
    updates: { title: string; description?: string; completed: boolean },
  ) => {
    try {
      const response = await api.put<Task>(`/tasks/${id}`, updates);
      handleGetAllTasks();
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  // Edit task title and description
  const handleEditTodo = async (
    id: string,
    updates: { title: string; description?: string },
  ) => {
    const response = await api.put<Task>(`/tasks/${id}`, updates);
    handleGetAllTasks();
  };

  // Delete task
  const handleDeleteTodo = async (id: string) => {
    try {
      const response = await api.delete<Task[]>(`/tasks/${id}`);
      handleGetAllTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((todo) => !todo.completed));
  };

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.length - activeCount;

  const filteredTodos = tasks.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        id="todo-app-root"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#F8FAFC",
          py: { xs: 4, sm: 6 },
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container id="todo-container" maxWidth="sm" disableGutters>
          {/* Header */}
          <Box id="todo-header" sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  id="app-icon-badge"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    backgroundColor: "#2563EB",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(37, 99, 235, 0.25)",
                  }}
                >
                  <CheckSquare size={22} />
                </Box>
                <Typography
                  id="app-title"
                  variant="h4"
                  component="h1"
                  sx={{
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: { xs: "1.5rem", sm: "1.75rem" },
                  }}
                >
                  Todo List
                </Typography>
              </Box>

              <Typography
                id="today-date-text"
                variant="body2"
                sx={{
                  color: "#64748B",
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {todayFormatted}
              </Typography>
            </Box>

            <Typography
              id="app-subtitle"
              variant="body2"
              sx={{ color: "#64748B", mt: 0.5 }}
            >
              Organize your daily tasks with task names and descriptions.
            </Typography>
          </Box>

          {/* New Task Input with Title and Description */}
          <Box id="todo-input-container" sx={{ mb: 3 }}>
            <TodoInput onAdd={handleAddTask} />
          </Box>

          {/* Progress Overview */}
          <TodoStats total={tasks.length} completed={completedCount} />

          {/* Todo List Card */}
          <Paper
            id="todo-list-card"
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5 },
              borderRadius: 3,
              border: "1px solid #E2E8F0",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
              position: "relative",
              minHeight: 180,
            }}
          >
            {filteredTodos.length === 0 ? (
              <EmptyState filter={filter} hasAnyTodos={tasks.length > 0} />
            ) : (
              <Stack id="todo-items-stack" spacing={1.5} sx={{ mb: 2 }}>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                ))}
              </Stack>
            )}

            {/* Filter Bar & Footer */}
            {tasks.length > 0 && (
              <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={handleClearCompleted}
              />
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
