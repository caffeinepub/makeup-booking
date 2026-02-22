import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberProfileProps {
  name: string;
  title: string;
  bio: string;
  portfolioImages: string[];
}

export default function TeamMemberProfile({ name, title, bio, portfolioImages }: TeamMemberProfileProps) {
  return (
    <Card className="border-2 shadow-elegant overflow-hidden">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Text Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {name}
              </h3>
              <p className="text-lg text-primary font-semibold mb-4">
                {title}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {bio}
              </p>
            </div>
          </div>

          {/* Portfolio Images Grid */}
          <div className="grid grid-cols-2 gap-2 p-2 bg-muted/20">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elegant transition-shadow duration-300 group"
              >
                <img
                  src={image}
                  alt={`${name} portfolio ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
