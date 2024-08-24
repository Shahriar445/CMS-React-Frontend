import React from 'react';
import './App.css'; // Import your CSS styles
import FooterComponent from './assets/components/Footer';
import HeaderComponent from './assets/components/Header';
import SidebarComponent from './assets/components/Sidebar';
import PageContent from './Layout/content';

import { Space } from 'antd';
function App() {
  return (
    <>
 
<div className='App'>
<HeaderComponent/>
<Space className="SideMenuPageContent">
  <SidebarComponent></SidebarComponent>
  <PageContent></PageContent>
</Space>

<FooterComponent></FooterComponent>
</div>
    </>
 

    

  
  );
}

export default App;
