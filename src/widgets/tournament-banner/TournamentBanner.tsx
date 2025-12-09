import { useState } from "react";
import Button from "@/shared/ui/Button";

export interface BannerData {
  id: string;
  emoji: string;
  title: string;
  description: string;
  details: {
    schedule?: string;
    participants?: string;
    prize?: string;
    rules?: string[];
  };
}

interface TournamentBannerProps {
  banners: BannerData[];
}

export default function TournamentBanner({ banners }: TournamentBannerProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    setIsBannerExpanded(false);
  };

  const prevBanner = () => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
    setIsBannerExpanded(false);
  };

  const goToBanner = (index: number) => {
    setCurrentBannerIndex(index);
    setIsBannerExpanded(false);
  };

  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="px-[5%] py-8">
      <div className="max-w-[1400px] mx-auto relative">
        <div
          className={`bg-gradient-to-r from-primary/20 to-primary-dark/20 border border-primary/30 rounded-2xl overflow-hidden transition-all duration-300 ${
            isBannerExpanded ? "max-h-[600px]" : "max-h-[200px]"
          }`}
        >
          <div
            className="p-8 cursor-pointer"
            onClick={() => setIsBannerExpanded(!isBannerExpanded)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{currentBanner.emoji}</div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {currentBanner.title}
                  </h2>
                  <p className="text-white/70">{currentBanner.description}</p>
                </div>
              </div>
              <div className="text-2xl transition-transform duration-300">
                {isBannerExpanded ? "▲" : "▼"}
              </div>
            </div>
          </div>

          {isBannerExpanded && (
            <div className="px-8 pb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentBanner.details.schedule && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl mb-3">📅</div>
                    <h3 className="text-xl font-bold mb-2">大会日程</h3>
                    <p className="text-white/70">
                      {currentBanner.details.schedule}
                    </p>
                  </div>
                )}
                {currentBanner.details.participants && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl mb-3">👥</div>
                    <h3 className="text-xl font-bold mb-2">参加チーム</h3>
                    <p className="text-white/70">
                      {currentBanner.details.participants}
                    </p>
                  </div>
                )}
                {currentBanner.details.prize && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <div className="text-3xl mb-3">💰</div>
                    <h3 className="text-xl font-bold mb-2">賞金</h3>
                    <p className="text-white/70">
                      {currentBanner.details.prize}
                    </p>
                  </div>
                )}
              </div>

              {currentBanner.details.rules && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">大会ルール</h3>
                  <ul className="space-y-2 text-white/70">
                    {currentBanner.details.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="primary" size="large">
                  大会に参加申請
                </Button>
                <Button variant="outline" size="large">
                  詳しく見る
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={prevBanner}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextBanner}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToBanner(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentBannerIndex
                  ? "w-8 h-3 bg-primary"
                  : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
