import {CheckSquare, Clipboard} from "@mynaui/icons-react";

export default function ToDoListTitle() {
  return (
    <div className="flex gap-4 p-7 justify-center items-center">
      <Clipboard/>
      <h1 className="text-4xl font-bold">Ma To-Do List</h1>
      <CheckSquare/>
    </div>
  )
}