"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from 'lucide-react'

interface Task {
  id: number
  text: string
}

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <h1 className="text-2xl font-bold text-center">Todo List App</h1>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-2 mt-8">
      <p className="text-center text-sm">&copy; 2023 Todo List App. All rights reserved.</p>
    </footer>
  )
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim() }])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (task: Task) => {
    setEditingTask(task)
  }

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ))
      setEditingTask(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <form onSubmit={addTask} className="mb-4 flex gap-2">
          <Input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
            className="flex-grow"
          />
          <Button type="submit">Add Task</Button>
        </form>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center gap-2 bg-secondary p-2 rounded">
              {editingTask && editingTask.id === task.id ? (
                <form onSubmit={updateTask} className="flex-grow flex gap-2">
                  <Input
                    type="text"
                    value={editingTask.text}
                    onChange={(e) => setEditingTask({...editingTask, text: e.target.value})}
                    className="flex-grow"
                  />
                  <Button type="submit">Update</Button>
                </form>
              ) : (
                <>
                  <span className="flex-grow">{task.text}</span>
                  <Button variant="ghost" size="icon" onClick={() => startEditing(task)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

