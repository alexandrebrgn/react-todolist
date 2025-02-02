import {Rainbow} from "@mynaui/icons-react";

const PageFooter = () => (
  <>
    <div className="absolute bottom-0 left-0 p-7 flex items-center justify-center gap-3">
      <Rainbow/>
      <p className="italic">Made by Alexandre Bourguignon</p>
    </div>
    <div className="absolute right-0 bottom-0 p-7 flex items-center justify-center">
      © {new Date().getFullYear()} No Rights Reserved
    </div>
  </>
)

export default PageFooter