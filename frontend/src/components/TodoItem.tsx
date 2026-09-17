import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Task } from "../types";

interface TodoItemProps {
  todo: Task;
  onToggle: (
    id: string,
    updates: { title: string; description?: string; completed: boolean },
  ) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    updates: { title: string; description?: string },
  ) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || "",
  );
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editTitleInputRef.current) {
      editTitleInputRef.current.focus();
      editTitleInputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = editTitle?.trim();
    if (!trimmedTitle) return;

    const trimmedDesc = editDescription.trim();
    onEdit(todo.id, {
      title: trimmedTitle,
      description: trimmedDesc ? trimmedDesc : undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleDescKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <Paper
      id={`todo-item-${todo.id}`}
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2.5,
        borderColor: todo.completed ? "#E2E8F0" : "#CBD5E1",
        backgroundColor: todo.completed ? "#F8FAFC" : "#FFFFFF",
        transition: "all 0.15s ease-in-out",
        "&:hover": {
          borderColor: "#94A3B8",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {isEditing ? (
        <Box
          id={`todo-edit-container-${todo.id}`}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          <TextField
            inputRef={editTitleInputRef}
            id={`todo-edit-title-${todo.id}`}
            size="small"
            fullWidth
            label="Task Name"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleTitleKeyDown}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <TextField
            id={`todo-edit-desc-${todo.id}`}
            size="small"
            fullWidth
            multiline
            rows={2}
            label="Description (optional)"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleDescKeyDown}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#FFFFFF",
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button
              id={`todo-cancel-button-${todo.id}`}
              size="small"
              variant="outlined"
              color="inherit"
              onClick={handleCancel}
              startIcon={<X size={16} />}
              sx={{ color: "#64748B" }}
            >
              Cancel
            </Button>
            <Button
              id={`todo-save-button-${todo.id}`}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSave}
              startIcon={<Check size={16} />}
              disabled={!editTitle?.trim()}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
          }}
        >
          <Checkbox
            id={`todo-checkbox-${todo.id}`}
            checked={todo.completed}
            onChange={() =>
              onToggle(todo.id, {
                title: todo.title,
                description: todo?.description,
                completed: !todo.completed,
              })
            }
            aria-label={`Mark "${todo.title}" as ${todo.completed ? "incomplete" : "complete"}`}
            sx={{ p: 0.25, mt: 0.25 }}
          />

          <Box
            id={`todo-content-container-${todo.id}`}
            sx={{ flexGrow: 1, minWidth: 0, cursor: "pointer" }}
            onDoubleClick={handleStartEdit}
          >
            <Typography
              id={`todo-title-${todo.id}`}
              variant="body1"
              sx={{
                wordBreak: "break-word",
                color: todo.completed ? "#94A3B8" : "#0F172A",
                textDecoration: todo.completed ? "line-through" : "none",
                fontWeight: 600,
                fontSize: "0.975rem",
                lineHeight: 1.4,
                transition: "color 0.15s ease",
              }}
            >
              {todo.title}
            </Typography>

            {todo.description && (
              <Typography
                id={`todo-desc-${todo.id}`}
                variant="body2"
                sx={{
                  mt: 0.5,
                  wordBreak: "break-word",
                  color: todo.completed ? "#A1A1AA" : "#64748B",
                  textDecoration: todo.completed ? "line-through" : "none",
                  whiteSpace: "pre-line",
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                }}
              >
                {todo.description}
              </Typography>
            )}
          </Box>

          <Box
            id={`todo-actions-${todo.id}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flexShrink: 0,
              ml: 1,
            }}
          >
            <Tooltip title="Edit task">
              <IconButton
                id={`todo-edit-btn-${todo.id}`}
                size="small"
                onClick={handleStartEdit}
                aria-label={`Edit task "${todo.title}"`}
                sx={{
                  color: "#64748B",
                  "&:hover": { color: "#2563EB", backgroundColor: "#EFF6FF" },
                }}
              >
                <Pencil size={16} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete task">
              <IconButton
                id={`todo-delete-btn-${todo.id}`}
                size="small"
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete task "${todo.title}"`}
                sx={{
                  color: "#64748B",
                  "&:hover": { color: "#EF4444", backgroundColor: "#FEF2F2" },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
