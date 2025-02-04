import {MyToDoListContext} from "@/context/to_do_list_context.tsx";
import {useContext, useEffect, useState} from "react";
import Task from "@/types/to_do_list_types.ts";
import {format} from "date-fns";
import {updateTasksFromCache} from "@/helpers/getTasksFromCache.ts";

export default function useToDoListTask() {
  const [tasks, setTasks] = useContext(MyToDoListContext)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [showTodayTasks, setShowTodayTasks] = useState<string | boolean>(false)

  useEffect(() => {
    updateTasksFromCache(tasks)
  }, [tasks])

  // function getTaskById(id: string) {
  //   return tasks.find(task => task.id === id)
  // }

  function addTask(newTask: Task){
    setTasks([...tasks, newTask])
  }

  function deleteTask(id: string){
    setTasks(tasks.filter((task) => task.id != id))
  }

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, ...updatedTask}
          :task
      )
    )
  }

  const checkTask = (id: string) => {
    const newTasks: Task[] = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone
      }
      return task
    })
    setTasks(newTasks)
  }

  const handleFilteredTasks = (checked: string | boolean) => {
    setShowTodayTasks(checked)
    if (!showTodayTasks) {
      const today = new Date()
      const newFiltered: Task[] = tasks.filter((task) => format(task.date!, "PPP") === format(today, "PPP"))
      setFilteredTasks(newFiltered)
    } else {
      setFilteredTasks(tasks)
    }
    console.log(filteredTasks)
  }

  return {
    filteredTasks,
    showTodayTasks,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    handleFilteredTasks,
    checkTask,
  }

}