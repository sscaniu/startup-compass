import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { FundingCard } from "@/components/dashboard/funding-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Filter } from "lucide-react";

// Extended mock data
const allOpportunities = [
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
  },
  {
    id: "5",
    name: "Y Combinator W24",
    type: "Accelerator" as const,
    description: "World's most successful startup accelerator. 3-month program with $500k investment.",
    amount: "$500,000",
    deadline: "February 20, 2024",
    company: "Y Combinator",
    stage: ["Pre-Seed", "Seed"],
    industries: ["Any"],
    location: "San Francisco, CA",
    matchScore: 89,
    saved: false
  },
  {
    id: "6",
    name: "Angel Investor Network",
    type: "Angel" as const,
    description: "Network of high-net-worth individuals investing in early-stage startups.",
    amount: "$25K - $250K",
    company: "Various Angels",
    stage: ["Pre-Seed", "Seed"],
    industries: ["FinTech", "HealthTech", "AI/ML"],
    location: "Global",
    matchScore: 76,
    saved: false
  }
];

export default function Matches() {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("all");
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
  };

  const getFilteredOpportunities = (filter: string) => {
    let filtered = allOpportunities.map(opp => ({
      ...opp,
      saved: savedOpportunities.has(opp.id)
    }));

    if (filter !== "all") {
      filtered = filtered.filter(opp => opp.type.toLowerCase() === filter);
    }

    if (searchValue) {
      filtered = filtered.filter(opp => 
        opp.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchValue.toLowerCase()) ||
        opp.industries.some(industry => 
          industry.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    return filtered.sort((a, b) => b.matchScore - a.matchScore);
  };

  const filteredOpportunities = getFilteredOpportunities(activeTab);
  const savedCount = allOpportunities.filter(opp => savedOpportunities.has(opp.id)).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            title="Funding Matches"
            subtitle={`${filteredOpportunities.length} opportunities found for your startup`}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
          
          <main className="flex-1 p-6">
            {/* Match Summary */}
            <Card className="mb-6 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Your Match Score</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your startup profile and preferences
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(filteredOpportunities.reduce((acc, opp) => acc + opp.matchScore, 0) / filteredOpportunities.length)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Average match</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters and Tabs */}
            <div className="mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid w-auto grid-cols-5">
                    <TabsTrigger value="all">
                      All ({allOpportunities.length})
                    </TabsTrigger>
                    <TabsTrigger value="vc">
                      VCs ({allOpportunities.filter(o => o.type === "VC").length})
                    </TabsTrigger>
                    <TabsTrigger value="grant">
                      Grants ({allOpportunities.filter(o => o.type === "Grant").length})
                    </TabsTrigger>
                    <TabsTrigger value="accelerator">
                      Accelerators ({allOpportunities.filter(o => o.type === "Accelerator").length})
                    </TabsTrigger>
                    <TabsTrigger value="angel">
                      Angels ({allOpportunities.filter(o => o.type === "Angel").length})
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      {savedCount} Saved
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-1" />
                      More Filters
                    </Button>
                  </div>
                </div>

                <TabsContent value={activeTab} className="mt-0">
                  {filteredOpportunities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredOpportunities.map((opportunity, index) => (
                        <div 
                          key={opportunity.id} 
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <FundingCard
                            opportunity={opportunity}
                            onSave={handleSave}
                            onApply={handleApply}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-12 text-center">
                      <div className="text-muted-foreground">
                        <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="font-medium mb-2">No matches found</h3>
                        <p className="text-sm">
                          Try adjusting your search criteria or updating your startup profile
                        </p>
                        <Button variant="outline" className="mt-4">
                          Update Profile
                        </Button>
                      </div>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}