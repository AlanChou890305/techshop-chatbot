"use client";

type Props = {
  reason: string;
  contact: {
    email: string;
    phone: string;
    hours: string;
  };
};

export default function EscalationBanner({ reason, contact }: Props) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-2 w-full max-w-sm">
      <div className="flex items-center gap-2">
        <span className="text-amber-500 text-base">👤</span>
        <p className="text-sm font-semibold text-amber-800">需要真人協助</p>
      </div>
      {reason && (
        <p className="text-xs text-amber-700">{reason}</p>
      )}
      <div className="space-y-1 pt-1">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2 text-xs text-amber-900 hover:underline"
        >
          <span>✉️</span> {contact.email}
        </a>
        <a
          href={`tel:${contact.phone.replace(/-/g, "")}`}
          className="flex items-center gap-2 text-xs text-amber-900 hover:underline"
        >
          <span>📞</span> {contact.phone}
        </a>
        <p className="text-xs text-amber-600">{contact.hours}</p>
      </div>
    </div>
  );
}
