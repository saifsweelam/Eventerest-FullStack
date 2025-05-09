import { Navigate, Outlet } from "react-router";
import PageIllustration from "../../components/page-illustration";
import { useAuth } from "../../providers/authProvider";

export default function AuthLayout() {
    const { user } = useAuth();

    if (user) return <Navigate to="/" />;

    return (
        <main className="relative flex grow flex-col">
            <PageIllustration multiple />

            <Outlet />
        </main>
    );
}
