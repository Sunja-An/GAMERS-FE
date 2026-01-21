'use client';

import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Users, 
  Shield, 
  Trophy, 
  ClipboardList,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Crown,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { ContestResponse } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { contestService } from '@/services/contest-service';
import { Loader2, AlertCircle } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'ホーム', id: 'Home', icon: LayoutDashboard },
  { name: 'ゲーム一覧', id: 'Game List', icon: Gamepad2 },
  { name: '参加者一覧', id: 'Member List', icon: Users },
  { name: 'マイチーム', id: 'My Team', icon: Shield },
  { name: 'トーナメント表', id: 'Bracket', icon: Trophy },
  { name: '結果', id: 'Result', icon: ClipboardList },
];

// --- Mock Data for unsupported features ---
const MOCK_MY_TEAM = {
    name: "Night City Runners",
    capacity: 5,
    members: [
        { id: 1, name: "V_Cyberpunk", role: "Captain", avatarColor: "bg-neon-cyan" },
        { id: 2, name: "Jackie_W", role: "Fragger", avatarColor: "bg-red-500" },
        { id: 3, name: "Judy_Tech", role: "Support", avatarColor: "bg-neon-purple" },
    ]
};

const MOCK_RESULTS = [
    { rank: 1, team: "Night City Runners", win: 15, lose: 2, prize: "$10,000" },
    { rank: 2, team: "Arasaka Corp", win: 14, lose: 3, prize: "$5,000" },
    { rank: 3, team: "Militech Ops", win: 12, lose: 5, prize: "$2,500" },
    { rank: 4, team: "Kang Tao", win: 10, lose: 7, prize: "$1,000" },
    { rank: 5, team: "Aldecaldos", win: 8, lose: 9, prize: "-" },
];

const MOCK_BRACKET_ROUNDS = [
  {
    id: 'quarter',
    name: '準々決勝',
    matches: [
      { id: 'm1', t1: 'Runners', t2: 'Arasaka', t1Score: 2, t2Score: 1, winner: 'Runners', status: 'finished' },
      { id: 'm2', t1: 'Militech', t2: 'Kang Tao', t1Score: 0, t2Score: 2, winner: 'Kang Tao', status: 'finished' },
      { id: 'm3', t1: 'Aldecaldos', t2: 'Mox', t1Score: 1, t2Score: 2, winner: 'Mox', status: 'finished' },
      { id: 'm4', t1: 'Animals', t2: 'Voodoo', t1Score: 0, t2Score: 0, winner: null, status: 'scheduled' },
    ]
  },
  {
    id: 'semi',
    name: '準決勝',
    matches: [
      { id: 'm5', t1: 'Runners', t2: 'Kang Tao', t1Score: 0, t2Score: 0, winner: null, status: 'scheduled' },
      { id: 'm6', t1: 'Mox', t2: 'TBD', t1Score: 0, t2Score: 0, winner: null, status: 'tbd' },
    ]
  },
  {
    id: 'final',
    name: '決勝',
    matches: [
      { id: 'm7', t1: 'TBD', t2: 'TBD', t1Score: 0, t2Score: 0, winner: null, status: 'tbd' },
    ]
  }
];

interface PlaygroundMainProps {
  contest: ContestResponse;
}

