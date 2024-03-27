import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/footer";

export default function AppLayout(){
    return(
        <div>
            <Header />
            <main className="mb-20">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}