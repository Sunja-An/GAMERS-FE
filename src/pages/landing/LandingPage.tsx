import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/shared/ui/Button";
import FeatureCard from "@/shared/ui/FeatureCard";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const navigate = useNavigate();
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroCardsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Section Animation
      if (heroTextRef.current) {
        gsap.from(heroTextRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: "power3.out",
        });
      }

      if (heroCardsRef.current) {
        gsap.from(heroCardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Features Section Animation
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            markers: false,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      // Steps Section Animation
      if (stepsRef.current) {
        gsap.from(stepsRef.current.children, {
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            markers: false,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      // CTA Section Animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            markers: false,
            invalidateOnRefresh: true,
          },
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });

    // Refresh ScrollTrigger after layout changes
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <section className="min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-20 py-20 lg:py-32 gap-12 lg:gap-20 relative flex-col lg:flex-row text-center lg:text-left">
        <div ref={heroTextRef} className="flex-1 max-w-[600px] lg:max-w-[600px] w-full">
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold leading-tight mb-6">
            大規模ゲーム管理の
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              新しい基準
            </span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-white/80 mb-10 dark:text-white/80 light:text-black/70">
            10人以上のゲーマーが集まった時、ゲームを簡単かつ効率的に管理しましょう。
            <br />
            GAMERSと一緒なら、すべてのゲームセッションが完璧に調整されます。
          </p>
          <div className="flex gap-5 flex-wrap justify-center lg:justify-start">
            <Button size="large" variant="primary" onClick={() => navigate("/main")}>
              今すぐ始める
            </Button>
            <Button size="large" variant="outline">
              詳しく見る
            </Button>
          </div>
        </div>
        <div ref={heroCardsRef} className="flex-1 relative h-[400px] lg:h-[500px] flex items-center justify-center w-full">
          <div className="absolute top-[10%] left-[10%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 flex items-center gap-4 animate-float light:bg-primary/10 light:border-primary/20">
            <div className="text-3xl">🎮</div>
            <div className="font-semibold text-lg">12名接続中</div>
          </div>
          <div className="absolute top-[50%] right-[10%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 flex items-center gap-4 animate-float [animation-delay:1s] light:bg-primary/10 light:border-primary/20">
            <div className="text-3xl">👥</div>
            <div className="font-semibold text-lg">5チーム有効</div>
          </div>
          <div className="absolute bottom-[15%] left-[20%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-8 py-6 flex items-center gap-4 animate-float [animation-delay:2s] light:bg-primary/10 light:border-primary/20">
            <div className="text-3xl">⚡</div>
            <div className="font-semibold text-lg">リアルタイム同期</div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-20 py-20 lg:py-32 bg-black/20 light:bg-primary/5">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
          なぜGAMERSなのか?
        </h2>
        <p className="text-center text-lg md:text-xl text-white/70 mb-15 dark:text-white/70 light:text-black/70">
          大規模ゲーム管理のためのすべての機能を一つに
        </p>
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          <FeatureCard
            icon="👥"
            title="チーム管理"
            description="参加者を自動でチーム分けし、バランスをリアルタイムで調整します。"
          />
          <FeatureCard
            icon="📊"
            title="リアルタイムステータス"
            description="すべてのゲームセッションの状態を一目で把握し、管理できます。"
          />
          <FeatureCard
            icon="🎯"
            title="カスタム設定"
            description="ゲームルール、時間、ラウンドを自由に設定して保存します。"
          />
          <FeatureCard
            icon="💬"
            title="コミュニケーション機能"
            description="参加者とリアルタイムでコミュニケーションを取り、お知らせを伝えます。"
          />
          <FeatureCard
            icon="📈"
            title="統計＆分析"
            description="ゲーム記録を保存し、詳細な統計を確認できます。"
          />
          <FeatureCard
            icon="🔒"
            title="安全な管理"
            description="権限システムで各役割に応じたアクセス権限を付与します。"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 sm:px-10 lg:px-20 py-20 lg:py-32">
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4">
          簡単な3ステップ
        </h2>
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1000px] mx-auto">
          <div className="text-center px-5 py-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-extrabold text-white">
              1
            </div>
            <h3 className="text-2xl font-bold mb-3">ゲーム作成</h3>
            <p className="text-white/70 leading-relaxed dark:text-white/70 light:text-black/70">
              ゲームの種類とルールを選択し、セッションを作成します。
            </p>
          </div>
          <div className="text-center px-5 py-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-extrabold text-white">
              2
            </div>
            <h3 className="text-2xl font-bold mb-3">参加者招待</h3>
            <p className="text-white/70 leading-relaxed dark:text-white/70 light:text-black/70">
              リンク共有で簡単に参加者を募集します。
            </p>
          </div>
          <div className="text-center px-5 py-10">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center text-3xl font-extrabold text-white">
              3
            </div>
            <h3 className="text-2xl font-bold mb-3">ゲーム開始</h3>
            <p className="text-white/70 leading-relaxed dark:text-white/70 light:text-black/70">
              自動チーム割り当てとリアルタイム管理でゲームを進行します。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="px-6 sm:px-10 lg:px-20 py-20 lg:py-32 text-center bg-gradient-to-br from-primary/10 to-primary-dark/10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          今すぐ始めましょう
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 dark:text-white/80 light:text-black/70">
          無料で始めて、大規模ゲーム管理の便利さを体験しましょう。
        </p>
        <Button size="large" variant="primary" onClick={() => navigate("/main")}>
          無料で始める
        </Button>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 lg:px-20 pt-16 pb-10 bg-black/30 border-t border-white/10 light:bg-black/5 light:border-black/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1200px] mx-auto mb-10">
          <div>
            <h3 className="text-2xl font-extrabold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              GAMERS
            </h3>
            <p className="text-white/70 leading-relaxed dark:text-white/70 light:text-black/70">
              大規模ゲーム管理のための最高のプラットフォーム
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">製品</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  機能
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  価格
                </a>
              </li>
              <li>
                <a
                  href="#docs"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  ドキュメント
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">会社</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  紹介
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  お問い合わせ
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-white/70 hover:text-primary transition-colors dark:text-white/70 light:text-black/70 light:hover:text-primary"
                >
                  プライバシーポリシー
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-white/10 text-white/50 light:border-black/10 light:text-black/50">
          <p>&copy; 2024 GAMERS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
