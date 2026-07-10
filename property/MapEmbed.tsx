import { MapPin } from "lucide-react";

export default function MapEmbed({ lat, lng, address }: { lat: number; lng: number; address: string }) {
  const delta = 0.006;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <iframe
        title="Localisation du bien"
        src={src}
        className="h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
        <MapPin size={15} className="text-maroon-700" /> {address}
      </div>
    </div>
  );
}
