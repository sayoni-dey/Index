import React, { useState } from 'react';
import { DocumentItem } from '@/types';
import {
  FileText,
  Image as ImageIcon,
  FileCode,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Copy,
  Check,
  ExternalLink,
  Plus,
  ArrowUpDown,
  CheckCircle2,
  Calendar,
  UserCheck
} from 'lucide-react';

interface SignedCommunicationsViewProps {
  documents: DocumentItem[];
  onSelectDocument: (doc: DocumentItem) => void;
  onOpenNewSignature: () => void;
  initialSearchQuery?: string;
}

export const SignedCommunicationsView: React.FC<SignedCommunicationsViewProps> = ({
  documents,
  onSelectDocument,
  onOpenNewSignature,
  initialSearchQuery = ''
}) => {
  const [search, setSearch] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const categories = ['all', 'Public Advisory', 'Operations', 'Academics', 'Finance'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.hash.toLowerCase().includes(search.toLowerCase()) ||
      doc.signer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div id="signed-communications-view" className="space-y-6 pb-12">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">Signed Communications</h2>
          <p className="text-sm text-[#565e74] mt-1">
            Immutable registry of SOA University cryptographic announcements and certified documents.
          </p>
        </div>
        <button
          onClick={onOpenNewSignature}
          className="bg-[#0058be] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#2170e4] transition-all shadow-md shadow-[#0058be]/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Sign New Payload</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center bg-white/80 border border-[#c2c6d6]/40">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#727785]" />
          <input
            type="text"
            placeholder="Filter by title, hash, or signer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg pl-9 pr-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0058be] text-white shadow-xs'
                  : 'bg-[#f2f3fd] text-[#565e74] hover:bg-[#e1e2ec] hover:text-[#191b23]'
              }`}
            >
              {cat === 'all' ? 'All Communications' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table / Grid */}
      <div className="glass-panel rounded-xl overflow-hidden border border-[#c2c6d6]/40 bg-white/90 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f2f3fd] border-b border-[#c2c6d6]/40 text-[#565e74] font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Document / Payload</th>
                <th className="py-3.5 px-4">SHA-256 Digest</th>
                <th className="py-3.5 px-4">Signing Authority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Signed Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c2c6d6]/20 text-[#191b23]">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => onSelectDocument(doc)}
                  className="hover:bg-[#f9f9ff] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#e1e2ec] flex items-center justify-center text-[#0058be] shrink-0 group-hover:scale-105 transition-transform">
                        {doc.type === 'pdf' ? (
                          <FileText className="w-5 h-5" />
                        ) : doc.type === 'image' ? (
                          <ImageIcon className="w-5 h-5" />
                        ) : (
                          <FileCode className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-sm group-hover:text-[#0058be] transition-colors block">
                          {doc.title}
                        </span>
                        <span className="text-[11px] text-[#727785]">
                          {doc.category} • {doc.fileSize}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono">
                    <div className="flex items-center gap-1.5 text-[#565e74]">
                      <span className="bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#c2c6d6]/40">
                        {doc.shortHash}
                      </span>
                      <button
                        onClick={(e) => handleCopy(doc.hash, e)}
                        className="hover:text-[#0058be] p-1 rounded"
                        title="Copy full hash"
                      >
                        {copiedHash === doc.hash ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-xs">
                      <span className="font-medium text-[#191b23] block">{doc.signer}</span>
                      <span className="text-[11px] text-[#727785]">{doc.signerRole}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </td>

                  <td className="py-4 px-4 text-[#565e74]">
                    <div>
                      <span>{doc.timeAgo}</span>
                      <span className="block text-[10px] text-[#727785]">
                        {doc.signedAt.slice(0, 10)}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDocument(doc);
                      }}
                      className="px-3 py-1.5 bg-[#f2f3fd] hover:bg-[#0058be] hover:text-white text-[#0058be] font-medium rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Inspect Proof
                    </button>
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
