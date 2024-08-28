import react from 'react'
import ProfileCard from './ProfileCard'
import RecommendedJobs from './RecommendedJobs'
import RecentlyApplied from './RecentlyApplied'
import FollowedStartups from './FollowedStartups'

const Home=()=>{
    return(   
        <>
        <ProfileCard/>
        <RecommendedJobs/>
        <RecentlyApplied/>
        <FollowedStartups/>
        </>          
    )
}

export default Home