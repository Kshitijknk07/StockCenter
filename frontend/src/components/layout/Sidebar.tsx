export function Sidebar() {
  return (
    <aside className="w-64 border-r border-white bg-black p-4 h-[calc(100vh-64px)]">
      <nav className="space-y-2">
        <div className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-black cursor-pointer">
          Dashboard
        </div>
        <div className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-black cursor-pointer">
          Stock Search
        </div>
        <div className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white hover:text-black cursor-pointer">
          Market Status
        </div>
      </nav>
    </aside>
  );
}
