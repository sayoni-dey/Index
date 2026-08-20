import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Menu, CheckCircle2, ShieldAlert, KeyRound, ExternalLink, X } from 'lucide-react';
import { TabType } from '@/types';

interface HeaderProps {
  activeTab: TabType;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenMobileMenu: () => void;
  onOpenNewSignature: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  onOpenMobileMenu,
  onOpenNewSignature
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const getTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Institution Dashboard';
      case 'signed-communications':
        return 'Signed Communications';
      case 'upload-sign':
        return 'Cryptographic Signing Protocol';
      case 'verification-activity':
        return 'Verification Telemetry & Activity';
      case 'signing-keys':
        return 'Institutional Key Vault';
      case 'institution-profile':
        return 'SOA University Verified Identity';
      case 'audit-log':
        return 'Cryptographic Audit Trail';
      case 'settings':
        return 'Vault & Policy Configuration';
      default:
        return 'Institution Dashboard';
    }
  };

  return (
    <>
      <header
        id="top-app-bar"
        className="flex justify-between items-center px-4 lg:px-8 py-3.5 w-full bg-white/70 backdrop-blur-xl border-b border-[#c2c6d6]/30 sticky top-0 z-30 shadow-xs"
      >
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-[#565e74] hover:bg-[#e1e2ec]"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="text-xl font-bold text-[#0058be] tracking-tight truncate">
            {getTitle()}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center max-w-md w-full ml-8 relative group">
            <Search className="w-4 h-4 absolute left-3.5 text-[#727785] group-focus-within:text-[#0058be] transition-colors pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verification hashes, documents..."
              className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/40 rounded-lg py-2 pl-10 pr-4 text-sm text-[#191b23] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20 transition-all placeholder:text-[#727785]/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[#727785] hover:text-[#191b23]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <div className="relative">
            <button
              id="notifications-btn"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowHelp(false);
                setShowProfile(false);
              }}
              className="w-10 h-10 flex items-center justify-center text-[#565e74] hover:bg-[#e1e2ec]/50 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#dc2626] ring-2 ring-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#c2c6d6]/40 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-[#c2c6d6]/30 flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#191b23]">Notifications</span>
                  <span className="text-[11px] font-medium text-[#0058be] bg-[#0058be]/10 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-[#c2c6d6]/20 max-h-80 overflow-y-auto">
                  <div className="p-3 hover:bg-[#f2f3fd] transition-colors flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#191b23]">
                        Verification Failure Alert
                      </p>
                      <p className="text-[11px] text-[#565e74] mt-0.5">
                        7 validation requests failed due to mismatched digest checksums.
                      </p>
                      <span className="text-[10px] text-[#727785] mt-1 block">15m ago</span>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#f2f3fd] transition-colors flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0058be] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#191b23]">
                        Emergency Weather Advisory Signed
                      </p>
                      <p className="text-[11px] text-[#565e74] mt-0.5">
                        Ed25519 signature committed to Trustline public ledger.
                      </p>
                      <span className="text-[10px] text-[#727785] mt-1 block">2h ago</span>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-[#f2f3fd] transition-colors flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#191b23]">
                        Key Rotation in 42 Days
                      </p>
                      <p className="text-[11px] text-[#565e74] mt-0.5">
                        Master Key #1 is scheduled for automated cryptographic rollover.
                      </p>
                      <span className="text-[10px] text-[#727785] mt-1 block">1d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          <div className="relative">
            <button
              id="help-btn"
              onClick={() => {
                setShowHelp(!showHelp);
                setShowNotifications(false);
                setShowProfile(false);
              }}
              className="w-10 h-10 flex items-center justify-center text-[#565e74] hover:bg-[#e1e2ec]/50 rounded-full transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Help Dropdown */}
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#c2c6d6]/40 p-4 z-50 text-xs text-[#424754]">
                <h4 className="font-semibold text-sm text-[#191b23] mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#0058be]" />
                  Trustline Vault Help
                </h4>
                <p className="mb-3 leading-relaxed">
                  SOA University Trustline Vault cryptographically signs institutional communications with Ed25519 signatures, preventing impersonation and tampering.
                </p>
                <div className="space-y-1.5 border-t border-[#c2c6d6]/30 pt-2 font-medium">
                  <a
                    href="#verify"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowHelp(false);
                    }}
                    className="flex items-center justify-between text-[#0058be] hover:underline"
                  >
                    <span>How to verify a hash</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="#ed25519"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowHelp(false);
                    }}
                    className="flex items-center justify-between text-[#0058be] hover:underline"
                  >
                    <span>Ed25519 Signature Standard</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative ml-2">
            <button
              id="user-profile-btn"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
                setShowHelp(false);
              }}
              className="w-10 h-10 rounded-full bg-[#e1e2ec] border border-[#c2c6d6]/60 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0058be]/50 transition-all flex items-center justify-center focus:outline-none"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR6p0azx_Rq7IS4iGez8ihle5OkBlEczibKNj8TmsL7KbSJjBBqFmxSP-Uo9JvKEvasQqNHoEcaek054gpeCuGIQfPHKnREIxb69H0kNqiKb87qt2xW2RKuDldbXMTNJ2k2dR-eSxVCYZpOFDomPO6iXMlwym-45IjChuWfG0PTaWlRewo3VdvpZUoOF3k-AHEoPpxNNmf7QgfeZZR9bfl91PKsmdxqBHycIf5jRsk3Tjin8GnqO2t"
                alt="Institutional Officer Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#c2c6d6]/40 p-4 z-50 text-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[#c2c6d6]/30">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#c2c6d6]/60">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR6p0azx_Rq7IS4iGez8ihle5OkBlEczibKNj8TmsL7KbSJjBBqFmxSP-Uo9JvKEvasQqNHoEcaek054gpeCuGIQfPHKnREIxb69H0kNqiKb87qt2xW2RKuDldbXMTNJ2k2dR-eSxVCYZpOFDomPO6iXMlwym-45IjChuWfG0PTaWlRewo3VdvpZUoOF3k-AHEoPpxNNmf7QgfeZZR9bfl91PKsmdxqBHycIf5jRsk3Tjin8GnqO2t"
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[#191b23]">Dr. J. Doe, CISO</p>
                    <p className="text-[#565e74] text-[11px]">sayonidey.official@gmail.com</p>
                    <span className="inline-block mt-0.5 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                      Authorized Signer
                    </span>
                  </div>
                </div>
                <div className="pt-2 space-y-1.5 text-[#424754]">
                  <div className="flex justify-between py-1">
                    <span className="text-[#727785]">Institution:</span>
                    <span className="font-medium text-[#191b23]">SOA University</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#727785]">Vault Role:</span>
                    <span className="font-medium text-[#191b23]">Master Key Custodian</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#727785]">MFA Security:</span>
                    <span className="font-medium text-emerald-600 font-mono">FIPS-140-3 Hardware</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
