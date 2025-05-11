import Footer from "../../components/footer";
import { Outlet } from "react-router";

export default function DefaultLayout() {
    return (
        <>
            <main className="relative flex grow flex-col">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}
