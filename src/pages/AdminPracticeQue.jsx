import AdminHeader from "../components/admin/AdminHeader";
import PracticeQueManagement from '../components/admin/PracticeQueManagement'

export default function AdminResource() {
  return (
    <div className="relative">
      <AdminHeader />
      <PracticeQueManagement />
    </div>
  );
}
