import React from 'react'
import {CloseCircleOutlined,} from '@ant-design/icons';
import { Button } from "antd";

const RecentlyApplied=()=>{
    return(

        <div style={{
            display:"block",
            position:"relative",
            borderRadius:"8px",
            padding:"20px",
            margin:"5vh",
            backgroundColor:"#f8fcff",
            boxShadow:"2px 2px 10px 0 grey"
            
        }}>
        <p style={{fontWeight:"400",fontSize:"19px"}}>Recently Applied jobs</p>
        <CloseCircleOutlined style={{
            display:'block',
            
        }}/>

        <div style={{display:'block',textAlign:'center',}}>
            <Button type='primary' size='middle' shape='round' icon='Browse Jobs' style={{backgroundColor:'black',color:'white',fontWeight:'450'}}/>

        </div>
    </div>
    )
}

export default RecentlyApplied