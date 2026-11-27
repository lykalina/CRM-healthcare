import { Outlet } from "react-router-dom";
import Menu from "../shared/components/Menu/Menu";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import { useMenuToggle } from "../pages/HomePage/useMenuToggle.ts";

export default function MainLayout() {
    const { isOpen, toggle } = useMenuToggle();

    return (
        <div className="bg-bg-primary min-h-screen">
            <Menu isOpen={isOpen} onToggle={toggle} />

            <main
                className={`px-[16px] lg:pr-[20px] pb-[72px] lg:pb-[28px] transition-[padding] duration-300 ease-in-out ${
                    isOpen ? "lg:pl-[220px]" : "lg:pl-[120px]"
                } lg:mr-[100px]`}
            >
                <Outlet />
            </main>

            <Sidebar />
        </div>
    );
}