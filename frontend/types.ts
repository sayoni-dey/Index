export type TabType =
  | 'overview'
  | 'signed-communications'
  | 'upload-sign'
  | 'verification-activity'
  | 'signing-keys'
  | 'institution-profile'
  | 'audit-log'
  | 'settings';

export interface DocumentItem {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'json' | 'doc';
  fileSize: string;
  hash: string;
  shortHash: string;
  signature: string;
  algorithm: string;
  signer: string;
  signerRole: string;
  signedAt: string;
  timeAgo: string;
  status: 'verified' | 'pending' | 'revoked' | 'failed';
  verificationCount: number;
  category: string;
  previewUrl?: string;
  description?: string;
}

export interface ActivityLogItem {
  id: string;
  type: 'signed' | 'upload' | 'auth' | 'revoked' | 'failure';
  title: string;
  description: string;
  hash?: string;
  timestamp: string;
  actor: string;
  status?: 'success' | 'warning' | 'error';
}

export interface SigningKeyItem {
  id: string;
  name: string;
  algorithm: 'Ed25519' | 'ECDSA (P-256)' | 'RSA-PSS 4096';
  type: 'primary' | 'backup' | 'archived';
  publicKey: string;
  fingerprint: string;
  status: 'active' | 'expiring' | 'revoked';
  createdAt: string;
  expiresAt: string;
  rotationsDaysLeft: number;
  signedDocumentsCount: number;
  hsmEnclave: string;
}

export interface VerificationFailureItem {
  id: string;
  documentTitle: string;
  attemptedHash: string;
  reason: string;
  originIp: string;
  timestamp: string;
  severity: 'high' | 'medium' | 'low';
}
