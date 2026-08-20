import { DocumentItem, ActivityLogItem, SigningKeyItem, VerificationFailureItem } from '../types';

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Emergency Weather Advisory.pdf',
    type: 'pdf',
    fileSize: '2.4 MB',
    hash: '0x8f2a49b291c9e8314bb0283c7491d90019283741893c7849182390a1b9c',
    shortHash: '0x8f2...a1b9',
    signature: 'ed25519:7c9e8f12a938b812f00d8392182bb9019283741829037418290138401928471928',
    algorithm: 'Ed25519 (SHA-256)',
    signer: 'SOA University Security Bureau',
    signerRole: 'Chief Information Security Officer',
    signedAt: '2026-08-20 07:06:50 UTC',
    timeAgo: '2h ago',
    status: 'verified',
    verificationCount: 1420,
    category: 'Public Advisory',
    description: 'Official severe thunderstorm & flood precaution protocol for all campus residence halls and research centers.'
  },
  {
    id: 'doc-2',
    title: 'Campus Closure Map.png',
    type: 'image',
    fileSize: '4.8 MB',
    hash: '0x3e4b78912d09123847a9812739182947192837418290374182901384f7c2',
    shortHash: '0x3e4...f7c2',
    signature: 'ed25519:3b789a12c8e90f124589a12b9019283741829037418290138401928471928ab9',
    algorithm: 'Ed25519 (SHA-256)',
    signer: 'SOA University Facilities Directorate',
    signerRole: 'Director of Campus Operations',
    signedAt: '2026-08-19 14:22:10 UTC',
    timeAgo: 'Yesterday',
    status: 'verified',
    verificationCount: 934,
    category: 'Operations',
    description: 'High-resolution geospatial access map showing gated access corridors and emergency bypass zones.'
  },
  {
    id: 'doc-3',
    title: 'Spring Semester Exam Schedule 2026.pdf',
    type: 'pdf',
    fileSize: '1.1 MB',
    hash: '0x1c89f03418294719283741829037418290138401928471928aa76b1298d0',
    shortHash: '0x1c8...98d0',
    signature: 'ed25519:129037418290138401928471928aa76b1298d07c9e8f12a938b812f00d8392182',
    algorithm: 'Ed25519 (SHA-256)',
    signer: 'Office of the Registrar',
    signerRole: 'University Registrar',
    signedAt: '2026-08-18 10:15:00 UTC',
    timeAgo: '2 days ago',
    status: 'verified',
    verificationCount: 2180,
    category: 'Academics',
    description: 'Cryptographically certified master exam seating, time slots, and verification barcodes.'
  },
  {
    id: 'doc-4',
    title: 'Faculty Research Grant Distribution.json',
    type: 'json',
    fileSize: '340 KB',
    hash: '0x99a2bc418290138401928471928aa76b1298d07c9e8f12a938b812f00881',
    shortHash: '0x99a...0881',
    signature: 'ed25519:99a2bc418290138401928471928aa76b1298d07c9e8f12a938b812f00881aabb',
    algorithm: 'Ed25519 (SHA-256)',
    signer: 'SOA Research Council',
    signerRole: 'Vice Chancellor of Research',
    signedAt: '2026-08-17 16:45:00 UTC',
    timeAgo: '3 days ago',
    status: 'verified',
    verificationCount: 287,
    category: 'Finance',
    description: 'Ledger allocation payload for FY2026 interdisciplinary quantum and AI laboratory grants.'
  }
];

export const initialActivities: ActivityLogItem[] = [
  {
    id: 'act-1',
    type: 'signed',
    title: 'Document Signed',
    description: 'Emergency Weather Advisory.pdf',
    hash: '0x8f2a...1b9c',
    timestamp: '2h ago',
    actor: 'SOA Security Bureau (Admin.JDoe)',
    status: 'success'
  },
  {
    id: 'act-2',
    type: 'upload',
    title: 'Payload Uploaded',
    description: 'Admin.JDoe uploaded 2.4MB PDF',
    timestamp: '2h ago',
    actor: 'Admin.JDoe',
    status: 'success'
  },
  {
    id: 'act-3',
    type: 'auth',
    title: 'Session Authenticated',
    description: 'Institutional MFA Verified',
    timestamp: '3h ago',
    actor: 'Admin.JDoe (Hardware Token #891)',
    status: 'success'
  },
  {
    id: 'act-4',
    type: 'signed',
    title: 'Document Signed',
    description: 'Campus Closure Map.png',
    hash: '0x3e4b...f7c2',
    timestamp: 'Yesterday',
    actor: 'SOA Facilities Directorate',
    status: 'success'
  },
  {
    id: 'act-5',
    type: 'failure',
    title: 'Verification Mismatch Detected',
    description: 'External payload checksum mismatch on admission-notices.pdf',
    hash: '0xfa89...112e',
    timestamp: 'Yesterday',
    actor: 'Public Validator Node #14',
    status: 'warning'
  }
];

