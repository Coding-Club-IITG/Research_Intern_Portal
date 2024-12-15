import React from 'react'


function ProfileCard(){
    return(
        <div className='ProfileCard' style={{
            display:"block",
            position:"relative",
            borderRadius:"8px",
            padding:"20px",
            margin:"5vh",
            backgroundColor:"#f8fcff",
            boxShadow:"2px 2px 10px 0 grey"

            }}>
            <div style={{
                width:"100px",
                height:"100px",
                
                border:"solid",
                borderColor:"blue",
                float:"left",
                
                }}>
            <img src='' style={{width:"100%",height:"100%"}}></img>
            </div>


                
                
            <p className="ProfileCardName" style={{
                fontSize:"40px",
                fontWeight:"400",
                marginLeft:"120px",
            }}>
                Name</p>

            <p className="ProfileCardCity" style={{
                fontSize:"15px",
                marginLeft:"120px",
            }}>
                Hyderabad</p>

            <span style={{
                position:"absolute",
                top:"1vw",
                right:"1.2vw",
            }}>
                <a href="" style={{paddingRight:"15px",color:'#7A288A'}}>View your public profile </a>
                <a href="" style={{color:'#7A288A'}}>Edit</a>
            </span>
        </div>
    );
}

export default ProfileCard;