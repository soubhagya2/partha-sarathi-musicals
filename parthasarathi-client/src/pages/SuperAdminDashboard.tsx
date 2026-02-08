import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldAlert,
  Users,
  Activity,
  Lock,
  CheckCircle2,
  XCircle,
  Save,
  Search,
  Settings,
  RefreshCw,
  Trash2,
} from "lucide-react";
import Header from "../components/layout/Header";
import { adminService } from "../services/adminService";
import { toast } from "sonner";

interface AdminUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastLogin?: string;
  isActive?: boolean;
}

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: "0",
    health: "0%",
    security: "Inactive",
  });
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
  });

  const fetchData = async () => {
    try {
      const [statsData, adminsData] = await Promise.all([
        adminService.getSystemStats(),
        adminService.getAllAdmins(),
      ]);
      setStats(statsData);
      setAdmins(adminsData);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
      toast.error("Failed to load system data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allPermissions = [
    { id: "user:write", label: "Manage Users" },
    { id: "product:write", label: "Manage Products" },
    { id: "order:update", label: "Manage Orders" },
    { id: "payment:refund", label: "Process Refunds" },
    { id: "support:reply", label: "Support Access" },
    { id: "role:manage", label: "Manage Roles" },
  ];

  const filteredAdmins = useMemo(() => {
    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [admins, searchTerm]);

  const togglePermission = (adminId: string, permissionId: string) => {
    setAdmins((prev) =>
      prev.map((admin) => {
        const id = admin._id || admin.id;
        if (id === adminId) {
          const hasPermission = admin.permissions.includes(permissionId);
          return {
            ...admin,
            permissions: hasPermission
              ? admin.permissions.filter((p: string) => p !== permissionId)
              : [...admin.permissions, permissionId],
          };
        }
        return admin;
      }),
    );
  };

  const handleSaveAll = async () => {
    try {
      const updatePromises = admins
        .filter((admin) => admin._id || admin.id)
        .map((admin) =>
          adminService.updateAdminPermissions(
            (admin._id || admin.id) as string,
            admin.permissions,
          ),
        );
      await Promise.all(updatePromises);
      toast.success("All permissions synchronized successfully");
    } catch (error) {
      toast.error("Failed to save some changes");
    }
  };

  const handleSaveSingle = async (admin: AdminUser) => {
    try {
      const adminId = admin._id || admin.id;
      if (!adminId) {
        toast.error("Admin ID not found");
        return;
      }
      await adminService.updateAdminPermissions(adminId, admin.permissions);
      toast.success(`Permissions updated for ${admin.name}`);
    } catch (error) {
      toast.error(`Failed to update permissions for ${admin.name}`);
    }
  };

  const handleRevoke = async (adminId: string) => {
    if (
      window.confirm(
        "Are you sure you want to revoke all access for this user?",
      )
    ) {
      try {
        await adminService.revokeAccess(adminId);
        setAdmins((prev) => prev.filter((a) => (a._id || a.id) !== adminId));
        toast.success("Access revoked successfully");
      } catch (error) {
        toast.error("Failed to revoke access");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Helmet>
        <title>Super Admin | Parthasarathi Musical</title>
      </Helmet>
      <Header />

      <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-10">
          <div className="size-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-200">
            <ShieldAlert className="size-8" />
          </div>
          <div>
            <h1 className="font-helper text-4xl font-semibold text-slate-900">
              Super Admin Control
            </h1>
            <p className="text-slate-500 font-ui text-sm uppercase tracking-widest font-bold">
              System-Wide Authority
            </p>
          </div>
          <button
            onClick={fetchData}
            className="ml-auto p-3 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <RefreshCw className={`size-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Super Powers Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-blue-600 size-6" />
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Total Platform Users
            </p>
            <p className="text-3xl font-helper font-semibold text-slate-900">
              {stats.users}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="text-orange-600 size-6" />
              <span className="text-xs font-bold text-slate-400">Stable</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              System Health
            </p>
            <p className="text-3xl font-helper font-semibold text-slate-900">
              {stats.health}
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Lock className="text-red-600 size-6" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Security Protocols
            </p>
            <p className="text-3xl font-helper font-semibold text-slate-900">
              {stats.security}
            </p>
          </div>
        </div>

        {/* System Configuration */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-slate-900 size-6" />
              <h2 className="font-helper text-xl font-semibold text-slate-900">
                Global Settings
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50">
                <div>
                  <p className="font-ui font-bold text-sm text-slate-900">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-slate-500">
                    Disable public access to the store
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSystemSettings((prev) => ({
                      ...prev,
                      maintenanceMode: !prev.maintenanceMode,
                    }))
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${systemSettings.maintenanceMode ? "bg-red-600" : "bg-slate-300"}`}
                >
                  <div
                    className={`absolute top-1 size-4 bg-white rounded-full transition-all ${systemSettings.maintenanceMode ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-helper text-xl font-semibold mb-2">
                Security Audit
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Last system-wide security scan completed 2 hours ago. No
                vulnerabilities detected.
              </p>
              <button className="bg-white text-slate-900 px-6 py-2 rounded-lg font-bold text-xs hover:bg-red-600 hover:text-white transition-all">
                View Audit Logs
              </button>
            </div>
            <Lock className="absolute -bottom-4 -right-4 size-32 text-white/5 rotate-12" />
          </div>
        </section>

        {/* Admin Access Management */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-slate-50/50">
            <div>
              <h2 className="font-helper text-2xl font-semibold text-slate-900">
                Administrative Access Control
              </h2>
              <p className="text-slate-500 text-sm">
                Define granular permissions for your staff and administrators.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:border-slate-900 text-sm font-ui w-64"
                />
              </div>
              <button
                onClick={handleSaveAll}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-600 transition-all"
              >
                <Save className="size-4" /> Save All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Administrator
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Role
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Granular Permissions
                  </th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-12 text-center text-slate-400 font-ui"
                    >
                      Initializing secure connection...
                    </td>
                  </tr>
                ) : filteredAdmins.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-12 text-center text-slate-400 font-ui"
                    >
                      No administrative users found.
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr
                      key={admin._id || admin.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                            {admin.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-ui font-bold text-slate-900">
                              {admin.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {admin.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                            admin.role === "ADMIN"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-wrap gap-2 max-w-md">
                          {allPermissions.map((perm) => {
                            const adminId = admin._id || admin.id;
                            return (
                              <button
                                key={perm.id}
                                disabled={!adminId}
                                onClick={() =>
                                  adminId && togglePermission(adminId, perm.id)
                                }
                                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                                  admin.permissions.includes(perm.id)
                                    ? "bg-slate-900 border-slate-900 text-white"
                                    : "bg-white border-slate-200 text-slate-400 hover:border-slate-900 hover:text-slate-900"
                                }`}
                              >
                                {admin.permissions.includes(perm.id) ? (
                                  <CheckCircle2 className="size-3" />
                                ) : (
                                  <XCircle className="size-3" />
                                )}
                                {perm.label}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-4">
                          <button
                            onClick={() => handleSaveSingle(admin)}
                            className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all"
                            title="Save changes for this user"
                          >
                            <Save className="size-4" />
                          </button>
                          <button
                            onClick={() => {
                              const adminId = admin._id || admin.id;
                              if (adminId) handleRevoke(adminId);
                            }}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
                            title="Revoke access"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
