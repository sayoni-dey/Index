import React, { useState } from 'react';
import { TabType, DocumentItem, ActivityLogItem, SigningKeyItem } from '@/types';
import { initialDocuments, initialActivities, initialKeys } from '@/data/mockData';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard//Header';
import { OverviewView } from '@/components/dashboard//OverviewView';
import { SignedCommunicationsView } from '@/components/dashboard//SignedCommunicationsView';
import { UploadSignView } from '@/components/dashboard//UploadSignView';
import { VerificationActivityView } from '@/components/dashboard//VerificationActivityView';
import { SigningKeysView } from '@/components/dashboard//SigningKeysView';
import { InstitutionProfileView } from '@/components/dashboard//InstitutionProfileView';
import { AuditLogView } from '@/components/dashboard//AuditLogView';
import { SettingsView } from '@/components/dashboard//SettingsView';
import { DocumentDetailModal } from '@/components/dashboard//DocumentDetailModal';
import { NewSignatureModal } from '@/components/dashboard//NewSignatureModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [activities, setActivities] = useState<ActivityLogItem[]>(initialActivities);
  const [keys, setKeys] = useState<SigningKeyItem[]>(initialKeys);

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [newSignatureOpen, setNewSignatureOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);

    // Add activity log
    const newActivity: ActivityLogItem = {
      id: `act-${Date.now()}`,
      type: 'signed',
      title: 'Document Signed',
      description: newDoc.title,
      hash: newDoc.shortHash,
      timestamp: 'Just now',
      actor: 'SOA Security Bureau (Admin.JDoe)',
      status: 'success'
    };
    setActivities((prev) => [newActivity, ...prev]);
    showToast(`Cryptographic signature created for ${newDoc.title}`);
  };

  const handleDirectUploadFile = async (file: File) => {
    let computedHash = '0x' + Math.random().toString(16).substring(2) + 'a8b94109283741829037418290138401928471928aa76b1298d0';
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const byteArray = new Uint8Array(hashBuffer);
      computedHash = '0x' + [...byteArray].map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // fallback
    }

    const short = computedHash.slice(0, 5) + '...' + computedHash.slice(-4);
    const signature = `ed25519:${computedHash.slice(2, 28)}9019283741829037418290138401928471928${Math.random().toString(16).slice(2, 8)}`;

    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: file.name,
      type: file.name.endsWith('.png') || file.name.endsWith('.jpg') ? 'image' : file.name.endsWith('.json') ? 'json' : 'pdf',
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
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
      category: 'Public Advisory',
      description: 'Document uploaded and signed via Trustline direct protocol dropzone.'
    };

    handleAddDocument(newDoc);
    setSelectedDoc(newDoc);
  };

  return (
    <div className="bg-[#f9f9ff] text-[#191b23] font-['Inter',sans-serif] h-screen overflow-hidden flex selection:bg-[#0058be] selection:text-white">
      {/* Side Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onLogoutClick={() => showToast('Session locked. Re-authenticate via FIPS Hardware Key.')}
      />

      {/* Main Content Canvas */}
      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden bg-white relative">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0058be]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#565e74]/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top App Bar */}
        <Header
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={(q) => {
            setSearchQuery(q);
            if (q.trim() && activeTab !== 'signed-communications') {
              setActiveTab('signed-communications');
            }
          }}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenNewSignature={() => setNewSignatureOpen(true)}
        />

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 relative z-10">
          <div className="max-w-[1440px] mx-auto">
            {activeTab === 'overview' && (
              <OverviewView
                documents={documents}
                activities={activities}
                keys={keys}
                onOpenNewSignature={() => setNewSignatureOpen(true)}
                onSelectDocument={setSelectedDoc}
                onNavigateToKeys={() => setActiveTab('signing-keys')}
                onNavigateToSignedDocs={() => setActiveTab('signed-communications')}
                onNavigateToFailures={() => setActiveTab('verification-activity')}
                onDirectUploadFile={handleDirectUploadFile}
              />
            )}

            {activeTab === 'signed-communications' && (
              <SignedCommunicationsView
                documents={documents}
                onSelectDocument={setSelectedDoc}
                onOpenNewSignature={() => setNewSignatureOpen(true)}
                initialSearchQuery={searchQuery}
              />
            )}

            {activeTab === 'upload-sign' && (
              <UploadSignView
                keys={keys}
                onAddDocument={handleAddDocument}
                onSelectDocument={setSelectedDoc}
              />
            )}

            {activeTab === 'verification-activity' && (
              <VerificationActivityView />
            )}

            {activeTab === 'signing-keys' && (
              <SigningKeysView keys={keys} />
            )}

            {activeTab === 'institution-profile' && (
              <InstitutionProfileView />
            )}

            {activeTab === 'audit-log' && (
              <AuditLogView activities={activities} />
            )}

            {activeTab === 'settings' && (
              <SettingsView />
            )}
          </div>
        </div>
      </main>

      {/* Document Detail & Proof Modal */}
      {selectedDoc && (
        <DocumentDetailModal
          document={selectedDoc}
          onClose={() => setSelectedDoc(null)}
        />
      )}

      {/* New Signature Modal */}
      <NewSignatureModal
        isOpen={newSignatureOpen}
        onClose={() => setNewSignatureOpen(false)}
        keys={keys}
        onAddDocument={handleAddDocument}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#191b23] text-white text-xs px-4 py-2.5 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 border border-white/10">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
