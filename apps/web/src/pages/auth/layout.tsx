import { Outlet } from "react-router";
import PageIllustration from "../../components/page-illustration";

export default function AuthLayout() {
    return (
        <main className="relative flex grow flex-col">
            <PageIllustration multiple />

            <Outlet />
        </main>
    );
}
