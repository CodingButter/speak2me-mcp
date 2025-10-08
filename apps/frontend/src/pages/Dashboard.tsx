import {
  DashboardGrid,
  MetricCard,
  ChartCard,
  CircularGauge,
  StatBox,
  Button,
} from "@s2m-pac/ui";
import {
  Activity,
  MessageSquare,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export function Dashboard() {
  return (
    <div className="h-full overflow-auto">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Dashboard</h2>

      {/* Metrics Grid */}
      <DashboardGrid columns={4} className="mb-6">
        <MetricCard
          title="Total Conversations"
          value="24"
          description="Active conversations"
          icon={MessageSquare}
          trend="up"
          trendValue="+12% from last week"
        />
        <MetricCard
          title="Messages Today"
          value="156"
          description="Across all conversations"
          icon={Activity}
          trend="up"
          trendValue="+8% from yesterday"
        />
        <MetricCard
          title="Avg Response Time"
          value="1.2s"
          description="TTS + STT latency"
          icon={Clock}
          trend="down"
          trendValue="-15% improvement"
        />
        <MetricCard
          title="API Usage"
          value="$24.50"
          description="This month"
          icon={Zap}
          trend="neutral"
          trendValue="Within budget"
        />
      </DashboardGrid>

      {/* System Stats Grid */}
      <DashboardGrid columns={3} className="mb-6">
        <ChartCard
          title="CPU Usage"
          actions={
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          }
        >
          <div className="flex items-center justify-center h-[200px]">
            <CircularGauge value={45} size={150} color="#00d4ff" />
          </div>
        </ChartCard>

        <ChartCard
          title="Memory Usage"
          actions={
            <Button variant="secondary" size="sm">
              View Details
            </Button>
          }
        >
          <div className="flex items-center justify-center h-[200px]">
            <CircularGauge value={62} size={150} color="#8b5cf6" />
          </div>
        </ChartCard>

        <ChartCard
          title="Active Processes"
          actions={
            <Button variant="secondary" size="sm">
              Manage
            </Button>
          }
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            <StatBox
              label="Running"
              value="3"
              variant="success"
            />
            <StatBox
              label="Idle"
              value="5"
              variant="info"
            />
            <StatBox
              label="Failed"
              value="0"
              variant="error"
            />
            <StatBox
              label="Queued"
              value="2"
              variant="warning"
            />
          </div>
        </ChartCard>
      </DashboardGrid>

      {/* Recent Activity */}
      <ChartCard title="Recent Activity">
        <div className="space-y-3">
          {[
            {
              icon: MessageSquare,
              text: "New conversation started: Project Alpha",
              time: "2 minutes ago",
              color: "text-cyan-400",
            },
            {
              icon: Zap,
              text: "Process completed: Audio transcription",
              time: "5 minutes ago",
              color: "text-green-400",
            },
            {
              icon: TrendingUp,
              text: "System performance improved by 15%",
              time: "10 minutes ago",
              color: "text-blue-400",
            },
            {
              icon: Activity,
              text: "API response time: 1.2s (optimal)",
              time: "15 minutes ago",
              color: "text-purple-400",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg"
            >
              <activity.icon className={`w-5 h-5 ${activity.color} flex-shrink-0 mt-0.5`} />
              <div className="flex-1">
                <p className="text-sm text-slate-200">{activity.text}</p>
                <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
