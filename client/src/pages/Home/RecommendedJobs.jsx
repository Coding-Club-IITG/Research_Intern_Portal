import React from 'react'
import Jobs from "./Jobs"
import { Button } from "antd";

const RecommendedJobs=()=>{
    return(
        <div className='RecommendedJobs' style={{
            display:"block",
            position:"relative",
            borderRadius:"8px",
            padding:"20px",
            margin:"5vh",
            backgroundColor:"#f8fcff",
            boxShadow:"1px 1px 10px 0 grey",
            clear:"left",
        }}>
            <p style={{fontWeight:"400",fontSize:"19px"}}>Recommended Jobs</p>
            <p style={{fontSize:"14px",color:"grey"}}>Jobs where you are a top applicant based on your job search</p>

            <a href="" style={{
                position:'absolute',
                top:"1vw",
                right:"1.2vw",
                color:'#7A288A',
            }}>Change Job preferences</a>

            <Jobs/>

            <hr></hr>
            <p style={{
                textAlign:"center",
                margin:"5px",
            }}>

            <div style={{display:'block',textAlign:'center'}}>
                <Button type='primary' size='middle' shape='round' icon='See more jobs' style={{backgroundColor:'black',color:'white',fontWeight:'450'}}/>
            </div>
            </p>
        
        </div>
    );

}

export default RecommendedJobs