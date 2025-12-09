import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button";

interface HeaderProps {
  showCreateButton?: boolean;
  showMyPageButton?: boolean;
  showLogoutButton?: boolean;
}

export default function Header({
  showCreateButton = false,
  showMyPageButton = true,
  showLogoutButton = false,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="px-[5%] py-6 border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <h1
          className="text-3xl font-extrabold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
          onClick={() => navigate("/main")}
        >
          GAMERS
        </h1>
        <div className="flex gap-4">
          {showMyPageButton && (
            <Button
              size="small"
              variant="outline"
              onClick={() => navigate("/mypage")}
            >
              マイページ
            </Button>
          )}
          {showLogoutButton ? (
            <Button
              size="small"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              ログアウト
            </Button>
          ) : (
            <Button
              size="small"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              ログイン
            </Button>
          )}
          {showCreateButton && (
            <Button size="small" variant="primary">
              大会を作成
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
