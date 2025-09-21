'use client'

import React, { useState, useEffect, useRef } from 'react'
import InputUI from '../components/ui/InputUI'
import ButtonUI from './ui/ButtonUI'

interface SubTask {
  text: string
}

interface Task {
  text: string
  completed: boolean
  subTasks: SubTask[]
}

const Main = () => {
  const [nameTask, setNameTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [openNewTask, setOpenNewTask] = useState<number | null>(null)
  const [subTaskName, setSubTaskName] = useState('')
  const tasksContainerRef = useRef<HTMLDivElement>(null)

  // Загружаем задачи из localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) setTasks(JSON.parse(storedTasks))
  }, [])

  // Добавление новой задачи
  const handleCreateTask = () => {
    if (!nameTask.trim()) return
    const newTasks = [...tasks, { text: nameTask, completed: false, subTasks: [] }]
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setNameTask('')
  }

  // Добавление подзадачи
  const handleCreateSubTask = (index: number) => {
    if (!subTaskName.trim()) return
    const newTasks = [...tasks]
    newTasks[index].subTasks.push({ text: subTaskName })
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setSubTaskName('')
    setOpenNewTask(null)
  }

  // Удаление задачи
  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  // Удаление подзадачи
  const removeSubTask = (taskIndex: number, subIndex: number) => {
    const newTasks = [...tasks]
    newTasks[taskIndex].subTasks.splice(subIndex, 1)
    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

  // Автопрокрутка вниз при добавлении задач
  useEffect(() => {
    if (tasksContainerRef.current) {
      tasksContainerRef.current.scrollTop = tasksContainerRef.current.scrollHeight
    }
  }, [tasks])

  return (
    <div className="flex gap-10 mt-10 justify-center">
      <div
        ref={tasksContainerRef}
        className="w-270 h-[600px] overflow-y-auto flex flex-col gap-4 p-2 border border-gray-300 rounded"
      >
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">Список задач пуст</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="flex flex-col gap-2 bg-gray-50 p-3 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <span
                  className={`font-bold text-lg ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.text}
                </span>
                <div className="flex gap-2 cursor-pointer">
                  <button
                    className="font-bold text-xl cursor-pointer"
                    onClick={() =>
                      setOpenNewTask(openNewTask === index ? null : index)
                    }
                  >
                    ➕
                  </button>
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeTask(index)}
                  >
                    ❌
                  </button>
                </div>
              </div>

              {/* Подзадачи */}
              {task.subTasks.map((sub, subIndex) => (
                <div
                  key={subIndex}
                  className="ml-4 flex justify-between items-center text-gray-700"
                >
                  <span>• {sub.text}</span>
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeSubTask(index, subIndex)}
                  >
                    ❌
                  </button>
                </div>
              ))}

              {/* Добавление подзадачи */}
              {openNewTask === index && (
                <div className="flex gap-2 mt-2">
                  <InputUI
                    placeholder="Новая подзадача"
                    value={subTaskName}
                    onChange={(e) => setSubTaskName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCreateSubTask(index)
                    }}
                    sx={{ flex: 1 }}
                  />
                  <ButtonUI text="➕" onClick={() => handleCreateSubTask(index)} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Форма добавления задачи */}
      <div className="flex flex-col gap-4 w-[300px]">
        <InputUI
          placeholder="Название задачи"
          value={nameTask}
          onChange={(e) => setNameTask(e.target.value)}
        />
        <ButtonUI text="Добавить" onClick={handleCreateTask} />
      </div>
    </div>
  )
}

export default Main
