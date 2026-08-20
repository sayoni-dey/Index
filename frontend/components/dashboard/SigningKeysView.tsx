import React, { useState } from 'react';
import { SigningKeyItem } from '@/types';
import {
  Key,
  ShieldCheck,
  RotateCw,
  Copy,
  Check,
  Lock,
  Cpu,
  Calendar,
  AlertTriangle,
  FileCheck,
  Plus
} from 'lucide-react';

interface SigningKeysViewProps {
  keys: SigningKeyItem[];
}

export const SigningKeysView: React.FC<SigningKeysViewProps> = ({ keys }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRotateModal, setShowRotateModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSuccess, setRotationSuccess] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleExecuteRotation = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      setRotationSuccess(true);
      setTimeout(() => {
        setRotationSuccess(false);
        setShowRotateModal(false);
      }, 1500);
    }, 1200);
  };

  return (
    <div id="signing-keys-view" className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#191b23]">
            Institutional Key Vault
          </h2>
          <p className="text-sm text-[#565e74] mt-1">
            Hardware-enforced asymmetric cryptographic keys stored in FIPS 140-3 Level 3 Cloud KMS.
          </p>
        </div>
        <button
          onClick={() => setShowRotateModal(true)}
          className="bg-[#0058be] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#2170e4] transition-all shadow-md shadow-[#0058be]/20 cursor-pointer self-start md:self-auto"
        >
          <RotateCw className="w-4 h-4" />
          <span>Initiate Key Rotation</span>
        </button>
      </div>

      {/* Rotation Status Banner */}
      <div className="glass-panel p-5 rounded-xl bg-white/80 border border-[#0058be]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#dae2fd] text-[#0058be] flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#191b23]">Next Scheduled Key Rotation</h4>
            <p className="text-xs text-[#565e74] mt-0.5">
              Automated institutional rollover policy triggers in <strong>42 days</strong>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#0058be]/10 text-[#0058be] px-3 py-1.5 rounded-lg font-semibold border border-[#0058be]/20">
            Policy: 365 Days Rollover
          </span>
        </div>
      </div>

      {/* Keys List */}
      <div className="space-y-4">
        {keys.map((keyItem) => (
          <div
            key={keyItem.id}
            className="glass-panel p-6 rounded-xl bg-white/90 border border-[#c2c6d6]/40 shadow-xs space-y-4"
          >
            {/* Key Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#c2c6d6]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e1e2ec] text-[#0058be] flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#191b23]">{keyItem.name}</h3>
                    {keyItem.type === 'primary' ? (
                      <span className="bg-blue-100 text-[#0058be] border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Primary Active
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-[#565e74] border border-gray-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Secondary Batch
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#565e74] font-mono mt-0.5">
                    Algorithm: {keyItem.algorithm} • {keyItem.signedDocumentsCount} Signed Payloads
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Healthy
                </span>
              </div>
            </div>

            {/* Public Key & Fingerprint */}
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#565e74] uppercase tracking-wider text-[11px]">
                    Public Key (RFC 8032 / OpenSSH format)
                  </span>
                  <button
                    onClick={() => handleCopy(keyItem.publicKey, keyItem.id + '-pub')}
                    className="text-[#0058be] hover:underline flex items-center gap-1"
                  >
                    {copiedKey === keyItem.id + '-pub' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Public Key</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#f1f5f9] p-2.5 rounded-lg border border-[#c2c6d6]/40 font-mono text-[11px] text-[#191b23] break-all select-all">
                  {keyItem.publicKey}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[#565e74] uppercase tracking-wider text-[11px]">
                    SHA-256 Key Fingerprint
                  </span>
                  <button
                    onClick={() => handleCopy(keyItem.fingerprint, keyItem.id + '-fp')}
                    className="text-[#0058be] hover:underline flex items-center gap-1"
                  >
                    {copiedKey === keyItem.id + '-fp' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Fingerprint</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-[#f1f5f9] p-2 rounded-lg border border-[#c2c6d6]/40 font-mono text-[11px] text-[#191b23] select-all">
                  {keyItem.fingerprint}
                </div>
              </div>
            </div>

            {/* Enclave Hardware Info */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-[#565e74] gap-2">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#0058be]" />
                <span>{keyItem.hsmEnclave}</span>
              </div>
              <div>
                <span>Expires: </span>
                <strong className="text-[#191b23] font-mono">{keyItem.expiresAt}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rotation Wizard Modal */}
      {showRotateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#c2c6d6]/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0058be]/10 text-[#0058be] flex items-center justify-center">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#191b23]">Key Rotation Wizard</h3>
                <p className="text-xs text-[#565e74]">SOA University KMS Enclave</p>
              </div>
            </div>

            <p className="text-xs text-[#424754] leading-relaxed">
              Generating a new Ed25519 key pair will promote the new key to Primary and archive the previous key for seamless verification of past announcements.
            </p>

            {rotationSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>New Ed25519 Master Key provisioned successfully in HSM.</span>
              </div>
            ) : (
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowRotateModal(false)}
                  className="px-4 py-2 border border-[#c2c6d6] text-[#565e74] text-xs font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteRotation}
                  disabled={isRotating}
                  className="px-4 py-2 bg-[#0058be] text-white text-xs font-semibold rounded-lg hover:bg-[#2170e4] flex items-center gap-1.5"
                >
                  {isRotating && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isRotating ? 'Provisioning...' : 'Confirm Key Rotation'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
