import ChatWindow from '../../components/features/ChatWindow';

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Unified Customer Inbox</h1>
        <p className="text-slate-500 mt-2">Manage WhatsApp, Instagram, and Email chats in one place with AI assistance.</p>
      </div>
      
      <ChatWindow />
    </div>
  );
}