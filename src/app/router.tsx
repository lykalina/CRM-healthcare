import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/MainLayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<HomePage />} path="/" />
            </Route>
        </Routes>
    );
}