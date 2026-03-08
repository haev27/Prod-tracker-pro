import { LayoutGrid, Factory, Settings } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 md:relative md:flex md:flex-col md:h-screen md:w-24 bg-industrial-dark border-t md:border-t-0 md:border-r border-white/10 p-4 flex justify-around items-center z-40">
            <div className="hidden md:block mb-8">
                <div className="w-12 h-12 bg-industrial-accent rounded-xl flex items-center justify-center">
                    <Factory className="text-black" size={24} />
                </div>
            </div>

            <div className="flex md:flex-col gap-8 md:gap-12">
                <NavItem icon={<LayoutGrid size={28} />} active />
                <NavItem icon={<ClipboardList size={28} />} />
                <NavItem icon={<Settings size={28} />} />
            </div>
        </nav>
    );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
    return (
        <button className={`p-4 rounded-2xl transition-all ${active ? 'bg-industrial-accent text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'text-gray-500 hover:bg-white/5'}`}>
            {icon}
        </button>
    );
}

import { ClipboardList } from 'lucide-react';
