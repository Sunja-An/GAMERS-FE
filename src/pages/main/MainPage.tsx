import Button from "@/shared/ui/Button";
import Header from "@/widgets/header/Header";
import TournamentBanner from "@/widgets/tournament-banner/TournamentBanner";
import type { BannerData } from "@/widgets/tournament-banner/TournamentBanner";
import CustomMatchCard from "@/entities/match/ui/CustomMatchCard";
import type { CustomMatch } from "@/entities/match/ui/CustomMatchCard";

export default function MainPage() {

  const banners: BannerData[] = [
    {
      id: "1",
      emoji: "🏆",
      title: "カスタムゲーム大会 シーズン1",
      description: "最高のチームを決める大規模トーナメントに参加しよう",
      details: {
        schedule: "2024年12月15日 - 12月22日",
        participants: "現在32チーム登録 / 最大64チーム",
        prize: "総賞金 $10,000",
        rules: [
          "✓ 5v5 召喚士の峡谷 基本モード",
          "✓ シングルエリミネーション トーナメント方式",
          "✓ 全チャンピオン使用可能",
          "✓ 決勝戦は3セット2勝先取制",
        ],
      },
    },
    {
      id: "2",
      emoji: "🎮",
      title: "週末スペシャルイベント",
      description: "毎週週末の特別報酬付きカスタムマッチ",
      details: {
        schedule: "毎週土曜日、日曜日 午後2時 - 10時",
        participants: "無制限参加可能",
        prize: "週間ランキングTOP 10報酬",
        rules: [
          "✓ 全ゲームモード対応",
          "✓ 自由なチーム編成",
          "✓ 週末特別ポイント2倍",
          "✓ シーズンパス経験値ボーナス",
        ],
      },
    },
    {
      id: "3",
      emoji: "⚡",
      title: "新規ユーザー歓迎大会",
      description: "初めての方向けの親善大会",
      details: {
        schedule: "毎日午後8時開始",
        participants: "新規登録後7日以内のユーザーのみ",
        prize: "参加者全員に報酬支給",
        rules: [
          "✓ 初心者向けマッチング",
          "✓ メンタリングシステム提供",
          "✓ 親善試合中心",
          "✓ 気軽な雰囲気",
        ],
      },
    },
  ];

  const mockMatches: CustomMatch[] = [
    {
      id: "1",
      title: "カスタム大会 - 決勝戦",
      gameMode: "5v5 召喚士の峡谷",
      players: 8,
      maxPlayers: 10,
      host: "ProGamer123",
      status: "waiting",
      createdAt: "5分前",
    },
    {
      id: "2",
      title: "親善試合",
      gameMode: "5v5 ハウリングアビス",
      players: 10,
      maxPlayers: 10,
      status: "in-progress",
      host: "TeamCaptain",
      createdAt: "15分前",
    },
    {
      id: "3",
      title: "週末トーナメント",
      gameMode: "5v5 召喚士の峡谷",
      players: 10,
      maxPlayers: 10,
      status: "completed",
      host: "WeekendWarrior",
      createdAt: "1時間前",
    },
    {
      id: "4",
      title: "初心者歓迎ゲーム",
      gameMode: "3v3 ねじれた森",
      players: 4,
      maxPlayers: 6,
      status: "waiting",
      host: "NewbieFriendly",
      createdAt: "10分前",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Header showCreateButton showMyPageButton />

      <TournamentBanner banners={banners} />

      {/* Custom Matches List */}
      <section className="px-[5%] py-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">公開カスタムマッチ</h2>
            <div className="flex gap-3">
              <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary">
                <option>全ゲームモード</option>
                <option>5v5 召喚士の峡谷</option>
                <option>5v5 ハウリングアビス</option>
                <option>3v3 ねじれた森</option>
              </select>
              <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-primary">
                <option>全状態</option>
                <option>待機中</option>
                <option>進行中</option>
                <option>完了</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mockMatches.map((match) => (
              <CustomMatchCard key={match.id} match={match} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="medium">
              もっと見る
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
