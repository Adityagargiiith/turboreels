import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import SingleVideoSection from '../components/SingleVideoSection';
import AffiliatePage from '../components/Affiliate_Page';
import AutoUpload from '../components/AutoUploadSection';
import ReelPage from '../components/View_all_reels';
import LibraryPage  from '../components/Library_Page';
import Guide2 from '../components/guide_2';
// import Guide from './Guide';
// import Guide
//  from './Guide';
import Guide from '../components/Guide';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => { 
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]
  
  
  )
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md-w-56">
        {/*Sidebar*/}
        <DashSidebar />
      </div>

      {/*profile*/}
      {tab === "profile" && <DashProfile />}

      {/*posts*/}
      {tab === "posts" && <DashPosts />}

      {/*users */}
      {tab === "users" && <DashUsers />}

      {/*comments */}
      {tab === "comments" && <DashComments />}

      {/*dashboard comp*/}
      {tab==="dash" && <DashboardComp/>}

      {/*dashboard comp*/}
      {tab==="singleVideo" && <SingleVideoSection/>}
      
      {tab==="affiliate" && <AffiliatePage/>}
      {tab==="autoUpload" && <AutoUpload/>}
      {tab==="reels" &&  <ReelPage/>}
      {tab==="guide" && <Guide/>}
      {tab==="library" && <LibraryPage/>}
      {tab==="guide2" && <Guide2/>}



    </div>
  );
}
