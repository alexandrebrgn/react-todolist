import {ModeToggle} from "@/components/ui/modeToggle.tsx";
import {CheckSquare} from "@mynaui/icons-react";

const PageHeader = () => (
  <>
    <div className="absolute top-0 right-0 p-7 z-10">
      <ModeToggle />
    </div>
    <div className="absolute top-0 left-0 p-7">
      <CheckSquare/>
    </div>
  </>
)

export default PageHeader