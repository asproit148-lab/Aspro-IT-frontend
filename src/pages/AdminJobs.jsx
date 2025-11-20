import AdminHeader from "../components/admin/AdminHeader";
import JobManagement from '../components/admin/JobManagement';

export default function AdminJobs() {
  return (
    <div className="relative">
      <AdminHeader />
      <JobManagement />
    </div>
  );
}
