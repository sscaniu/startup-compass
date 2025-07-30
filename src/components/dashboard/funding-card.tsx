import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, DollarSign, Building, Calendar } from "lucide-react";

interface FundingOpportunity {
  id: string;
  name: string;
  type: "VC" | "Grant" | "Accelerator" | "Angel";
  description: string;
  amount: string;
  deadline?: string;
  company: string;
  stage: string[];
  industries: string[];
  location: string;
  matchScore: number;
  saved?: boolean;
}

interface FundingCardProps {
  opportunity: FundingOpportunity;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
}

const typeColors = {
  VC: "bg-primary text-primary-foreground",
  Grant: "bg-success text-success-foreground", 
  Accelerator: "bg-secondary text-secondary-foreground",
  Angel: "bg-accent text-accent-foreground"
};

export function FundingCard({ opportunity, onSave, onApply }: FundingCardProps) {
  const handleSave = () => onSave?.(opportunity.id);
  const handleApply = () => onApply?.(opportunity.id);

  return (
    <Card className="hover-lift animate-fade-in group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={typeColors[opportunity.type]} variant="secondary">
                {opportunity.type}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {opportunity.matchScore}% match
              </div>
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {opportunity.name}
            </CardTitle>
            <CardDescription className="text-sm">
              {opportunity.company}
            </CardDescription>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            className={`${opportunity.saved ? 'text-yellow-500' : 'text-muted-foreground'} hover:text-yellow-500`}
          >
            <Bookmark className={`w-4 h-4 ${opportunity.saved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3 text-success" />
            <span className="font-medium">{opportunity.amount}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Building className="w-3 h-3 text-muted-foreground" />
            <span>{opportunity.location}</span>
          </div>
          
          {opportunity.deadline && (
            <div className="flex items-center gap-1 col-span-2">
              <Calendar className="w-3 h-3 text-orange-500" />
              <span>Due: {opportunity.deadline}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {opportunity.industries.slice(0, 3).map((industry) => (
            <Badge key={industry} variant="outline" className="text-xs">
              {industry}
            </Badge>
          ))}
          {opportunity.industries.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{opportunity.industries.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            // Open in new tab or modal
          }}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View Details
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            handleApply();
          }}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}