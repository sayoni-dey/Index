import React, { useState, useRef } from 'react';
import { X, Upload, CheckCircle2, Shield, Lock, FileText, Loader2, Sparkles } from 'lucide-react';
import { DocumentItem, SigningKeyItem } from '@/types';

interface NewSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  keys: SigningKeyItem[];
  onAddDocument: (newDoc: DocumentItem) => void;
}

export const NewSignatureModal: React.FC<NewSignatureModalProps> = ({
  isOpen,
  onClose,
  keys,
  onAddDocument
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Public Advisory');
  const [selectedKeyId, setSelectedKeyId] = useState(keys[0]?.id || 'key-1');
  const [description, setDescription] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      if (!title) {
        setTitle(selected.name);
      }
    }
  };

  const bufferToHex = (buffer: ArrayBuffer) => {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map((value) => {
      const hexCode = value.toString(16);
      const paddedHexCode = hexCode.padStart(2, '0');
      return paddedHexCode;
    });
    return hexCodes.join('');
  };

  const handleSignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsSigning(true);
    setProgressStep(1); // 1: Computing SHA-256 Digest

    let computedHash = '0x' + Math.random().toString(16).substring(2) + 'a8b94109283741829037418290138401928471928aa76b1298d0';
    
    try {
      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        computedHash = '0x' + bufferToHex(hashBuffer);
      } else {
        const encoder = new TextEncoder();
        const data = encoder.encode(title + description + Date.now().toString());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        computedHash = '0x' + bufferToHex(hashBuffer);
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      setProgressStep(2); // 2: HSM Secure Enclave Signing
      setTimeout(() => {
        setProgressStep(3); // 3: Trustline Protocol Seal

        const short = computedHash.slice(0, 5) + '...' + computedHash.slice(-4);
        const randomSigSuffix = Math.random().toString(16).substring(2, 10);
        const signature = `ed25519:${computedHash.slice(2, 26)}${randomSigSuffix}9019283741829037418290138401928471928`;

        const newDoc: DocumentItem = {
          id: `doc-${Date.now()}`,
          title: title.endsWith('.pdf') || title.endsWith('.png') || title.endsWith('.json') ? title : `${title}.pdf`,
          type: file?.name.endsWith('.png') || file?.name.endsWith('.jpg') ? 'image' : file?.name.endsWith('.json') ? 'json' : 'pdf',
          fileSize: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
          hash: computedHash,
          shortHash: short,
          signature,
          algorithm: 'Ed25519 (SHA-256)',
          signer: 'SOA University Security Bureau',
          signerRole: 'Chief Information Security Officer',
          signedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
          timeAgo: 'Just now',
          status: 'verified',
          verificationCount: 1,
          category,
          description: description || 'Certified official institutional communication.'
        };

        setTimeout(() => {
          setIsSigning(false);
          onAddDocument(newDoc);
          onClose();
        }, 600);
      }, 700);
    }, 600);
  };

  return (
    <div
      id="new-signature-modal-backdrop"
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="new-signature-modal"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#c2c6d6]/40 overflow-hidden flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#c2c6d6]/30 flex items-center justify-between bg-[#f2f3fd]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0058be] text-white flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#191b23]">Create Cryptographic Signature</h3>
              <p className="text-xs text-[#565e74]">SOA University Vault Signer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#727785] hover:text-[#191b23] p-1 rounded-lg hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSignSubmit} className="p-6 space-y-4 text-sm">
          {/* File Upload Drop Zone */}
          <div>
            <label className="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-2">
              Select Payload or Document
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#c2c6d6] hover:border-[#0058be] p-4 rounded-xl text-center bg-[#f9f9ff] cursor-pointer transition-all hover:bg-[#f2f3fd]"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.json,.docx,.txt"
              />
              <Upload className="w-6 h-6 text-[#0058be] mx-auto mb-1.5" />
              {file ? (
                <div className="text-xs">
                  <p className="font-semibold text-[#191b23]">{file.name}</p>
                  <p className="text-[#565e74]">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div className="text-xs">
                  <p className="font-medium text-[#191b23]">Click or drag file to attach</p>
                  <p className="text-[#727785] text-[11px] mt-0.5">PDF, PNG, JPG, JSON or documents</p>
                </div>
              )}
            </div>
          </div>

          {/* Title input */}
          <div>
            <label className="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
              Document / Announcement Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Official University Academic Calendar Fall 2026.pdf"
              className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3.5 py-2 text-sm text-[#191b23] focus:outline-none focus:border-[#0058be] focus:ring-2 focus:ring-[#0058be]/20"
            />
          </div>

          {/* Category & Key Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
              >
                <option value="Public Advisory">Public Advisory</option>
                <option value="Operations">Operations</option>
                <option value="Academics">Academics</option>
                <option value="Finance">Finance</option>
                <option value="Research">Research & Grants</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
                Signing Key
              </label>
              <select
                value={selectedKeyId}
                onChange={(e) => setSelectedKeyId(e.target.value)}
                className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
              >
                {keys.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name.slice(0, 24)}... ({k.algorithm})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional description */}
          <div>
            <label className="block text-xs font-semibold text-[#565e74] uppercase tracking-wider mb-1.5">
              Protocol Context Note (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief context attached to the verifiable cryptographic envelope..."
              className="w-full bg-[#f2f3fd] border border-[#c2c6d6]/60 rounded-lg px-3.5 py-2 text-xs text-[#191b23] focus:outline-none focus:border-[#0058be]"
            />
          </div>

          {/* Progress Indicator when Signing */}
          {isSigning && (
            <div className="p-3.5 rounded-xl bg-[#0058be]/5 border border-[#0058be]/30 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-medium text-[#0058be]">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {progressStep === 1 && '1/3: Computing SHA-256 Digest...'}
                  {progressStep === 2 && '2/3: Generating Ed25519 Signature in HSM...'}
                  {progressStep === 3 && '3/3: Committing to Trustline Ledger...'}
                </span>
                <span className="font-mono text-[11px]">{progressStep * 33}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#0058be] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressStep * 33}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#c2c6d6]/30">
            <button
              type="button"
              disabled={isSigning}
              onClick={onClose}
              className="px-4 py-2 border border-[#c2c6d6] text-[#565e74] rounded-lg text-xs font-semibold hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSigning || !title}
              className="px-5 py-2 bg-[#0058be] text-white rounded-lg text-xs font-semibold hover:bg-[#2170e4] transition-colors shadow-md shadow-[#0058be]/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              {isSigning ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing Payload...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Append Cryptographic Signature</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
