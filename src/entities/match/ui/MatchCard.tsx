import Button from "@/shared/ui/Button";

interface MatchCardProps {
  title: string;
  result: string;
  score: string;
  date: string;
}

const getResultColor = (result: string) => {
  if (result === "勝利") {
    return "text-green-400 bg-green-400/10 border-green-400/30";
  } else if (result === "敗北") {
    return "text-red-400 bg-red-400/10 border-red-400/30";
  }
  return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
};

export default function MatchCard({ title, result, score, date }: MatchCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="text-xl font-bold">{title}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getResultColor(
                result
              )}`}
            >
              {result}
            </span>
          </div>
          <div className="flex items-center gap-6 text-white/70">
            <span className="flex items-center gap-2">📊 {score}</span>
            <span className="flex items-center gap-2">📅 {date}</span>
          </div>
        </div>
        <Button size="small" variant="outline">
          詳細情報
        </Button>
      </div>
    </div>
  );
}
