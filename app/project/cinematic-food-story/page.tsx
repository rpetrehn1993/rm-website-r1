import Image from 'next/image';
import Navigation from '../../components/Navigation';

export default function CinematicFoodStory() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Project Content */}
      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="relative h-[1041px]">
              <Image
                src="https://placehold.co/573x1041/333/FFF?text=Cinematic+Food+1"
                alt="Cinematic Food Story 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[570px]">
              <Image
                src="https://placehold.co/856x570/333/FFF?text=Cinematic+Food+2"
                alt="Cinematic Food Story 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[1282px]">
              <Image
                src="https://placehold.co/855x1282/333/FFF?text=Cinematic+Food+3"
                alt="Cinematic Food Story 3"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="relative h-[1087px]">
              <Image
                src="https://placehold.co/816x1087/333/FFF?text=Cinematic+Food+4"
                alt="Cinematic Food Story 4"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[1090px]">
              <Image
                src="https://placehold.co/818x1090/333/FFF?text=Cinematic+Food+5"
                alt="Cinematic Food Story 5"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 