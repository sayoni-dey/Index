import React, { useState } from 'react';
import { initialActivities } from '@/data/mockData';
import { ActivityLogItem } from '@/types';
import {
  History,
  ShieldCheck,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Key,
  Upload,
  PenLine,
  FileSpreadsheet
} from 'lucide-react';

interface AuditLogViewProps {
  activities: ActivityLogItem[];
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({ activities }) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(search.toLowerCase()) ||
      act.description.toLowerCase().includes(search.toLowerCase()) ||
      act.actor.toLowerCase().includes(search.toLowerCase()) ||
      (act.hash && act.hash.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || act.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const exportAuditLog = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'ID,Type,Title,Description,Hash,Actor,Timestamp\n' +
      activities
        .map(
          (a) =>
            `"${a.id}","${a.type}","${a.title}","${a.description}","${a.hash || ''}","${a.actor}","${a.timestamp}"`
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soa_trustline_audit_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="audit-log-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">
            Cryptographic Audit Trail
          </h2>
          <p className="text-sm text-[#565e74] mt-1">
            Immutable, append-only verifiable event ledger for institutional signing and credential lifecycle.
          </p>
        </div>
        <button
          onClick={exportAuditLog}
          className="px-4 py-2.5 bg-white border border-[#c2c6d6]/60 hover:border-[#0058be] text-[#191b23] hover:text-[#0058be] text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start md:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#0058be]" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Merkle Root Header Card */}
      <div className="glass-panel p-4 rounded-xl bg-white/80 border border-[#c2c6d6]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono">
          <span className="font-semibold text-[#565e74]">Merkle Root Hash:</span>
          <span className="bg-[#f1f5f9] px-2.5 py-1 rounded border border-[#c2c6d6]/40 text-[#191b23]">
            0x7c9e8f12a938b812f00d8392182bb90192837418
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#565e74]">
          <span>Ledger Height: <strong>#9,412</strong></span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Consensus Synced
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="glass-panel p-4 rounded-xl bg-white/80 border border-[#c2c6d6]/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#727785]" />
          <input
            type="text"
            placeholder="Search audit trail by actor, action, or hash..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg pl-9 pr-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#565e74] font-medium">Event Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
          >
            <option value="all">All Events</option>
            <option value="signed">Signing Events</option>
            <option value="upload">Payload Uploads</option>
            <option value="auth">Authentication</option>
            <option value="failure">Security Failures</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-[#c2c6d6]/40 bg-white/90 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f3fd] border-b border-[#c2c6d6]/40 text-[#565e74] font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Action Summary</th>
                <th className="py-3 px-4">Actor / Origin</th>
                <th className="py-3 px-4">Digest / Checksum</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d6]/20 text-[#191b23]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#f9f9ff] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          item.type === 'signed'
                            ? 'bg-blue-100 text-[#0058be]'
                            : item.type === 'auth'
                            ? 'bg-purple-100 text-purple-700'
                            : item.type === 'failure'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-[#565e74]'
                        }`}
                      >
                        {item.type === 'signed' ? (
                          <PenLine className="w-3.5 h-3.5" />
                        ) : item.type === 'auth' ? (
                          <Key className="w-3.5 h-3.5" />
                        ) : item.type === 'failure' ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <Upload className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className="font-semibold">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#565e74]">{item.description}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#727785]">{item.actor}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#565e74]">
                    {item.hash ? (
                      <span className="bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#c2c6d6]/40">
                        {item.hash}
                      </span>
                    ) : (
                      <span className="text-[#727785]">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-[#727785] whitespace-nowrap">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
