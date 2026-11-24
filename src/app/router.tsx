import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />} path="/">

            </Route>
        </Routes>
    );
}