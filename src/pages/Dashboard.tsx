import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FundingCard } from "@/components/dashboard/funding-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Clock, DollarSign, Users, Award } from "lucide-react";

// Mock data for funding opportunities
const mockOpportunities = [
  {
    id: "1",
    name: "TechStars NYC Accelerator",
    type: "Accelerator" as const,
    description: "3-month accelerator program for early-stage startups in NYC. Includes $120k investment, mentorship, and demo day.",
    amount: "$120,000",
    deadline: "March 15, 2024",
    company: "TechStars",
    stage: ["Pre-Seed", "Seed"],
    industries: ["FinTech", "SaaS", "AI/ML"],
    location: "New York, NY",
    matchScore: 92,
    saved: true
  },
  {
    id: "2",
    name: "Andreessen Horowitz Seed Fund",
    type: "VC" as const,
    description: "Seed-stage funding for technology startups with strong technical teams and innovative solutions.",
    amount: "$1M - $5M",
    company: "a16z",
    stage: ["Seed", "Series A"],
    industries: ["AI/ML", "SaaS", "Blockchain"],
    location: "San Francisco, CA",
    matchScore: 87,
    saved: false
  },
  {
    id: "3",
    name: "SBIR Phase I Grant",
    type: "Grant" as const,
    description: "Small Business Innovation Research grant for R&D projects with commercial potential.",
    amount: "$50,000 - $500,000",
    deadline: "April 30, 2024",
    company: "U.S. Government",
    stage: ["Idea", "Prototype"],
    industries: ["HealthTech", "CleanTech", "AI/ML"],
    location: "United States",
    matchScore: 78,
    saved: false
  },
  {
    id: "4",
    name: "First Round Capital",
    type: "VC" as const,
    description: "Early-stage venture capital firm focused on product and engineering excellence.",
    amount: "$500K - $15M",
    company: "First Round",
    stage: ["Seed", "Series A"],
    industries: ["SaaS", "Consumer", "Enterprise"],
    location: "New York, NY",
    matchScore: 84,
    saved: true
  }
];

const stats = [
  {
    title: "Profile Completion",
    value: "85%",
    icon: Target,
    color: "text-primary",
    progress: 85
  },
  {
    title: "Active Matches",
    value: "12",
    icon: TrendingUp,
    color: "text-success"
  },
  {
    title: "Applications Sent",
    value: "4",
    icon: Clock,
    color: "text-secondary"
  },
  {
    title: "Total Potential",
    value: "$2.4M",
    icon: DollarSign,
    color: "text-success"
  }
];

export default function Dashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [savedOpportunities, setSavedOpportunities] = useState(new Set(["1", "4"]));

  const handleSave = (id: string) => {
    setSavedOpportunities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleApply = (id: string) => {
    console.log("Apply to opportunity:", id);
    // Navigate to application flow
  };

  const filteredOpportunities = mockOpportunities.map(opp => ({
    ...opp,
    saved: savedOpportunities.has(opp.id)
  })).filter(opp => 
    opp.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchValue.toLowerCase()) ||
    opp.type.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="Dashboard"
            subtitle="Welcome back! Here's your funding overview"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          
          <main className="flex-1 p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="hover-lift animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        {"progress" in stat && (
                          <Progress value={stat.progress} className="mt-2 h-1" />
                        )}
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Complete these steps to improve your funding matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <div className="font-medium">Complete Profile</div>
                    <div className="text-sm text-muted-foreground">Add team info and financial details</div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <div className="font-medium">Upload Pitch Deck</div>
                    <div className="text-sm text-muted-foreground">Boost your application success rate</div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
                    <div className="font-medium">Schedule Consultation</div>
                    <div className="text-sm text-muted-foreground">Get expert advice on your funding strategy</div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Recent Matches</h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredOpportunities.length} funding opportunities found
                  </p>
                </div>
                <Button variant="outline" onClick={() => window.location.href = '/dashboard/matches'}>
                  View All Matches
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOpportunities.slice(0, 6).map((opportunity) => (
                  <FundingCard
                    key={opportunity.id}
                    opportunity={opportunity}
                    onSave={handleSave}
                    onApply={handleApply}
                  />
                ))}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}