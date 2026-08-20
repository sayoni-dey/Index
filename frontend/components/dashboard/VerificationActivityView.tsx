import React, { useState } from 'react';
import { initialVerificationFailures } from '@/data/mockData';
import { VerificationFailureItem } from '@/types';
import {
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Search,
  Check,
  XCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  Globe,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const VerificationActivityView: React.FC = () => {
  const [failures, setFailures] = useState<VerificationFailureItem[]>(initialVerificationFailures);
  const [testHash, setTestHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    tested: boolean;
    valid?: boolean;
    docTitle?: string;
    details?: string;
  } | null>(null);

  const handleTestHash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testHash.trim()) return;

    // Simulate verification
    if (testHash.includes('8f2') || testHash.includes('3e4') || testHash.includes('1c8')) {
      setVerificationResult({
        tested: true,
        valid: true,
        docTitle: 'Emergency Weather Advisory.pdf',
        details: 'Authentic SOA University signature verified using Master Ed25519 Key #1.'
      });
    } else {
      setVerificationResult({
        tested: true,
        valid: false,
        details: 'Digest mismatch: No authentic SOA University cryptographic signature matches this hash.'
      });
    }
  };

  return (
    <div id="verification-activity-view" className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">
          Verification Activity &amp; Telemetry
        </h2>
        <p className="text-sm text-[#565e74] mt-1">
          Real-time global verification telemetry, tamper detection alerts, and public validator network queries.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-xl bg-white/80 border border-[#c2c6d6]/40">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#565e74] uppercase">Success Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-[#191b23]">99.85%</div>
          <span className="text-xs text-emerald-700 font-medium mt-1 inline-block">
            4,821 successful verifications
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl bg-red-50/50 border border-red-200">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-red-700 uppercase">Verification Failures</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-600">{failures.length}</div>
          <span className="text-xs text-red-700 font-medium mt-1 inline-block">
            Requires immediate security triage
          </span>
        </div>

        <div className="glass-panel p-5 rounded-xl bg-white/80 border border-[#c2c6d6]/40">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-[#565e74] uppercase">Avg API Response</span>
            <Activity className="w-4 h-4 text-[#0058be]" />
          </div>
          <div className="text-3xl font-bold text-[#191b23]">18 ms</div>
          <span className="text-xs text-[#565e74] font-medium mt-1 inline-block">
            Edge-distributed DNS TXT / HTTPS
          </span>
        </div>
      </div>

      {/* Interactive Hash Verification Tester */}
      <div className="glass-panel p-6 rounded-xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs">
        <h3 className="text-base font-bold text-[#191b23] mb-1">
          Public Signature Verification Simulator
        </h3>
        <p className="text-xs text-[#565e74] mb-4">
          Test any document digest or SHA-256 hash against the public SOA University Trustline validator.
        </p>

        <form onSubmit={handleTestHash} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#727785]" />
            <input
              type="text"
              value={testHash}
              onChange={(e) => setTestHash(e.target.value)}
              placeholder="Paste SHA-256 hash or Ed25519 signature (e.g. 0x8f2a...1b9c)"
              className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg pl-9 pr-3 py-2.5 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#0058be] text-white text-xs font-semibold rounded-lg hover:bg-[#2170e4] transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            Verify Authenticity
          </button>
        </form>

        {verificationResult && (
          <div
            className={`mt-4 p-4 rounded-xl text-xs flex items-start gap-3 border ${
              verificationResult.valid
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            {verificationResult.valid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm">
                {verificationResult.valid ? 'Signature Valid & Certified' : 'Verification Failed'}
              </p>
              <p className="mt-1 leading-relaxed">{verificationResult.details}</p>
            </div>
          </div>
        )}
      </div>

      {/* Verification Failures Breakdown Table (7 Issues) */}
      <div className="glass-panel rounded-xl overflow-hidden border border-red-200 bg-white/90 shadow-xs">
        <div className="p-4 bg-red-50/70 border-b border-red-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <h3 className="text-sm font-bold text-red-950">
              Active Verification Failures Incident Queue ({failures.length})
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-300">
            Security Triage Required
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f3fd] border-b border-[#c2c6d6]/40 text-[#565e74] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Suspected Document</th>
                <th className="py-3 px-4">Failure Reason</th>
                <th className="py-3 px-4">Attempted Digest Hash</th>
                <th className="py-3 px-4">Validator Origin IP</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d6]/20 text-[#191b23]">
              {failures.map((fail) => (
                <tr key={fail.id} className="hover:bg-red-50/30 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#191b23]">
                    {fail.documentTitle}
                  </td>
                  <td className="py-3 px-4 text-[#565e74] max-w-xs">
                    {fail.reason}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#727785]">
                    {fail.attemptedHash.slice(0, 10)}...{fail.attemptedHash.slice(-6)}
                  </td>
                  <td className="py-3 px-4 text-[#565e74]">{fail.originIp}</td>
                  <td className="py-3 px-4 text-[#727785] whitespace-nowrap">{fail.timestamp}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        fail.severity === 'high'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : fail.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}
                    >
                      {fail.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
