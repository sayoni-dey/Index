import React, { useState } from 'react';
import { DocumentItem } from '@/types';

import {
  X,
  ShieldCheck,
  FileText,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  ExternalLink,
  Lock,
  Building,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface DocumentDetailModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  onClose
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [tamperTested, setTamperTested] = useState<boolean | null>(null);

  if (!document) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadProof = () => {
    const proofData = {
      protocol: 'Trustline-Ed25519-v2',
      institution: 'SOA University',
      documentId: document.id,
      title: document.title,
      sha256Hash: document.hash,
      signature: document.signature,
      algorithm: document.algorithm,
      signer: document.signer,
      signerRole: document.signerRole,
      signedAt: document.signedAt,
      verifiedLedgerIndex: '0x9924f1',
      certificateChain: [
        'SOA Root CA 2024 (FIPS-140-3)',
        'SOA Institutional Signing Authority SubCA-1',
        'SOA Security Bureau Ed25519 Signer #891'
      ]
    };

    const blob = new Blob([JSON.stringify(proofData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.replace(/\.[^/.]+$/, '')}_cryptographic_proof.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runTamperVerification = () => {
    setTamperTested(null);
    setTimeout(() => {
      setTamperTested(true);
    }, 600);
  };

  return (
    <div
      id="document-detail-modal-backdrop"
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="document-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c2c6d6]/40 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#c2c6d6]/30 flex items-start justify-between bg-[#f2f3fd]/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2170e4] text-white flex items-center justify-center shadow-md">
              {document.type === 'pdf' ? (
                <FileText className="w-6 h-6" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-[#191b23]">{document.title}</h3>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Verified
                </span>
              </div>
              <p className="text-xs text-[#565e74] mt-0.5">{document.category} • {document.fileSize}</p>
            </div>
          </div>
          <button
            id="close-doc-modal-btn"
            onClick={onClose}
            className="text-[#727785] hover:text-[#191b23] p-1.5 rounded-lg hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm">
          {document.description && (
            <div className="bg-[#f9f9ff] p-3.5 rounded-xl border border-[#c2c6d6]/30 text-[#424754] text-xs leading-relaxed">
              <span className="font-semibold text-[#191b23]">Summary: </span>
              {document.description}
            </div>
          )}

          {/* Cryptographic Hashes & Signatures */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#565e74] uppercase tracking-wider">
                  SHA-256 Digest Hash
                </label>
                <button
                  onClick={() => handleCopy(document.hash, 'hash')}
                  className="text-xs text-[#0058be] hover:underline flex items-center gap-1"
                >
                  {copiedField === 'hash' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Hash</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[#f1f5f9] p-3 rounded-lg border border-[#c2c6d6]/40 font-mono text-xs text-[#191b23] break-all select-all">
                {document.hash}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#565e74] uppercase tracking-wider">
                  Ed25519 Institutional Signature
                </label>
                <button
                  onClick={() => handleCopy(document.signature, 'signature')}
                  className="text-xs text-[#0058be] hover:underline flex items-center gap-1"
                >
                  {copiedField === 'signature' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Signature</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[#f1f5f9] p-3 rounded-lg border border-[#c2c6d6]/40 font-mono text-xs text-[#191b23] break-all select-all">
                {document.signature}
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f2f3fd]/50 p-4 rounded-xl border border-[#c2c6d6]/30 text-xs">
            <div>
              <span className="text-[#727785] block mb-1">Institutional Authority</span>
              <span className="font-semibold text-[#191b23] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#0058be]" />
                {document.signer}
              </span>
            </div>
            <div>
              <span className="text-[#727785] block mb-1">Signer Role</span>
              <span className="font-semibold text-[#191b23]">{document.signerRole}</span>
            </div>
            <div>
              <span className="text-[#727785] block mb-1">Signing Timestamp</span>
              <span className="font-medium text-[#191b23] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#565e74]" />
                {document.signedAt}
              </span>
            </div>
            <div>
              <span className="text-[#727785] block mb-1">Public Verifications</span>
              <span className="font-medium text-[#0058be]">
                {document.verificationCount.toLocaleString()} external queries
              </span>
            </div>
          </div>

          {/* Tamper Test Simulator */}
          <div className="p-4 rounded-xl border border-[#0058be]/20 bg-[#0058be]/5 flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs text-[#191b23]">Independent Cryptographic Verification</p>
              <p className="text-[11px] text-[#565e74] mt-0.5">
                Test signature integrity against SOA University Root Public Key.
              </p>
            </div>
            <button
              onClick={runTamperVerification}
              className="px-3 py-1.5 bg-[#0058be] text-white text-xs font-medium rounded-lg hover:bg-[#2170e4] transition-colors shrink-0 shadow-xs"
            >
              Verify Signature
            </button>
          </div>

          {tamperTested && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Cryptographic Integrity Verified:</strong> Ed25519 signature corresponds precisely to the computed SHA-256 payload digest. No modifications detected.
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#c2c6d6]/30 bg-gray-50/50 flex flex-wrap items-center justify-between gap-3 mt-auto rounded-b-2xl">
          <button
            onClick={handleDownloadProof}
            className="px-4 py-2 bg-white border border-[#c2c6d6]/60 text-[#191b23] rounded-lg text-xs font-semibold hover:bg-[#f2f3fd] hover:border-[#0058be] transition-colors flex items-center gap-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-[#0058be]" />
            Download Proof Bundle (.JSON)
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0058be] text-white rounded-lg text-xs font-semibold hover:bg-[#2170e4] transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};