export const initialKeys: SigningKeyItem[] = [
  {
    id: 'key-1',
    name: 'SOA University Primary Master Key',
    algorithm: 'Ed25519',
    type: 'primary',
    publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOrXJb7k+qK1F/n5x6Vb+E4KzN1mR+X8s3mG8v7t9L/Q soa.trustline.vault',
    fingerprint: 'SHA256:7mP0eQ9kL5vN1xR+X8s3mG8v7t9L/QOrXJb7k+qK1F/n',
    status: 'active',
    createdAt: '2026-01-01',
    expiresAt: '2026-10-01',
    rotationsDaysLeft: 42,
    signedDocumentsCount: 114,
    hsmEnclave: 'Cloud KMS HSM FIPS 140-3 Level 3 (US-East)'
  },
  {
    id: 'key-2',
    name: 'SOA High-Throughput Batch Signer Key',
    algorithm: 'Ed25519',
    type: 'backup',
    publicKey: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPqXWb8k+qK1F/n5x6Vb+E4KzN1mR+X8s3mG8v7t9L/B soa.batch.vault',
    fingerprint: 'SHA256:9xK1vN1xR+X8s3mG8v7t9L/QOrXJb7k+qK1F/n7mP0eQ',
    status: 'active',
    createdAt: '2026-03-15',
    expiresAt: '2027-03-15',
    rotationsDaysLeft: 207,
    signedDocumentsCount: 14,
    hsmEnclave: 'Cloud KMS HSM FIPS 140-3 Level 3 (US-East)'
  }
];

export const initialVerificationFailures: VerificationFailureItem[] = [
  {
    id: 'fail-1',
    documentTitle: 'SOA_Official_Notice_Admission_2026.pdf',
    attemptedHash: '0xfa89c109283741829037418290138401928471928aa76b1298d07c9e8f112e',
    reason: 'Cryptographic signature digest mismatch (Document modified after signing)',
    originIp: '198.51.100.42 (Frankfurt, DE)',
    timestamp: '2026-08-20 04:12 UTC',
    severity: 'high'
  },
  {
    id: 'fail-2',
    documentTitle: 'Scholarship_Award_Letter_Batch4.pdf',
    attemptedHash: '0x8891029384719283741829037418290138401928471928aa76b1298d07c001',
    reason: 'Signing certificate expired on validator root store',
    originIp: '203.0.113.88 (Tokyo, JP)',
    timestamp: '2026-08-19 22:45 UTC',
    severity: 'medium'
  },
  {
    id: 'fail-3',
    documentTitle: 'Transcript_Certificate_SOAU_89912.pdf',
    attemptedHash: '0x7129037418290138401928471928aa76b1298d07c9e8f12a938b812f001188',
    reason: 'Revoked institutional sub-key used in legacy request',
    originIp: '192.0.2.14 (London, UK)',
    timestamp: '2026-08-19 18:10 UTC',
    severity: 'high'
  },
  {
    id: 'fail-4',
    documentTitle: 'Grade_Report_Spring_2026.pdf',
    attemptedHash: '0x992384719283741829037418290138401928471928aa76b1298d07c9e8f334',
    reason: 'Malformed ASN.1 signature structure',
    originIp: '198.51.100.119 (Sydney, AU)',
    timestamp: '2026-08-18 11:32 UTC',
    severity: 'low'
  },
  {
    id: 'fail-5',
    documentTitle: 'Fee_Receipt_Tuition_90192.pdf',
    attemptedHash: '0x129037418290138401928471928aa76b1298d07c9e8f12a938b812f00445',
    reason: 'Payload truncated during transmission (Hash mismatch)',
    originIp: '203.0.113.19 (San Jose, US)',
    timestamp: '2026-08-17 19:15 UTC',
    severity: 'medium'
  },
  {
    id: 'fail-6',
    documentTitle: 'Faculty_Appointment_Notice.pdf',
    attemptedHash: '0x3384719283741829037418290138401928471928aa76b1298d07c9e8f556',
    reason: 'Invalid canonical JSON schema encoding',
    originIp: '192.0.2.98 (Singapore, SG)',
    timestamp: '2026-08-16 08:44 UTC',
    severity: 'low'
  },
  {
    id: 'fail-7',
    documentTitle: 'Dean_Endorsement_Letter.pdf',
    attemptedHash: '0x779037418290138401928471928aa76b1298d07c9e8f12a938b812f00667',
    reason: 'Unknown institutional public key authority',
    originIp: '198.51.100.201 (Toronto, CA)',
    timestamp: '2026-08-15 14:02 UTC',
    severity: 'high'
  }
];
