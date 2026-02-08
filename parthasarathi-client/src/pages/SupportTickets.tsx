import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import Header from "../components/layout/Header";

const SupportTickets = () => {
  const tickets = [
    {
      id: "T-1001",
      customer: "Rahul Sharma",
      subject: "Order #PSM-82910 Delay",
      date: "24 Oct 2023",
      status: "Open",
      priority: "High",
    },
    {
      id: "T-1002",
      customer: "Meera Bai",
      subject: "Custom Flute Inquiry",
      date: "23 Oct 2023",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: "T-1003",
      customer: "John Doe",
      subject: "Refund Request",
      date: "22 Oct 2023",
      status: "Closed",
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf5] flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <aside className="w-64 bg-white border-r border-amber-100 hidden md:flex flex-col p-6">
          <nav className="space-y-2">
            <Link
              to="/support/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-900/60 hover:bg-amber-50 font-ui font-bold text-sm transition-all"
            >
              <LayoutDashboard className="size-4" /> Dashboard
            </Link>
            <Link
              to="/support/tickets"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-950 text-white font-ui font-bold text-sm"
            >
              <MessageSquare className="size-4" /> Tickets
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-amber-900/60 hover:bg-amber-50 font-ui font-bold text-sm transition-all"
            >
              <Package className="size-4" /> Orders
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8 lg:p-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="font-helper text-3xl font-semibold text-amber-950">
              Customer Tickets
            </h1>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 bg-white text-sm font-ui font-bold text-amber-900 hover:bg-amber-50 transition-all">
              <Filter className="size-4" /> Filter
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-amber-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-50/50 border-b border-amber-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">
                    Ticket ID
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">
                    Priority
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-amber-50/20 transition-colors group"
                  >
                    <td className="px-6 py-4 font-ui font-bold text-xs text-amber-950">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 font-ui text-sm text-amber-900">
                      {ticket.customer}
                    </td>
                    <td className="px-6 py-4 font-ui text-sm text-amber-800/70">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                          ticket.status === "Open"
                            ? "bg-green-100 text-green-600"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold ${ticket.priority === "High" ? "text-red-500" : "text-amber-400"}`}
                      >
                        ● {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-amber-200 group-hover:text-amber-950 transition-colors">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportTickets;
