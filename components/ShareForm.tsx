import React, { useState } from 'react';
import { Button } from './Button';
import { MailIcon } from './icons/MailIcon';
import { CopyIcon } from './icons/CopyIcon';
import { DownloadIcon } from './icons/DownloadIcon';


interface ShareFormProps {
  summaryText: string;
}

export const ShareForm: React.FC<ShareFormProps> = ({ summaryText }) => {
  const [recipients, setRecipients] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShareByEmail = () => {
    if (!recipients) {
      alert('Please enter at least one recipient email address.');
      return;
    }
    const subject = 'Meeting Summary';
    const body = `Here is the meeting summary:\n\n${summaryText}`;
    const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    // Using location.href is a more reliable way to trigger mailto links
    window.location.href = mailtoLink;
  };

  const handleCopyToClipboard = () => {
    if(!summaryText) return;
    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, (err) => {
      console.error('Could not copy text: ', err);
      alert('Failed to copy summary to clipboard.');
    });
  };

  const handleDownload = () => {
    if(!summaryText) return;
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meeting-summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-t border-slate-700 mt-4">
      <h3 className="font-semibold text-slate-300">Share & Export Summary</h3>
      
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleCopyToClipboard} disabled={!summaryText || copied}>
          <CopyIcon className="w-5 h-5 mr-2" />
          {copied ? 'Copied!' : 'Copy Summary'}
        </Button>
        <Button onClick={handleDownload} disabled={!summaryText}>
          <DownloadIcon className="w-5 h-5 mr-2" />
          Download .txt
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="email"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="Recipient emails (comma-separated)"
          className="flex-grow w-full p-2 bg-slate-900 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          aria-label="Recipient emails"
        />
        <Button onClick={handleShareByEmail} disabled={!recipients || !summaryText} className="w-full sm:w-auto">
          <MailIcon className="w-5 h-5 mr-2" />
          Share via Email
        </Button>
      </div>
    </div>
  );
};
