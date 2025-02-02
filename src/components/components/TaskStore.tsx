import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import Task, {Priority} from "@/types/to_do_list_types.ts";
import {BookmarkPlus} from "@mynaui/icons-react";
import useToDoListTask from "@/hooks/to_do_list_hook.ts";
import {useState} from "react";
import IconForImportance from "@/helpers/IconForImportance.tsx";

export default function TaskStore() {
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    text: '',
    priority: undefined,
    isDone: false,
    date: undefined
  })

  const {addTask, handleFilteredTasks} = useToDoListTask()

  const handleNewTaskChange = (
    key: keyof Task,
    value: string | Priority | Date | undefined
  ) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  };

  function handleAddTask() {
    addTask({...newTask, id: crypto.randomUUID()})

    setNewTask({
      id: '',
      text: '',
      priority: undefined,
      isDone: false,
      date: undefined
    })
  }

  return (
    <div className="flex flex-col gap-3 w-full mt-auto">
      <div className="w-full flex items-center gap-3">
        <Checkbox id="dates" onCheckedChange={(checked) => handleFilteredTasks(checked)}/>
        <label
          htmlFor="dates"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Afficher les dates du jour
        </label>
      </div>

      <div className="w-full flex gap-3 items-center justify-center">
        <Input
          placeholder="Titre de la tâche"
          value={newTask.text}
          onChange={(e) => handleNewTaskChange('text', e.target.value)}>
        </Input>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline">{newTask.date != undefined ? format(newTask.date, "MM/d/yyyy") : "Deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={newTask.date}
              onSelect={(e) => handleNewTaskChange('date', e)}
              className="rounded-md border shadow bg-popover"
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Select onValueChange={(e) => handleNewTaskChange('priority', e)} defaultValue={newTask.priority}>
          <SelectTrigger className="!w-4/6">
            <SelectValue placeholder="Priorité"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(Object.keys(Priority) as Array<keyof typeof Priority>).map((imp) => (
                <SelectItem value={imp} key={imp}>
                  <div className="flex align-middle items-center gap-2">{IconForImportance(imp)}{imp}</div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={newTask.text.length < 6 || newTask.date === undefined} onClick={handleAddTask}>Ajouter
          une
          tâche <BookmarkPlus/></Button>
      </div>
    </div>
  )
}