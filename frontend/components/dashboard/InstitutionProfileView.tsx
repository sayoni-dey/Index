import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Globe,
  Award,
  Users,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Lock,
  FileCheck
} from 'lucide-react';

export const InstitutionProfileView: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const didIdentifier = 'did:trustline:soa-university-9812401';
  const dnsRecord = '_trustline-vault.soa.edu. IN TXT "v=TL1; k=ed25519; p=AAAAC3NzaC1lZDI1NTE5AAAAIOrXJb7k"';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const signatories = [
    {
      name: 'Dr. J. Doe',
      role: 'Chief Information Security Officer',
      email: 'sayonidey.official@gmail.com',
      authMethod: 'Hardware FIPS-140-3 Token #891',
      status: 'Active'
    },
    {
      name: 'Prof. S. R. Mohanty',
      role: 'Vice Chancellor & Registrar',
      email: 'vc.office@soa.edu',
      authMethod: 'Institutional MFA & Biometric',
      status: 'Active'
    },
    {
      name: 'Director of Campus Operations',
      role: 'Facilities Directorate Lead',
      email: 'operations@soa.edu',
      authMethod: 'Hardware Security Key #104',
      status: 'Active'
    }
  ];

  return (
    <div id="institution-profile-view" className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">
          SOA University Verified Identity
        </h2>
        <p className="text-sm text-[#565e74] mt-1">
          Cryptographically certified identity profile, root certificate hierarchy, and public registry credentials.
        </p>
      </div>

      {/* Main Profile Identity Card */}
      <div className="glass-panel p-6 rounded-2xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c2c6d6]/30">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0058be] text-white flex items-center justify-center shadow-lg shadow-[#0058be]/20 shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#191b23]">
                  Siksha &apos;O&apos; Anusandhan (SOA) University
                </h3>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Root Entity
                </span>
              </div>
              <p className="text-xs text-[#565e74] mt-1">
                Chartered Higher Educational Institution • Trustline Protocol Node ID: #SOA-IND-01
              </p>
            </div>
          </div>
        </div>

        {/* Cryptographic Identifiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#f2f3fd]/60 p-4 rounded-xl border border-[#c2c6d6]/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-[#565e74] uppercase tracking-wider text-[11px]">
                Decentralized Identifier (DID)
              </span>
              <button
                onClick={() => handleCopy(didIdentifier, 'did')}
                className="text-[#0058be] hover:underline flex items-center gap-1"
              >
                {copiedField === 'did' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'did' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-[#c2c6d6]/30 font-mono text-[11px] text-[#191b23] select-all">
              {didIdentifier}
            </div>
          </div>

          <div className="bg-[#f2f3fd]/60 p-4 rounded-xl border border-[#c2c6d6]/40">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-[#565e74] uppercase tracking-wider text-[11px]">
                DNS TXT Verification Record
              </span>
              <button
                onClick={() => handleCopy(dnsRecord, 'dns')}
                className="text-[#0058be] hover:underline flex items-center gap-1"
              >
                {copiedField === 'dns' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedField === 'dns' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-[#c2c6d6]/30 font-mono text-[11px] text-[#191b23] select-all truncate">
              {dnsRecord}
            </div>
          </div>
        </div>

        {/* Certificate Hierarchy Chain */}
        <div>
          <h4 className="font-bold text-sm text-[#191b23] mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#0058be]" />
            <span>Root Certificate Authority Chain</span>
          </h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-[#f9f9ff] border border-[#c2c6d6]/40 flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#191b23]">SOA Root CA 2024 (Tier 1 Self-Signed Root)</span>
                <p className="text-[11px] text-[#565e74]">FIPS 140-3 Hardware Level 3 Offline Vault</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Valid until 2044
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#f9f9ff] border border-[#c2c6d6]/40 flex items-center justify-between ml-4">
              <div>
                <span className="font-semibold text-[#191b23]">↳ SOA Institutional Signing SubCA-1</span>
                <p className="text-[11px] text-[#565e74]">Intermediate Online Authority</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Valid until 2034
              </span>
            </div>
          </div>
        </div>

        {/* Authorized Signatories Table */}
        <div>
          <h4 className="font-bold text-sm text-[#191b23] mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0058be]" />
            <span>Authorized Institutional Signatories</span>
          </h4>
          <div className="overflow-x-auto rounded-xl border border-[#c2c6d6]/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f2f3fd] text-[#565e74] font-semibold uppercase">
                <tr>
                  <th className="py-2.5 px-4">Signer Name</th>
                  <th className="py-2.5 px-4">Institutional Role</th>
                  <th className="py-2.5 px-4">Hardware Token / Auth</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c6d6]/20 bg-white">
                {signatories.map((sig, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-semibold text-[#191b23]">{sig.name}</td>
                    <td className="py-3 px-4 text-[#565e74]">{sig.role}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#727785]">{sig.authMethod}</td>
                    <td className="py-3 px-4">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                        {sig.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
