import React from 'react';
import { TabType } from '@/types';
import {
  LayoutDashboard,
  ShieldCheck,
  UploadCloud,
  Activity,
  Key,
  Building2,
  History,
  Settings,
  LogOut,
  X,
  CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onLogoutClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  onLogoutClick
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'signed-communications',
      label: 'Signed Communications',
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: 'upload-sign',
      label: 'Upload & Sign',
      icon: <UploadCloud className="w-5 h-5" />
    },
    {
      id: 'verification-activity',
      label: 'Verification Activity',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'signing-keys',
      label: 'Signing Keys',
      icon: <Key className="w-5 h-5" />
    },
    {
      id: 'institution-profile',
      label: 'Institution Profile',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      id: 'audit-log',
      label: 'Audit Log',
      icon: <History className="w-5 h-5" />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      <aside
        id="main-sidebar"
        className={`fixed left-0 top-0 h-full w-64 bg-[#f2f3fd] border-r border-[#c2c6d6]/30 shadow-xs flex flex-col py-6 px-4 z-50 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Portal Logo & Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2170e4] flex items-center justify-center shrink-0 shadow-sm shadow-[#2170e4]/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-[#0058be] leading-tight tracking-tight">
                Trustline Portal
              </h1>
              <p className="text-xs text-[#565e74] font-medium">Institutional Vault</p>
            </div>
          </div>
          <button
            id="close-mobile-sidebar-btn"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-[#565e74] hover:bg-[#e1e2ec]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-[#dae2fd] text-[#131b2e] font-semibold shadow-xs'
                    : 'text-[#424754] hover:bg-[#e1e2ec]/60 hover:text-[#191b23] hover:translate-x-1'
                }`}
              >
                <span className={`${isActive ? 'text-[#0058be]' : 'text-[#565e74]'}`}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Status & Logout */}
        <div className="mt-auto pt-4 border-t border-[#c2c6d6]/30 space-y-2">
          <div className="px-3 py-2 bg-white/60 rounded-lg border border-[#c2c6d6]/40 flex items-center justify-between text-xs text-[#565e74]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Vault Online</span>
            </div>
            <span className="font-mono text-[10px] text-[#0058be] bg-[#0058be]/10 px-1.5 py-0.5 rounded">
              v2.8.4
            </span>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={onLogoutClick}
            className="w-full flex items-center gap-3 px-3 py-2 text-[#424754] hover:bg-[#e1e2ec]/60 hover:text-[#dc2626] rounded-lg transition-colors text-sm font-medium text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
