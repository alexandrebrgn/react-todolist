import {Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption} from '@/components/ui/table';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input'
import {format} from 'date-fns';
import {cn} from "@/utils";
import Task, {Priority} from "@/types/to_do_list_types.ts";
import {
  CalendarMinus,
  CheckSquare,
  CircleSolid,
  Edit,
  Pin,
  Square,
  TextAlignLeft,
  Tool,
  TrashTwo
} from "@mynaui/icons-react";
import useToDoListTask from "@/hooks/to_do_list_hook.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import IconForImportance from "@/helpers/IconForImportance.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {PopoverClose} from "@radix-ui/react-popover";

export default function TaskTable() {
  const {tasks, updateTask, deleteTask, checkTask, showTodayTasks, filteredTasks} = useToDoListTask()
  const [updateDate, setUpdateDate] = useState<Date | undefined>()

  const handleUpdateTask = (id :string) => (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    const task: Partial<Task> = {
      priority: formData.get("importance") as Priority,
      date: updateDate,
      text: formData.get("text") as string,
    }

    updateTask(id, task)
    setUpdateDate(undefined)
  }

  return (

    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="header justify-center">
              <Pin className="!size-5 "/>
            </TableHead>
            <TableHead className="w-1/5">
              <div className="flex items-center header">
                <CalendarMinus className="!size-5"/>
                Date Limite
              </div>
            </TableHead>
            <TableHead className="min-w-14">
              <div className="header">
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
              <Popover onOpenChange={() => setUpdateDate(task.date)}>
                <PopoverTrigger asChild>
                  <TableRow className={task.isDone ? "line-through text-zinc-300 text-center" : ""} key={task.id}>

                    {/* Priorité */}

                    <TableCell className="">
                      {
                        task.isDone ? <CircleSolid className="!size-4 text-gray-200 m-auto"/>
                          : task.priority === Priority.Banal ?
                            <CircleSolid className=" !size-4 text-green-500 m-auto"/>
                            : task.priority === Priority.Important ?
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
                      {task.text}
                    </TableCell>

                    {/* Actions Boutons */}

                    <TableCell className="flex gap-3 text-right items-center justify-center h-full ">
                      <Button
                        variant="outline"
                        size="icon"
                        className="action-button !border-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteTask(task.id)
                        }}>
                        <TrashTwo className="text-red-600"/>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="action-button !border-blue-600"
                        onClick={(e) => {
                          e.stopPropagation(); // Empêche le déclenchement du Popover
                          checkTask(task.id);
                        }}>
                        {task.isDone ? <CheckSquare className="text-blue-600"/> : <Square className="text-blue-600"/>}
                      </Button>

                    </TableCell>
                  </TableRow>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <form onSubmit={handleUpdateTask(task.id)}>
                    <div className="grid gap-3">
                      <div className="flex gap-2 font-bold items-center">
                        <Edit></Edit>
                        <h1 className="text-xl">Modifier une tâche</h1>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="flex flex-row items-center gap-1">
                          <Pin className="size-5"/>
                          <Label>
                            Importance
                          </Label>
                        </div>
                        <Select name="importance"
                                defaultValue={task.priority}>
                          <SelectTrigger className="col-span-2 h-8 text-left">
                            <SelectValue placeholder="Priorité"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {(Object.keys(Priority) as Array<keyof typeof Priority>).map((imp) => (
                                <SelectItem value={imp} key={imp}>
                                  <div
                                    className="flex align-middle items-center gap-2">{IconForImportance(imp)}{imp}</div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="flex flex-row items-center gap-1">
                          <CalendarMinus className="size-5"/>
                          <Label>
                            Date limite
                          </Label>
                        </div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="col-span-2 h-8 text-left">
                              {updateDate ? format(updateDate, "MM/dd/yyyy") : "Choisir une date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Calendar
                              mode="single"
                              selected={updateDate ? updateDate : task.date}
                              onSelect={setUpdateDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="flex flex-row items-center gap-1">
                          <TextAlignLeft className="size-5"/>
                          <Label>
                            Nom de la tâche
                          </Label>
                        </div>
                        <Input
                          // id="text"
                          name="text"
                          className="col-span-2 h-8"
                          defaultValue={task.text}
                        />
                      </div>
                      <PopoverClose asChild>
                        <div className="w-full">
                          <Button className="!bg-green-800 w-full" type="submit">Confirmer</Button>
                        </div>
                      </PopoverClose>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>
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