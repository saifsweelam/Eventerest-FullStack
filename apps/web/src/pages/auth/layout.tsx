import { Outlet } from "react-router"

const AuthLayout = () => {
    return (
        <>
            <h1>Authentication</h1>
            <Outlet />
        </>
    )
}

export default AuthLayout;