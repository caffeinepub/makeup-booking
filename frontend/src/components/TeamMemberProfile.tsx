interface TeamMemberProfileProps {
  name: string;
  role: string;
  bio: string;
  portfolioImages: string[];
}

export default function TeamMemberProfile({
  name,
  role,
  bio,
  portfolioImages,
}: TeamMemberProfileProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl mx-auto">
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-display text-2xl font-bold text-foreground mb-1">{name}</h3>
        <p className="text-primary font-medium mb-4">{role}</p>
        <p className="text-muted-foreground leading-relaxed">{bio}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full md:w-72 shrink-0">
        {portfolioImages.slice(0, 4).map((src, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-xl">
            <img
              src={src}
              alt={`${name} portfolio ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
