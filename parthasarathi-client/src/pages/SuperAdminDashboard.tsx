import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldAlert,
  Users,
  Activity,
  Lock,
  CheckCircle2,
  XCircle,
  Save,
} from "lucide-react";
import Header from "../components/layout/Header";
import { adminService } from "../services/adminService";
import { toast } from "sonner";

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    users: "0",
    health: "0%",
    security: "Inactive",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getSystemStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch system stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Mock data for administrative users
  const [admins, setAdmins] = useState([
    {
      id: "1",
      name: "Admin One",
      email: "admin1@parthasarathi.com",
      role: "ADMIN",
      permissions: ["product:write", "order:read"],
    },
    {
      id: "2",
      name: "Support Lead",
      email: "support@parthasarathi.com",
      role: "SUPPORT",
      permissions: ["support:reply", "support:read"],
    },
  ]);

  const allPermissions = [
    { id: "user:write", label: "Manage Users" },
    { id: "product:write", label: "Manage Products" },
    { id: "order:update", label: "Manage Orders" },
    { id: "payment:refund", label: "Process Refunds" },
    { id: "support:reply", label: "Support Access" },
    { id: "role:manage", label: "Manage Roles" },
  ];

  const togglePermission = (adminId: string, permissionId: string) => {
    setAdmins((prev) =>
      prev.map((admin) => {
        if (admin.id === adminId) {
          const hasPermission = admin.permissions.includes(permissionId);
          return {
            ...admin,
            permissions: hasPermission
              ? admin.permissions.filter((p) => p !== permissionId)
              : [...admin.permissions, permissionId],
          };
        }
        return admin;
      }),
    );
  };

  const handleSaveAll = async () => {
    try {
      const updatePromises = admins.map((admin) =>
        adminService.updateAdminPermissions(admin.id, admin.permissions),
      );
      await Promise.all(updatePromises);
      toast.success("All permissions synchronized successfully");
    } catch (error) {
      toast.error("Failed to save some changes");
    }
  };

  const handleRevoke = async (adminId: string) => {
    if (
      window.confirm(
        "Are you sure you want to revoke all access for this user?",
      )
    ) {
      await adminService.revokeAccess(adminId);
      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
      toast.success("Access revoked");
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
            <h1 className="font-brand text-4xl text-slate-900">
              Super Admin Control
            </h1>
            <p className="text-slate-500 font-ui text-sm uppercase tracking-widest font-bold">
              System-Wide Authority
            </p>
          </div>
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
            <p className="text-3xl font-brand text-slate-900">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="text-orange-600 size-6" />
              <span className="text-xs font-bold text-slate-400">Stable</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              System Health
            </p>
            <p className="text-3xl font-brand text-slate-900">{stats.health}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <Lock className="text-red-600 size-6" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Security Protocols
            </p>
            <p className="text-3xl font-brand text-slate-900">
              {stats.security}
            </p>
          </div>
        </div>

        {/* Admin Access Management */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="font-brand text-2xl text-slate-900">
                Administrative Access Control
              </h2>
              <p className="text-slate-500 text-sm">
                Define granular permissions for your staff and administrators.
              </p>
            </div>
            <button
              onClick={handleSaveAll}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-600 transition-all"
            >
              <Save className="size-4" /> Save All Changes
            </button>
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
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
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
                        {allPermissions.map((perm) => (
                          <button
                            key={perm.id}
                            onClick={() => togglePermission(admin.id, perm.id)}
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
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleRevoke(admin.id)}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
