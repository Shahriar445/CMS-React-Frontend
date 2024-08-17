

import AdminDashboard from '../components/AdminDashboard/AdminDashboard.jsx';
import '../CSS/AdminDashboard.css'; // Import general styles
import Header from '../components/Common/header.jsx';
import Footer from '../components/Common/footer.jsx';
import Sidebar from '../components/AdminDashboard/SideBar.jsx';
const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard-page">
      <Header title="Admin"/>
      <main>
<Sidebar/>
      <AdminDashboard/>
      </main>
      <Footer/>
    </div>
  );
};

export default AdminDashboardPage;
