function Footer() {
  return (
    <div className="flex gap-8 justify-center items-center px-8 py-4 border-t border-t-gray-200 shadow-2xl w-full bg-blue-100">
        <img src={'/logo-black.png'} className="h-6"></img>
        <div className="text-xs select-none font-semibold flex items-center justify-center gap-1"><span className="text-base">&copy;</span> Aryan Gusain {new Date().getFullYear()}</div>
    </div>
  )
}
export default Footer