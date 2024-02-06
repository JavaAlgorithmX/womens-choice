import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout({cart}){
    return(
        <div>
            <Header cart={cart}/>
            <main className="">
                <Outlet/>
            </main>
        </div>
    );
}