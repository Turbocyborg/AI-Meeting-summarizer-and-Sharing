
import React, { useState } from 'react';
import { Button } from './Button';
import { ShareIcon } from './icons/ShareIcon';

interface ShareFormProps {
  summaryText: string;
}

export const ShareForm: React.FC<ShareFormProps> = ({ summaryText }) => {
  const [recipients, setRecipients] = useState('');

  const handleShare = () => {
    if (!recipients) {
      alert('Please enter at least one recipient email address.');
      return;
    }
    const subject = 'Meeting Summary';
    const body = `Here is the meeting summary:\n\n${summaryText}`;
    const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-t border-slate-700 mt-4">
      <h3 className="font-semibold text-slate-300">Share Summary</h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="Recipient emails (comma-separated)"
          className="flex-grow p-2 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        <Button onClick={handleShare} disabled={!recipients}>
          <ShareIcon className="w-5 h-5 mr-2" />
          Share via Email
        </Button>
      </div>
    </div>
  );
};
