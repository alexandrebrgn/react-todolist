import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import Task from "@/types/to_do_list_types.ts";
import {getTasksFromCache} from "@/helpers/getTasksFromCache.ts";

// Créer le contexte
export const MyToDoListContext = createContext<[Task[], Dispatch<SetStateAction<Task[]>>]>(null as never)

export function MyToDoListProvider(props: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>(getTasksFromCache)

  return (
    <MyToDoListContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </MyToDoListContext.Provider>
  )
}