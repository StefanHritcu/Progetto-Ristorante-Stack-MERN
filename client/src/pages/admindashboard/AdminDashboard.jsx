import AdminHome from "../AdminHome"
import HeaderAdmin from "./components/headeradmin/HeaderAdmin"
import SecondHeaderAdmin from "./components/secondheaderadmin/SecondHeaderAdmin"

function AdminDashboard(){
    return(
        <>
        <div>
            {/* HEADER */}
            <HeaderAdmin/>
            <SecondHeaderAdmin/>

            {/* BODY */}
            <AdminHome/>
            
        </div>
        </>
    )
}
export default AdminDashboard