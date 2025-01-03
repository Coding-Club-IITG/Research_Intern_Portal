import react from 'react'
import { NavLink,Outlet } from "react-router-dom";
import Ongoing from './Ongoing';
import Archived from './Archived';

const Applied=()=>{
    return(
        <div  style={{
            display:"block",
            position:"relative",
            borderRadius:"8px",
            padding:"20px",
            margin:"5vh",
            backgroundColor:"#f8fcff",
            boxShadow:"2px 2px 10px 0 grey"

            }}>
            <p style={{
                fontSize:"40px",
                fontWeight:"400",
                marginLeft:"2.3vw",
            }}>Applications</p>

                <ul className="flex gap-8 font-xl mt-6 mb-2">
                    <li>
                        <NavLink
                        to="ongoing"
                        className={({ isActive }) =>
                            isActive
                        ? "text-blue-700 border-b-2 pb-2 border-blue-700"
                        : "text-gray-600"
                    }
                    exact
                    >
                            Ongoing
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                        to="archived"
                        className={({ isActive }) =>
                            isActive
                        ? "text-blue-700 border-b-2 pb-2 border-blue-700"
                        : "text-gray-600"
                    }
                    exact
                    >
                            Archived
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <Outlet/>
                </div>
        </div>
    );
}

export default Applied;