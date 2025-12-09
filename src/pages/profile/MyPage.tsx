import Header from "@/widgets/header/Header";
import Button from "@/shared/ui/Button";
import StatCard from "@/entities/stats/ui/StatCard";
import MatchCard from "@/entities/match/ui/MatchCard";

export default function MyPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header showMyPageButton={false} showLogoutButton />

      {/* Profile Section */}
      <section className="px-[5%] py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center text-4xl">
                🎮
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold mb-2">ProGamer123</h1>
                <p className="text-white/70">プレイヤーレベル: 42</p>
              </div>
              <Button variant="outline" size="medium">
                プロフィール編集
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="総プレイ時間"
                value="256時間"
                icon="⏱️"
              />
              <StatCard
                label="参加したゲーム"
                value="148試合"
                icon="🎯"
              />
              <StatCard
                label="勝率"
                value="64%"
                icon="🏆"
              />
            </div>
          </div>

          {/* Recent Matches */}
          <div>
            <h2 className="text-2xl font-bold mb-6">最近のマッチ</h2>
            <div className="space-y-4">
              <MatchCard
                title="カスタム大会 - 決勝戦"
                result="勝利"
                score="15-12"
                date="2時間前"
              />
              <MatchCard
                title="親善試合"
                result="敗北"
                score="8-16"
                date="1日前"
              />
              <MatchCard
                title="ランクマッチ"
                result="勝利"
                score="13-10"
                date="2日前"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
