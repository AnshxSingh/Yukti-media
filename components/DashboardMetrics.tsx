import React from 'react';
import { TrendingUp, Users, Eye, Play } from 'lucide-react';

export default function DashboardMetrics() {
  return (
    <div className="w-full max-w-[960px] mx-auto px-4 py-6">
      <div className="rounded-2xl border border-[#6a5a2f]/40 bg-[#2a2414]/90 p-5 sm:p-7 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#6a5a2f]/30 pb-5 mb-6">
          <div>
            <span className="text-[#fac638] text-xs font-bold uppercase tracking-wider">Performance Analytics</span>
            <h3 className="text-white text-xl sm:text-2xl font-bold mt-1">Client Growth Dashboard</h3>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span>+142% Avg. Viewership Growth</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#352d18]/60 border border-[#6a5a2f]/30">
            <div className="flex items-center justify-between text-[#ccbc8e] text-xs font-medium mb-2">
              <span>Total Views</span>
              <Eye className="w-4 h-4 text-[#fac638]" />
            </div>
            <div className="text-white text-2xl font-black">18.4M+</div>
            <div className="text-[#22c55e] text-xs font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +28.4% this month
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#352d18]/60 border border-[#6a5a2f]/30">
            <div className="flex items-center justify-between text-[#ccbc8e] text-xs font-medium mb-2">
              <span>Reels Edited</span>
              <Play className="w-4 h-4 text-[#fac638]" />
            </div>
            <div className="text-white text-2xl font-black">450+</div>
            <div className="text-[#ccbc8e] text-xs font-medium mt-1">High-retention formats</div>
          </div>

          <div className="p-4 rounded-xl bg-[#352d18]/60 border border-[#6a5a2f]/30">
            <div className="flex items-center justify-between text-[#ccbc8e] text-xs font-medium mb-2">
              <span>Websites Built</span>
              <span className="text-[#fac638] font-bold">⚡</span>
            </div>
            <div className="text-white text-2xl font-black">28+</div>
            <div className="text-[#22c55e] text-xs font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Sub-1s load times
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#352d18]/60 border border-[#6a5a2f]/30">
            <div className="flex items-center justify-between text-[#ccbc8e] text-xs font-medium mb-2">
              <span>Happy Clients</span>
              <Users className="w-4 h-4 text-[#fac638]" />
            </div>
            <div className="text-white text-2xl font-black">100%</div>
            <div className="text-[#fac638] text-xs font-semibold mt-1">5-Star Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
