import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";

//@ts-ignore
function SendMoney({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center gap-4 w-full py-1.5 px-4 rounded-sm shadow-sm bg-neutral-100 duration-200">
        <div className="flex items-center gap-2">
            <div className="cursor-pointer rounded-full bg-neutral-900 w-8 h-8 flex items-center justify-center text-lg text-white">{user.firstName.charAt(0).toUpperCase()}</div>
            <div className="font-medium text-sm truncate w-[160px] overflow-hidden">{user.firstName} {user.lastName}</div>
        </div>
        <Button variant="default" size="sm" onClick={() => { navigate("/transfer?id=" + user.userId + "&name=" + user.firstName + " " + user.lastName) }} className="text-xs cursor-pointer">pay</Button>
    </div>
  )
}

export default SendMoney