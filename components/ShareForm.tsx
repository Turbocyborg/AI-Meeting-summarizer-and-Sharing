
import React, { useState } from 'react';
import { Button } from './Button';
import { PaperPlaneIcon } from './icons/PaperPlaneIcon';

interface ShareFormProps {
  summaryText: string;
}

export const ShareForm: React.FC<ShareFormProps> = ({ summaryText }) => {
  const [recipients, setRecipients] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleShare = () => {
    setError(null);
    if (!recipients) {
      return;
    }
    
    const emails = recipients.split(',').map(e => e.trim()).filter(Boolean);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter(email => !emailRegex.test(email));

    if (emails.length === 0 || invalidEmails.length > 0) {
      setError('Please enter one or more valid email addresses, separated by commas.');
      return;
    }

    const subject = 'Meeting Summary';
    let body = `Here is the meeting summary:\n\n${summaryText}`;
    
    const mailtoBase = `mailto:${emails.join(',')}` +
                       `?subject=${encodeURIComponent(subject)}`;
    
    const maxBodyLength = 2000 - mailtoBase.length - 100;

    if (encodeURIComponent(body).length > maxBodyLength) {
        let truncatedBody = body;
        // Keep truncating until it fits
        while(encodeURIComponent(truncatedBody).length > maxBodyLength && truncatedBody.length > 0) {
            truncatedBody = truncatedBody.substring(0, truncatedBody.length - 100);
        }
        
        const lastSpace = truncatedBody.lastIndexOf(' ');
        if(lastSpace > 0) {
            truncatedBody = truncatedBody.substring(0, lastSpace);
        }
        body = truncatedBody + "\n\n[...summary truncated due to length limitations.]";
    }

    const mailtoLink = `${mailtoBase}&body=${encodeURIComponent(body)}`;

    if (mailtoLink.length > 2048) {
        setError('Summary is too long to share via email. Please copy/paste it manually.');
        return;
    }

    try {
        window.location.href = mailtoLink;
    } catch (e) {
        console.error("Failed to open mailto link:", e);
        setError("Could not open email client. Please copy the summary and share it manually.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-t border-slate-700 mt-4">
      <h3 className="font-semibold text-slate-300">Share Summary</h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={recipients}
              onChange={(e) => {
                  setRecipients(e.target.value);
                  if (error) setError(null);
              }}
              placeholder="Recipient emails (comma-separated)"
              className={`flex-grow p-2 bg-slate-900 border-2 rounded-lg focus:ring-2 focus:border-indigo-500 transition-colors ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-indigo-500'}`}
              aria-invalid={!!error}
              aria-describedby={error ? "share-error" : undefined}
            />
            <Button onClick={handleShare} disabled={!recipients}>
              <PaperPlaneIcon className="w-5 h-5 mr-2" />
              Share via Email
            </Button>
        </div>
        {error && <p id="share-error" className="text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
};
