type Task = {
  id: string,
  text: string,
  date: Date | undefined,
  isDone: boolean,
  importance: Importance | undefined
}

export enum Importance{
  Urgent = "Urgent",
  Important = "Important",
  Banal = "Banal",
}

export default Task