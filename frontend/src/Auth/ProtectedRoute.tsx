import axiosInstance from "@/axios/axiosInstance";
import { login, logout } from "@/redux/Slices/AuthSlice";
import { RootState } from "@/redux/store";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {

const dispatch=useDispatch()
const navigate=useNavigate()
    const auth = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        axiosInstance
            .get("/currentuser")
            .then((res) => {
                 dispatch(login(res.data.user));
            })
            .catch((error) => {
                console.error(error);
                dispatch(logout())
                navigate('/create',{replace:true})

            });
    }, []);
    if (auth.isUserauthenticated) {
        return <div>{children}</div>;
    } else {
        <Navigate to={'/create'} replace={true} />
    }
}
export default ProtectedRoute;
