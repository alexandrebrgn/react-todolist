type Task = {
  id: string,
  text: string,
  date: Date | undefined,
  priority: Priority | undefined,
  isDone: boolean,
}

export enum Priority{
  Urgent = "Urgent",
  Important = "Important",
  Banal = "Banal",
}

export default Task