export default function PlaygroundMain({ contest }: PlaygroundMainProps) {
  const [activeTab, setActiveTab] = useState('Home');
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Sidebar Stagger Animation
  useGSAP(() => {
    gsap.fromTo('.menu-item', 
      { x: -30, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: 'power2.out',
        delay: 0.5 
      }
    );
  }, { scope: sidebarRef });

  const renderContent = () => {
    switch (activeTab) {
      case 'Home': return <HomeView contest={contest} />;
      case 'Game List': return <GameListView contestId={contest.contest_id} />;
      case 'Member List': return <MemberListView contestId={contest.contest_id} />;
      case 'My Team': return <MyTeamView />;
      case 'Bracket': return <BracketView />;
      case 'Result': return <ResultView />;
      default: return <HomeView contest={contest} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* List Section (Navigation) */}
      <aside className="lg:col-span-1 flex flex-col gap-4" ref={sidebarRef}>
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md shadow-lg sticky top-8">
          <h2 className="text-lg font-semibold text-neon-purple mb-6 flex items-center gap-2">
            <span className="w-1 h-5 bg-neon-purple rounded-full shadow-[0_0_8px_#b23aff]"></span>
            メニュー
          </h2>
          <nav className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`menu-item w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group flex items-center gap-3 ${
                  activeTab === item.id
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon
                  size={18}
                  className={`transition-colors ${
                    activeTab === item.id ? 'text-neon-cyan' : 'group-hover:text-white'
                  }`}
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* View Section (Content) */}
      <main className="lg:col-span-3 min-h-[500px]">
        {renderContent()}
      </main>
    </div>
  );
}

// --- Views ---

function HomeView({ contest }: { contest: ContestResponse }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
       <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 border-b border-neutral-800 pb-4">
            <LayoutDashboard className="text-neon-cyan" size={32} />
            {contest.title}
          </h2>
          
          <div className="prose prose-invert prose-p:text-neutral-400 prose-headings:text-white prose-a:text-neon-cyan prose-strong:text-white max-w-none">
            <p className="text-neutral-300 whitespace-pre-wrap">{contest.description || '大会の説明はありません。'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-neutral-800">
             <div className="p-4 rounded-xl bg-deep-black/50 border border-neutral-800 flex justify-between items-center group hover:border-neon-cyan/30 transition-colors cursor-default">
                <span className="text-sm text-gray-500">ステータス</span>
                <div className="text-xl text-neon-cyan font-bold drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                    {contest.contest_status === 'ACTIVE' ? '開催中' : 
                     contest.contest_status === 'PENDING' ? '準備中' :
                     contest.contest_status === 'RECRUITING' ? '募集中' :
                     contest.contest_status === 'FINISHED' ? '終了' : 
                     contest.contest_status === 'CANCELLED' ? '中止' : contest.contest_status}
                </div>
             </div>
              <div className="p-4 rounded-xl bg-deep-black/50 border border-neutral-800 flex justify-between items-center group hover:border-neon-purple/30 transition-colors cursor-default">
                <span className="text-sm text-gray-500">参加チーム / 上限</span>
                <div className="text-xl text-white font-bold">{Math.floor((contest.total_team_member || 0) / 5)} / {contest.max_team_count || '∞'}</div>
             </div>
             <div className="p-4 rounded-xl bg-deep-black/50 border border-neutral-800 flex justify-between items-center group hover:border-neon-purple/30 transition-colors cursor-default">
                <span className="text-sm text-gray-500">ゲームタイプ</span>
                <div className="text-xl text-white font-bold">{contest.game_type}</div>
             </div>
          </div>
       </div>
    </div>
  );
}

function GameListView({ contestId }: { contestId: number }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const { data: gamesResponse, isLoading } = useQuery({
      queryKey: ['contest-games', contestId],
      queryFn: () => contestService.getContestGames(contestId)
  });

  const games = gamesResponse?.data || [];

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
      return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-neon-cyan"/></div>;
  }

  return (
    <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Gamepad2 className="text-neon-cyan" />
        ゲーム一覧
      </h2>
      
      {games.length === 0 ? (
          <div className="text-neutral-500 text-center py-8">ゲームが登録されていません。</div>
      ) : (
        <div className="space-y-3">
            {games.map((game) => {
                const isExpanded = expandedId === game.game_id;
                return (
                <div 
                    key={game.game_id} 
                    className={`rounded-xl border transition-all duration-300 overflow-hidden will-change-transform hover:-translate-y-1 hover:bg-gradient-to-r hover:from-neutral-900 hover:to-neon-purple/5 ${
                    isExpanded 
                        ? 'bg-neutral-900/60 border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.05)]' 
                        : 'bg-neutral-900/30 border-neutral-800 hover:border-neon-purple/50'
                    }`}
                >
                    <button 
                    onClick={() => toggleAccordion(game.game_id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    >
                        <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                            isExpanded ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-neutral-800 text-neutral-500'
                        }`}>
                            <Gamepad2 size={24} />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg transition-colors ${isExpanded ? 'text-white' : 'text-neutral-300'}`}>
                            Game #{game.game_id}
                            </h3>
                            <p className="text-xs text-neutral-500 font-mono tracking-wide">Status: {game.game_status}</p>
                        </div>
                        </div>
                        {isExpanded ? <ChevronUp className="text-neon-cyan" /> : <ChevronDown className="text-neutral-600" />}
                    </button>
                    
                    <div 
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                    >
                    <div className="overflow-hidden">
                        <div className="p-5 pt-0 border-t border-white/5 text-neutral-400 text-sm leading-relaxed space-y-4">
                        <div>
                            <strong className="text-white block mb-1">形式</strong>
                            {game.game_team_type}
                        </div>
                        <div className="p-3 rounded-lg bg-deep-black/30 border border-white/5">
                            <strong className="text-neon-purple block mb-1 text-xs uppercase tracking-wider">作成日</strong>
                            {new Date(game.created_at).toLocaleDateString()}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                );
            })}
        </div>
      )}
    </div>
  );
}

function MemberListView({ contestId }: { contestId: number }) {
  const HAS_MY_TEAM = false; // Disable until My Team feature fully implemented or verified
  const { addToast } = useToast();

  const { data: membersResponse, isLoading } = useQuery({
      queryKey: ['contest-members', contestId],
      queryFn: () => contestService.getContestMembers(contestId)
  });

  const members = membersResponse?.data?.data || [];

  if (isLoading) {
      return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-neon-cyan"/></div>;
  }

  return (
    <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
         <Users className="text-neon-cyan" />
         参加者一覧
      </h2>
      
      {members.length === 0 ? (
          <div className="text-neutral-500 text-center py-8">参加者がいません。</div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 text-sm font-medium text-neutral-500 uppercase tracking-wider">
              <th className="py-4 px-4">名前</th>
              <th className="py-4 px-4">タグ</th>
              <th className="py-4 px-4">参加日</th>
              <th className="py-4 px-4 text-right">ポイント</th>
              {HAS_MY_TEAM && <th className="py-4 px-4 text-right">操作</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {members.map((member) => (
              <tr key={member.user_id} className="group hover:bg-gradient-to-r hover:from-neutral-900 hover:to-neon-purple/10 transform transition-all duration-300 hover:-translate-y-1 will-change-transform text-sm">
                <td className="py-4 px-4 font-medium text-white flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 flex items-center justify-center text-xs font-bold ring-1 ring-white/10 group-hover:ring-neon-cyan/50 transition-all">
                      {member.username.substring(0,2).toUpperCase()}
                   </div>
                   {member.username}
                </td>
                <td className="py-4 px-4 text-neutral-400 font-mono text-xs">#{member.tag}</td>
                <td className="py-4 px-4 text-neutral-400 text-xs">
                     {new Date(member.join_date).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-right text-white font-mono">{member.point.toLocaleString()}</td>
                {HAS_MY_TEAM && (
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => addToast(`${member.username}を招待しました！`, 'success')}
                      className="text-xs bg-neon-purple/10 text-neon-purple border border-neon-purple/30 hover:bg-neon-purple hover:text-white px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ml-auto"
                    >
                      <UserPlus size={14} /> 招待
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
}

function MyTeamView() {
  const { name, members, capacity } = MOCK_MY_TEAM;
  const emptySlots = Math.max(0, capacity - members.length);
  const { addToast } = useToast();

  return (
    <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
           <Shield className="text-neon-cyan" />
           {name}
        </h2>
        <div className="text-sm text-neutral-500 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900">
           定員: <span className="text-white font-bold">{members.length}</span> / {capacity}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {members.map((member) => (
             <div key={member.id} className="relative p-6 rounded-xl bg-gradient-to-br from-neutral-800/40 to-neutral-900/40 border border-neutral-700/50 hover:border-neon-cyan/40 transition-all duration-300 hover:-translate-y-1 will-change-transform group">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-full ${member.avatarColor} flex items-center justify-center text-black font-bold text-lg shadow-lg`}>
                      {member.name.substring(0,1).toUpperCase()}
                   </div>
                   <div>
                      <div className="text-white font-bold text-lg">{member.name}</div>
                      <div className="text-xs text-neon-cyan uppercase tracking-wider font-semibold">{member.role}</div>
                   </div>
                </div>
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-2 h-2 rounded-full bg-neon-cyan box-shadow-[0_0_5px_#00f3ff]"></div>
                </div>
             </div>
         ))}

         {Array.from({ length: emptySlots }).map((_, idx) => (
             <div key={`empty-${idx}`} className="p-6 rounded-xl border-2 border-dashed border-neutral-800 bg-neutral-900/20 flex flex-col items-center justify-center gap-2 min-h-[100px] text-neutral-600 hover:text-neutral-400 hover:border-neutral-700 transition-colors">
                <UserPlus size={24} />
                <span className="text-sm font-medium">空き枠</span>
             </div>
         ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-800 flex justify-end">
          <button 
             onClick={() => addToast('招待リンクをコピーしました！', 'success')}
             className="bg-neon-cyan text-black px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all"
          >
             メンバーを招待
          </button>
      </div>
    </div>
  );
}

function BracketView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Animate connector lines
    gsap.fromTo('.bracket-line', 
      { width: 0 }, 
      { width: '2rem', duration: 1.5, ease: 'power2.inOut', stagger: 0.2 } 
    );
    
    // Animate glow for winner lines
    gsap.to('.winner-line', {
      boxShadow: '0 0 10px #00f3ff',
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 overflow-x-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
         <Trophy className="text-neon-cyan" />
         トーナメント表
      </h2>
      
      <div className="flex gap-16 min-w-[800px]">
         {MOCK_BRACKET_ROUNDS.map((round, rIndex) => (
            <div key={round.id} className="flex flex-col flex-1 gap-8">
               <h3 className="text-center text-neutral-500 text-sm font-mono uppercase tracking-widest mb-4 border-b border-neutral-800 pb-2">
                 {round.name}
               </h3>
               
               <div className="flex flex-col justify-around h-full gap-8">
                  {round.matches.map((match) => {
                     const isP1Winner = match.winner === match.t1 && match.status === 'finished';
                     const isP2Winner = match.winner === match.t2 && match.status === 'finished';

                     return (
                        <div key={match.id} className="relative flex flex-col justify-center">
                           <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-3 w-48 shadow-lg relative z-10 transition-transform hover:scale-105 duration-300">
                              <div className={`flex justify-between items-center mb-2 pb-2 border-b border-neutral-800 ${isP1Winner ? 'text-neon-cyan font-bold' : 'text-neutral-400'}`}>
                                 <span>{match.t1}</span>
                                 <span className="bg-neutral-800 px-2 py-0.5 rounded text-xs text-white">{match.t1Score}</span>
                              </div>
                              <div className={`flex justify-between items-center ${isP2Winner ? 'text-neon-cyan font-bold' : 'text-neutral-400'}`}>
                                 <span>{match.t2}</span>
                                 <span className="bg-neutral-800 px-2 py-0.5 rounded text-xs text-white">{match.t2Score}</span>
                              </div>
                              
                              {match.status === 'scheduled' && (
                                <div className="absolute -top-2 -right-2 bg-neutral-800 text-neutral-500 text-[10px] px-2 py-0.5 rounded-full border border-neutral-700">LIVE</div>
                              )}
                           </div>
                           
                           {/* Connecting Line Animation */}
                           {rIndex < MOCK_BRACKET_ROUNDS.length - 1 && (
                              <div className={`bracket-line absolute top-1/2 -right-8 h-[2px] w-8 origin-left ${match.winner ? 'winner-line bg-neon-cyan' : 'bg-neutral-800'}`}></div>
                           )}
                        </div>
                     )
                  })}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}

function ResultView() {
  return (
    <div className="p-8 rounded-2xl bg-neutral-900/30 border border-neutral-800 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
         <ClipboardList className="text-neon-cyan" />
         結果
      </h2>

      <div className="overflow-hidden rounded-xl border border-neutral-800">
         <table className="w-full text-left">
            <thead className="bg-neutral-900 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
               <tr>
                  <th className="p-4">順位</th>
                  <th className="p-4">チーム名</th>
                  <th className="p-4 text-center">W / L</th>
                  <th className="p-4 text-right">賞品</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-900/50">
               {MOCK_RESULTS.map((res) => {
                  const isFirst = res.rank === 1;
                  return (
                     <tr key={res.rank} className={`group transition-colors ${isFirst ? 'bg-yellow-500/5 hover:bg-yellow-500/10' : 'hover:bg-neutral-800/50'}`}>
                        <td className="p-4">
                           {isFirst ? (
                              <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 border border-yellow-500/40 shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                                 <Crown size={16} />
                              </div>
                           ) : (
                              <span className="text-neutral-500 font-mono w-8 h-8 flex items-center justify-center">#{res.rank}</span>
                           )}
                        </td>
                        <td className={`p-4 font-bold ${isFirst ? 'text-yellow-400 text-lg' : 'text-white'}`}>
                           {res.team}
                        </td>
                        <td className="p-4 text-center text-neutral-400 font-mono">
                           <span className="text-green-500">{res.win}</span>
                           <span className="mx-1 opacity-30">/</span>
                           <span className="text-red-500">{res.lose}</span>
                        </td>
                        <td className={`p-4 text-right font-mono ${isFirst ? 'text-yellow-400 font-bold' : 'text-neutral-300'}`}>
                           {res.prize}
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
    </div>
  );
}
