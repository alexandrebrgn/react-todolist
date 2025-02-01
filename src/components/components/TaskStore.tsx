import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import Task, {Importance} from "@/types/to_do_list_types.ts";
import {BookmarkPlus, CircleSolid} from "@mynaui/icons-react";
import useToDoListTask from "@/hooks/to_do_list_hook.ts";
import {useState} from "react";

function handleImportanceView(imp: string) {
  if (imp == Importance.Banal) {
    return <CircleSolid className="!size-3 text-green-500"/>
  }
  if (imp == Importance.Important) {
    return <CircleSolid className="!size-3 text-orange-500"/>
  }
  if (imp == Importance.Urgent) {
    return <CircleSolid className="! size-3 text-red-500"/>
  }
}

export default function TaskStore() {
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    text: '',
    importance: undefined,
    isDone: false,
    date: undefined
  })

  const {addTask, handleFilteredTasks} = useToDoListTask()

  const handleNewTaskChange = (
    key: keyof Task,
    value: string | Importance | Date | undefined
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
      importance: undefined,
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
        <Select onValueChange={(e) => handleNewTaskChange('importance', e)} defaultValue={newTask.importance}>
          <SelectTrigger className="!w-4/6">
            <SelectValue placeholder="Priorité"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {(Object.keys(Importance) as Array<keyof typeof Importance>).map((imp) => (
                <SelectItem value={imp} key={imp}>
                  <div className="flex align-middle items-center gap-2">{handleImportanceView(imp)}{imp}</div>
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