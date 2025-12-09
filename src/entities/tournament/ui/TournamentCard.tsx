import Button from "@/shared/ui/Button";

export interface Tournament {
  id: string;
  title: string;
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
  participants: number;
  prize: string;
}

interface TournamentCardProps {
  tournament: Tournament;
}

const getStatusColor = (status: Tournament["status"]) => {
  switch (status) {
    case "upcoming":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    case "ongoing":
      return "text-green-400 bg-green-400/10 border-green-400/30";
    case "completed":
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
};

const getStatusText = (status: Tournament["status"]) => {
  switch (status) {
    case "upcoming":
      return "予定";
    case "ongoing":
      return "進行中";
    case "completed":
      return "完了";
  }
};

export default function TournamentCard({ tournament }: TournamentCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-bold">{tournament.title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                tournament.status
              )}`}
            >
              {getStatusText(tournament.status)}
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/70">
            <span className="flex items-center gap-2">📅 {tournament.startDate}</span>
            <span className="flex items-center gap-2">
              👥 {tournament.participants}チーム
            </span>
            <span className="flex items-center gap-2">💰 {tournament.prize}</span>
          </div>
        </div>
        <Button size="small" variant="outline">
          詳しく見る
        </Button>
      </div>
    </div>
  );
}
