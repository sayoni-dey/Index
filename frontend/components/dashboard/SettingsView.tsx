import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Lock,
  Save,
  CheckCircle2,
  Cpu,
  Key,
  Webhook
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [defaultAlgorithm, setDefaultAlgorithm] = useState('Ed25519');
  const [rotationDays, setRotationDays] = useState('365');
  const [requireHardwareMfa, setRequireHardwareMfa] = useState(true);
  const [autoPublishLedger, setAutoPublishLedger] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://soa.edu/api/v1/trustline/events');
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div id="settings-view" className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">
          Vault &amp; Policy Configuration
        </h2>
        <p className="text-sm text-[#565e74] mt-1">
          Cryptographic security parameters, Cloud KMS enclave policies, and automated webhook dispatchers.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Cryptographic Parameters */}
        <div className="glass-panel p-6 rounded-xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#191b23] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#0058be]" />
            <span>Cryptographic Standards &amp; Defaults</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Default Signature Scheme
              </label>
              <select
                value={defaultAlgorithm}
                onChange={(e) => setDefaultAlgorithm(e.target.value)}
                className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
              >
                <option value="Ed25519">Ed25519 (Edwards-curve RFC 8032)</option>
                <option value="ECDSA">ECDSA P-256 (NIST Curve)</option>
                <option value="RSA-4096">RSA-PSS 4096-bit</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Automated Key Rotation Interval
              </label>
              <select
                value={rotationDays}
                onChange={(e) => setRotationDays(e.target.value)}
                className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
              >
                <option value="90">90 Days (High Security)</option>
                <option value="180">180 Days (Standard)</option>
                <option value="365">365 Days (Institutional Default)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="glass-panel p-6 rounded-xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#191b23] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#0058be]" />
            <span>Institutional Access Policies</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#f9f9ff] border border-[#c2c6d6]/30 cursor-pointer">
              <div>
                <p className="font-semibold text-[#191b23]">Enforce FIPS-140-3 Hardware Token for Signers</p>
                <p className="text-[11px] text-[#565e74] mt-0.5">
                  Requires physical security key challenge on all document signing requests.
                </p>
              </div>
              <input
                type="checkbox"
                checked={requireHardwareMfa}
                onChange={(e) => setRequireHardwareMfa(e.target.checked)}
                className="w-4 h-4 text-[#0058be] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-[#f9f9ff] border border-[#c2c6d6]/30 cursor-pointer">
              <div>
                <p className="font-semibold text-[#191b23]">Auto-Publish Signatures to Public Trustline Ledger</p>
                <p className="text-[11px] text-[#565e74] mt-0.5">
                  Allows external validators and students to instantly verify authentic announcements.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoPublishLedger}
                onChange={(e) => setAutoPublishLedger(e.target.checked)}
                className="w-4 h-4 text-[#0058be] rounded"
              />
            </label>
          </div>
        </div>

        {/* Webhook & Notification Dispatcher */}
        <div className="glass-panel p-6 rounded-xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#191b23] flex items-center gap-2">
            <Webhook className="w-5 h-5 text-[#0058be]" />
            <span>Integrations &amp; Webhooks</span>
          </h3>

          <div className="text-xs space-y-3">
            <div>
              <label className="block font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Signature Event Webhook Endpoint
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-domain.edu/webhook"
                className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3.5 py-2 text-xs text-[#191b23] font-mono focus:outline-none focus:border-[#0058be]"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0058be] rounded"
              />
              <span className="text-[#191b23] font-medium">
                Send security alerts to institutional officers on verification failures
              </span>
            </label>
          </div>
        </div>

        {/* Save button & feedback */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-300 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Vault policies updated successfully!</span>
            </div>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0058be] hover:bg-[#2170e4] text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-md shadow-[#0058be]/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
