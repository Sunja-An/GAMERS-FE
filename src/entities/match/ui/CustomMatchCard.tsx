import Button from "@/shared/ui/Button";

export interface CustomMatch {
  id: string;
  title: string;
  gameMode: string;
  players: number;
  maxPlayers: number;
  host: string;
  status: "waiting" | "in-progress" | "completed";
  createdAt: string;
}

interface CustomMatchCardProps {
  match: CustomMatch;
}

const getStatusColor = (status: CustomMatch["status"]) => {
  switch (status) {
    case "waiting":
      return "text-yellow-400";
    case "in-progress":
      return "text-green-400";
    case "completed":
      return "text-gray-400";
  }
};

const getStatusText = (status: CustomMatch["status"]) => {
  switch (status) {
    case "waiting":
      return "待機中";
    case "in-progress":
      return "進行中";
    case "completed":
      return "完了";
  }
};

export default function CustomMatchCard({ match }: CustomMatchCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-bold">{match.title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                match.status
              )}`}
            >
              {getStatusText(match.status)}
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/70">
            <span className="flex items-center gap-2">🎮 {match.gameMode}</span>
            <span className="flex items-center gap-2">
              👥 {match.players}/{match.maxPlayers}
            </span>
            <span className="flex items-center gap-2">
              👤 ホスト: {match.host}
            </span>
            <span className="flex items-center gap-2">🕐 {match.createdAt}</span>
          </div>
        </div>
        <div className="flex gap-3">
          {match.status === "waiting" && (
            <>
              <Button size="small" variant="outline">
                観戦
              </Button>
              <Button size="small" variant="primary">
                参加する
              </Button>
            </>
          )}
          {match.status === "in-progress" && (
            <Button size="small" variant="outline">
              観戦
            </Button>
          )}
          {match.status === "completed" && (
            <Button size="small" variant="outline">
              結果を見る
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
