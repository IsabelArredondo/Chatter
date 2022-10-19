import React from 'react';
import { useSelector} from 'react-redux'
import './sidebar.css'


const SideBar = () => {
  const user = useSelector(state => state?.session?.user)

  return (
    
      <div className='SideBar'>
       
       <div className='trendingprogramer'>What's happening</div>
       <div className='gitandLinkedInContainer'>
            <div className='whotohire'>Who to hire</div>
            <a className = {"userLinkedInLink"} href={"https://github.com/IsabelArredondo"} ><i class="fa-brands fa-github gitHubicon"></i> <span className='sidebarname'>Isabel Arredondo</span> </a>
            <a className = {"userLinkedInLink"} href={"https://www.linkedin.com/in/IsabelArredondo-1107a9186"}><i class="fa-brands fa-linkedin-in linkedInIcon"></i> <span className='sidebarname'>Isabel Arredondo</span> </a>
            

        </div>
      </div>
    
  );
}

export default SideBar;
