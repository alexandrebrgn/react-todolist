import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'
import {format} from 'date-fns';
import {cn} from "@/utils";
import Task, {Importance} from "@/types/to_do_list_types.ts";
import {CalendarMinus, CheckSquare, CircleSolid, Square, TextAlignLeft, Tool, TrashTwo} from "@mynaui/icons-react";
import useToDoListTask from "@/hooks/to_do_list_hook.ts";

export default function TaskTable()
{
  const {tasks, updateTaskText, deleteTask, checkTask, showTodayTasks, filteredTasks} = useToDoListTask()

  return (

  <div className="">
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead className="header justify-center">
            <Tool className="!size-5 "/>
          </TableHead>
          <TableHead className="w-1/5">
            <div className="flex items-center header">
              <CalendarMinus className="!size-5"/>
              Date Limite
            </div>
          </TableHead>
          <TableHead className="min-w-14">
            <div className="header !ml-3">
              <TextAlignLeft className="!size-5"/>
              Nom de la tâche
            </div>
          </TableHead>
          <TableHead className="w-[100px] text-right">
            <div className="header">
              <Tool className="!size-5"/>
              Actions
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      {(showTodayTasks ? filteredTasks : tasks).length != 0 ?
        <TableBody> {(showTodayTasks ? filteredTasks : tasks).map((task: Task) => (
            <TableRow className={task.isDone ? "line-through text-zinc-300 text-center" : ""} key={task.id}>

              {/* Priorité */}

              <TableCell className="">
                {
                  task.isDone ? <CircleSolid className="!size-4 text-gray-200 m-auto"/>
                    : task.importance === Importance.Banal ? <CircleSolid className=" !size-4 text-green-500 m-auto"/>
                      : task.importance === Importance.Important ?
                        <CircleSolid className=" !size-4 text-orange-500 m-auto"/>
                        : <CircleSolid className=" !size-4 text-red-500 m-auto"/>
                }
              </TableCell>

              {/* Date limite */}

              <TableCell
                className="font-medium !duration-0 text-left">{format(task.date!, "dd MMM yyyy")}
              </TableCell>

              {/* Nom de la tâche */}

              <TableCell
                className={cn(
                  'text-left',
                  task.isDone && 'line-through text-gray-300'
                )}
              >
                <Input
                  onChange={(e) => (updateTaskText(task.id, e.target.value))} value={task.text}
                  className="border-none !shadow-none">
                </Input>
              </TableCell>

              {/* Actions Boutons */}

              <TableCell className="flex gap-3 text-right items-center justify-center h-full">
                <Button
                  variant="outline"
                  size="icon"
                  className="action-button !border-red-600"
                  onClick={() => deleteTask(task.id)}>
                  <TrashTwo className="text-red-600"/>
                </Button>
                {task.isDone
                  ?
                  <Button variant="outline" size="icon" className="action-button !border-blue-600"
                          onClick={() => checkTask(task.id)}><CheckSquare
                    className="text-blue-600"/>
                  </Button>
                  :
                  <Button variant="outline" size="icon" className="action-button !border-blue-600"
                          onClick={() => checkTask(task.id)}><Square
                    className="text-blue-600"/>
                  </Button>
                }
              </TableCell>
            </TableRow>
          )
        )}
        </TableBody>
        : <TableCaption className="text-1xl">Votre To-Do List est vide. Ajoutez votre première
          tâche! 🔥</TableCaption>
      }
    </Table>
  </div>
  )
}