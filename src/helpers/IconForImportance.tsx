import {Priority} from "@/types/to_do_list_types.ts";
import {CircleSolid} from "@mynaui/icons-react";

export default function IconForPriority(imp: string | undefined) {
  if (imp == Priority.Banal) {
    return <CircleSolid className="!size-3 text-green-500"/>
  }
  if (imp == Priority.Important) {
    return <CircleSolid className="!size-3 text-orange-500"/>
  }
  if (imp == Priority.Urgent) {
    return <CircleSolid className="!size-3 text-red-500"/>
  }
  if (!imp) {
    return <CircleSolid className="!size-3 text-pink"/>
  }
}