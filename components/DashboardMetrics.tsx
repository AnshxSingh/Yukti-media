import React from 'react';
import { TrendingUp, Users, Eye, Play, Zap } from 'lucide-react';

export default function DashboardMetrics() {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 py-10 bg-transparent text-espresso transition-colors duration-300">
      <div className="rounded-3xl border border-purpleborder bg-creamcard p-6 sm:p-8 shadow-xl shadow-purple-950/10 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purpleborder pb-5 mb-6">
          <div>
            <span className="text-purple text-xs font-bold uppercase tracking-wider">Performance Analytics</span>
            <h3 className="text-espresso text-xl sm:text-2xl font-bold mt-1">Client Growth Dashboard</h3>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple/10 border border-purpleborder text-purpledeep dark:text-purplelight text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-purple animate-pulse"></span>
            <span>+142% Avg. Viewership Growth</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-creamsoft border border-purpleborder hover:border-purple transition-all">
            <div className="flex items-center justify-between text-mocha text-xs font-medium mb-2">
              <span>Total Views</span>
              <Eye className="w-4 h-4 text-purple" />
            </div>
            <div className="text-espresso text-2xl font-black">1M+</div>
            <div className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +28.4% this month
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-creamsoft border border-purpleborder hover:border-purple transition-all">
            <div className="flex items-center justify-between text-mocha text-xs font-medium mb-2">
              <span>Reels Edited</span>
              <Play className="w-4 h-4 text-purple" />
            </div>
            <div className="text-espresso text-2xl font-black">300+</div>
            <div className="text-mocha text-xs font-medium mt-1">High-retention formats</div>
          </div>

          <div className="p-4 rounded-2xl bg-creamsoft border border-purpleborder hover:border-purple transition-all">
            <div className="flex items-center justify-between text-mocha text-xs font-medium mb-2">
              <span>Websites Built</span>
              <Zap className="w-4 h-4 text-purple" />
            </div>
            <div className="text-espresso text-2xl font-black">10+</div>
            <div className="text-emerald-500 dark:text-emerald-400 text-xs font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Sub-1s load times
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-creamsoft border border-purpleborder hover:border-purple transition-all">
            <div className="flex items-center justify-between text-mocha text-xs font-medium mb-2">
              <span>Happy Clients</span>
              <Users className="w-4 h-4 text-purple" />
            </div>
            <div className="text-espresso text-2xl font-black">100%</div>
            <div className="text-purpledeep dark:text-purplelight text-xs font-semibold mt-1">5-Star Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}