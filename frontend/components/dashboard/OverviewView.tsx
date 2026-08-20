import React, { useRef, useState } from 'react';
import {
  PenLine,
  Eye,
  Key,
  ShieldAlert,
  Plus,
  TrendingUp,
  Upload,
  FileText,
  FileCode,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Shield,
  FileSpreadsheet
} from 'lucide-react';
import { DocumentItem, ActivityLogItem, SigningKeyItem } from '@/types';

interface OverviewViewProps {
  documents: DocumentItem[];
  activities: ActivityLogItem[];
  keys: SigningKeyItem[];
  onOpenNewSignature: () => void;
  onSelectDocument: (doc: DocumentItem) => void;
  onNavigateToKeys: () => void;
  onNavigateToSignedDocs: () => void;
  onNavigateToFailures: () => void;
  onDirectUploadFile: (file: File) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  documents,
  activities,
  keys,
  onOpenNewSignature,
  onSelectDocument,
  onNavigateToKeys,
  onNavigateToSignedDocs,
  onNavigateToFailures,
  onDirectUploadFile
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (hash: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDirectUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onDirectUploadFile(e.target.files[0]);
    }
  };

  // Primary key data
  const primaryKey = keys.find((k) => k.type === 'primary') || keys[0];

  return (
    <div id="overview-dashboard-content" className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#191b23] tracking-tight mb-1">
            SOA University
          </h2>
          <p className="text-base text-[#565e74] font-normal">
            Cryptographic Verification Overview
          </p>
        </div>
        <button
          id="overview-new-signature-btn"
          onClick={onOpenNewSignature}
          className="bg-[#0058be] text-white text-sm font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#2170e4] transition-all shadow-md shadow-[#0058be]/20 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Signature</span>
        </button>
      </div>

      {/* Stats Bento Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1: Signed Documents */}
        <div
          onClick={onNavigateToSignedDocs}
          className="glass-panel p-6 rounded-xl flex flex-col justify-between group hover:border-[#0058be]/50 transition-all cursor-pointer bg-white/75"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-[#565e74]">Signed Documents</span>
            <PenLine className="w-5 h-5 text-[#0058be] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#191b23] glow-text">128</div>
            <div className="text-sm text-[#565e74] mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#0058be]" />
              <span className="font-medium text-[#0058be]">+12</span> this week
            </div>
          </div>
        </div>

        {/* Stat 2: Total Verifications */}
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between group hover:border-[#0058be]/50 transition-all cursor-default bg-white/75">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-[#565e74]">Total Verifications</span>
            <Eye className="w-5 h-5 text-[#0058be] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#191b23] glow-text">4,821</div>
            <div className="text-sm text-[#565e74] mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-[#0058be]" />
              <span className="font-medium text-[#0058be]">+890</span> this week
            </div>
          </div>
        </div>

        {/* Stat 3: Active Keys */}
        <div
          onClick={onNavigateToKeys}
          className="glass-panel p-6 rounded-xl flex flex-col justify-between group hover:border-[#0058be]/50 transition-all cursor-pointer bg-white/75"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-[#565e74]">Active Keys</span>
            <Key className="w-5 h-5 text-[#565e74] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#191b23]">2</div>
            <div className="text-sm text-[#565e74] mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Healthy</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Verification Failures */}
        <div
          onClick={onNavigateToFailures}
          className="glass-panel p-6 rounded-xl flex flex-col justify-between border-red-200/80 bg-red-50/40 group hover:border-red-500/50 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium text-[#565e74]">Verification Failures</span>
            <ShieldAlert className="w-5 h-5 text-[#dc2626] group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="text-3xl font-bold text-[#dc2626]">7</div>
            <div className="text-sm text-[#dc2626] mt-1 flex items-center gap-1 font-medium">
              <ShieldAlert className="w-4 h-4" />
              <span>Requires attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cryptographic Signing Card */}
          <div className="glass-panel rounded-xl overflow-hidden border border-[#c2c6d6]/40 bg-white/80 shadow-xs">
            <div className="p-6 border-b border-[#c2c6d6]/20 flex justify-between items-center bg-white/40">
              <h3 className="text-lg font-bold text-[#191b23]">Cryptographic Signing</h3>
              <div className="px-3 py-1 rounded-full bg-[#0058be]/10 border border-[#0058be]/30 text-[#0058be] text-xs font-mono font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0058be] animate-pulse"></span>
                <span>Ed25519 Ready</span>
              </div>
            </div>

            {/* Drop Zone Box */}
            <div
              id="cryptographic-dropzone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 m-6 flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all cursor-pointer group ${
                isDragging
                  ? 'border-[#0058be] bg-[#dae2fd]/40 scale-[1.01]'
                  : 'border-[#c2c6d6]/60 bg-[#f1f5f9]/50 hover:bg-[#f1f5f9] hover:border-[#0058be]/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileInputChange}
                accept=".pdf,.png,.jpg,.jpeg,.json,.docx,.txt"
              />
              <div className="w-16 h-16 rounded-full bg-[#e1e2ec] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md text-[#0058be]">
                <Upload className="w-7 h-7" />
              </div>
              <p className="text-lg font-semibold text-[#191b23] mb-2 text-center">
                Drag &amp; Drop Protocol payload
              </p>
              <p className="text-sm text-[#565e74] text-center max-w-md leading-relaxed">
                Upload PDF, image, or raw JSON data to generate a cryptographic hash and append institutional signature.
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-6 px-6 py-2 border border-[#727785] text-[#191b23] rounded-lg text-sm font-medium hover:bg-white hover:border-[#0058be] hover:text-[#0058be] transition-colors shadow-xs"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Recently Published Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#191b23]">Recently Published</h3>
              <button
                onClick={onNavigateToSignedDocs}
                className="text-xs font-semibold text-[#0058be] hover:underline flex items-center gap-1"
              >
                View all ({documents.length}) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.slice(0, 2).map((doc, idx) => (
                <div
                  key={doc.id}
                  id={`recently-published-card-${idx}`}
                  onClick={() => onSelectDocument(doc)}
                  className="glass-panel-light rounded-xl overflow-hidden group cursor-pointer border border-[#c2c6d6]/40 hover:border-[#0058be]/50 transition-all hover:shadow-md bg-white/90"
                >
                  {/* Card Header Illustration Preview */}
                  <div className="h-32 bg-[#e1e2ec] relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#191b23]/70 via-transparent to-transparent z-10"></div>
                    
                    {/* Background icon indicator */}
                    {doc.type === 'pdf' ? (
                      <FileText className="w-16 h-16 text-[#565e74]/30" />
                    ) : (
                      <ImageIcon className="w-16 h-16 text-[#565e74]/30" />
                    )}

                    {/* Top Right File Type Icon */}
                    <div className="absolute top-3 right-3 z-20 text-white drop-shadow-md">
                      {doc.type === 'pdf' ? (
                        <FileText className="w-5 h-5" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                    </div>

                    {/* Bottom Left Verified Badge */}
                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
                      <div className="bg-[#565e74]/40 text-white border border-white/30 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase backdrop-blur-md flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        Verified
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-[#191b23] mb-1 truncate group-hover:text-[#0058be] transition-colors">
                      {doc.title}
                    </h4>
                    <div className="flex justify-between items-center mt-3 text-xs">
                      <div className="flex items-center gap-1.5 text-[#565e74] font-mono">
                        <span className="truncate w-24 sm:w-28">{doc.shortHash}</span>
                        <button
                          onClick={(e) => handleCopy(doc.hash, e)}
                          className="hover:text-[#0058be] p-0.5 rounded"
                          title="Copy Full SHA-256 Hash"
                        >
                          {copiedHash === doc.hash ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <span className="text-[#727785]">{doc.timeAgo}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (col-span-1) */}
        <div className="space-y-6">
          {/* Security Status / Vault Status Card */}
          <div className="glass-panel p-6 rounded-xl border border-[#565e74]/20 relative overflow-hidden bg-white/80 shadow-xs">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#565e74]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e] shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#0058be]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#191b23]">Vault Status</h3>
                <p className="text-xs font-mono text-[#565e74] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  All systems operational
                </p>
              </div>
            </div>

            <div className="space-y-3.5 relative z-10 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#c2c6d6]/30">
                <span className="text-xs font-medium text-[#565e74]">Primary Key</span>
                <span className="font-mono text-xs font-semibold text-[#191b23] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#c2c6d6]/40">
                  Active (Ed25519)
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#c2c6d6]/30">
                <span className="text-xs font-medium text-[#565e74]">Next Rotation</span>
                <span className="font-mono text-xs font-medium text-[#191b23]">
                  in {primaryKey.rotationsDaysLeft} Days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-[#565e74]">Algorithm</span>
                <span className="font-mono text-xs font-medium text-[#191b23]">SHA-256</span>
              </div>
            </div>

            <button
              id="manage-keys-btn"
              onClick={onNavigateToKeys}
              className="w-full mt-6 py-2 border border-[#565e74]/50 text-[#565e74] hover:text-[#191b23] hover:border-[#191b23] rounded-lg text-sm font-medium hover:bg-white transition-colors cursor-pointer"
            >
              Manage Keys
            </button>
          </div>

          {/* Provenance / Recent Activity Log Card */}
          <div className="glass-panel p-6 rounded-xl bg-white/80 border border-[#c2c6d6]/30 shadow-xs">
            <h3 className="text-lg font-bold text-[#191b23] mb-6">Recent Activity Log</h3>
            <div className="space-y-0">
              {/* Activity Item 1 */}
              <div className="trust-line flex gap-4 pb-6 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#0058be]/15 border border-[#0058be] flex items-center justify-center shrink-0 z-10">
                  <PenLine className="w-3 h-3 text-[#0058be]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold text-[#191b23]">Document Signed</p>
                    <span className="text-[11px] text-[#727785]">2h ago</span>
                  </div>
                  <p className="text-xs text-[#565e74] mt-0.5 truncate font-medium">
                    Emergency Weather Advisory.pdf
                  </p>
                  <p className="text-[11px] font-mono text-[#727785] mt-1 bg-[#f1f5f9] px-1.5 py-0.5 rounded inline-block border border-[#c2c6d6]/30">
                    Hash: 0x8f2a...1b9c
                  </p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="trust-line flex gap-4 pb-6 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#e1e2ec] border border-[#727785] flex items-center justify-center shrink-0 z-10">
                  <Upload className="w-3 h-3 text-[#565e74]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold text-[#191b23]">Payload Uploaded</p>
                    <span className="text-[11px] text-[#727785]">2h ago</span>
                  </div>
                  <p className="text-xs text-[#565e74] mt-0.5 font-medium">
                    Admin.JDoe uploaded 2.4MB PDF
                  </p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="trust-line flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-[#dae2fd] border border-[#565e74] flex items-center justify-center shrink-0 z-10">
                  <Key className="w-3 h-3 text-[#565e74]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold text-[#191b23]">Session Authenticated</p>
                    <span className="text-[11px] text-[#727785]">3h ago</span>
                  </div>
                  <p className="text-xs text-[#565e74] mt-0.5 font-medium">
                    Institutional MFA Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
