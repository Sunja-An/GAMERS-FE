import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button";
import FormInput from "@/shared/ui/FormInput";
import SocialLoginButton from "@/features/auth/ui/SocialLoginButton";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    navigate("/main");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-2">
            GAMERS
          </h1>
          <p className="text-white/70">ログインしてゲームを始めましょう</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <FormInput
              label="メールアドレス"
              type="email"
              placeholder="your@email.com"
              required
            />
            <FormInput
              label="パスワード"
              type="password"
              placeholder="••••••••"
              required
            />

            <Button type="submit" variant="primary" size="large" className="w-full">
              ログイン
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/50">または</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <SocialLoginButton provider="google" />
              <SocialLoginButton provider="github" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/70">
              アカウントをお持ちでないですか?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary hover:underline"
              >
                新規登録
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
