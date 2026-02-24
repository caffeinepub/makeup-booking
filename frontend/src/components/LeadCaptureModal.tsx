import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateLead } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Sparkles } from 'lucide-react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCategory?: string;
  serviceName?: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  serviceCategory,
  serviceName,
}: LeadCaptureModalProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const [name, setName] = useState(userProfile?.name || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [email, setEmail] = useState(userProfile?.email || '');
  const createLead = useCreateLead();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in your name and phone number');
      return;
    }
    try {
      await createLead.mutateAsync({
        category: serviceCategory || null,
        customerName: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });
      toast.success('Thank you! We\'ll be in touch soon.');
      onClose();
    } catch {
      toast.error('Failed to submit. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-primary" />
            <DialogTitle className="font-display text-xl">Get in Touch</DialogTitle>
          </div>
          <DialogDescription>
            {serviceName
              ? `Interested in ${serviceName}? Leave your details and we'll contact you.`
              : 'Leave your details and our team will reach out to you.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Your Name *</Label>
            <Input
              id="lead-name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone Number *</Label>
            <Input
              id="lead-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email Address</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={createLead.isPending}>
              {createLead.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Enquiry'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
