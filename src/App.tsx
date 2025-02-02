import {ThemeProvider} from "./components/theme-provider.tsx";
import TaskTable from "@/components/components/TaskTable.tsx";
import TaskStore from "@/components/components/TaskStore.tsx";
import PageHeader from "@/components/components/PageHeader.tsx";
import PageFooter from "@/components/components/PageFooter.tsx";
import ToDoListTitle from "@/components/components/ToDoListTitle.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <PageHeader/>
        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute top-0 translate-y-full">
            <ToDoListTitle/>
          </div>
          <div className="flex flex-col gap-6 max-w-2xl min-h-96 w-full border text-center p-7 rounded-lg shadow-lg">
            <TaskTable/>
            <TaskStore/>
          </div>
        </div>
        <PageFooter/>
      </div>
    </ThemeProvider>
  );
}

export default App