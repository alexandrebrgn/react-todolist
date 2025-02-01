import Task from "@/types/to_do_list_types.ts";

const CACHE_NAME : string = "My_To_Do_List_Cache"

export function getTasksFromCache() {
    const tasksFromCache = localStorage.getItem(CACHE_NAME)
    if (tasksFromCache && tasksFromCache != "undefined")
        return JSON.parse(tasksFromCache)
    return []
}

export function updateTasksFromCache(tasks : Task[]) {
    localStorage.setItem(CACHE_NAME, JSON.stringify(tasks))
}