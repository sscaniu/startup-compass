import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, CheckCircle, Building, DollarSign, Target, Users } from "lucide-react";

interface FormData {
  // Company Info
  companyName: string;
  foundedYear: string;
  website: string;
  description: string;
  
  // Stage & Funding
  stage: string;
  previousFunding: string;
  fundingGoal: string;
  useOfFunds: string;
  
  // Business Details
  industry: string[];
  businessModel: string;
  targetMarket: string;
  teamSize: string;
  location: string;
  
  // Preferences
  fundingTypes: string[];
  geographicPreference: string;
  timeline: string;
}

const initialFormData: FormData = {
  companyName: "",
  foundedYear: "",
  website: "",
  description: "",
  stage: "",
  previousFunding: "",
  fundingGoal: "",
  useOfFunds: "",
  industry: [],
  businessModel: "",
  targetMarket: "",
  teamSize: "",
  location: "",
  fundingTypes: [],
  geographicPreference: "",
  timeline: ""
};

const stages = [
  { value: "idea", label: "Idea Stage" },
  { value: "prototype", label: "Prototype/MVP" },
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B+" }
];

const industries = [
  "FinTech", "HealthTech", "EdTech", "AI/ML", "SaaS", "E-commerce", 
  "CleanTech", "Blockchain", "IoT", "Cybersecurity", "BioTech", "AgTech"
];

const fundingTypes = [
  { id: "vc", label: "Venture Capital" },
  { id: "angel", label: "Angel Investors" },
  { id: "grant", label: "Government Grants" },
  { id: "accelerator", label: "Accelerators" },
  { id: "crowdfunding", label: "Crowdfunding" }
];

export function StartupIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIndustryToggle = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry.includes(industry)
        ? prev.industry.filter(i => i !== industry)
        : [...prev.industry, industry]
    }));
  };

  const handleFundingTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      fundingTypes: prev.fundingTypes.includes(type)
        ? prev.fundingTypes.filter(t => t !== type)
        : [...prev.fundingTypes, type]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    // Redirect to matches
    window.location.href = "/dashboard/matches";
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Company Information</h3>
              <p className="text-muted-foreground">Tell us about your startup</p>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="foundedYear">Founded Year</Label>
                  <Input
                    id="foundedYear"
                    type="number"
                    value={formData.foundedYear}
                    onChange={(e) => updateFormData("foundedYear", e.target.value)}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Company Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  placeholder="Describe what your company does, the problem you solve, and your unique value proposition..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Stage & Funding</h3>
              <p className="text-muted-foreground">Where are you now and where are you going?</p>
            </div>

            <div className="grid gap-4">
              <div>
                <Label>Current Stage *</Label>
                <Select value={formData.stage} onValueChange={(value) => updateFormData("stage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="previousFunding">Previous Funding</Label>
                  <Input
                    id="previousFunding"
                    value={formData.previousFunding}
                    onChange={(e) => updateFormData("previousFunding", e.target.value)}
                    placeholder="$0 (if none)"
                  />
                </div>
                <div>
                  <Label htmlFor="fundingGoal">Funding Goal *</Label>
                  <Input
                    id="fundingGoal"
                    value={formData.fundingGoal}
                    onChange={(e) => updateFormData("fundingGoal", e.target.value)}
                    placeholder="$500k"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="useOfFunds">Use of Funds *</Label>
                <Textarea
                  id="useOfFunds"
                  value={formData.useOfFunds}
                  onChange={(e) => updateFormData("useOfFunds", e.target.value)}
                  placeholder="How will you use the funding? (e.g., product development, hiring, marketing...)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Business Details</h3>
              <p className="text-muted-foreground">Help us understand your business model</p>
            </div>

            <div className="grid gap-4">
              <div>
                <Label>Industry/Sectors *</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox
                        id={industry}
                        checked={formData.industry.includes(industry)}
                        onCheckedChange={() => handleIndustryToggle(industry)}
                      />
                      <Label htmlFor={industry} className="text-sm font-normal">
                        {industry}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Select value={formData.businessModel} onValueChange={(value) => updateFormData("businessModel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select value={formData.teamSize} onValueChange={(value) => updateFormData("teamSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-3">1-3 people</SelectItem>
                      <SelectItem value="4-10">4-10 people</SelectItem>
                      <SelectItem value="11-25">11-25 people</SelectItem>
                      <SelectItem value="26-50">26-50 people</SelectItem>
                      <SelectItem value="50+">50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={(e) => updateFormData("targetMarket", e.target.value)}
                    placeholder="e.g., SMBs, Enterprise, Consumers"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold">Funding Preferences</h3>
              <p className="text-muted-foreground">What type of funding are you looking for?</p>
            </div>

            <div className="grid gap-6">
              <div>
                <Label>Preferred Funding Types *</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {fundingTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.id}
                        checked={formData.fundingTypes.includes(type.id)}
                        onCheckedChange={() => handleFundingTypeToggle(type.id)}
                      />
                      <Label htmlFor={type.id} className="text-sm font-normal">
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Geographic Preference</Label>
                <RadioGroup 
                  value={formData.geographicPreference} 
                  onValueChange={(value) => updateFormData("geographicPreference", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="local" id="local" />
                    <Label htmlFor="local">Local/Regional</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="national" id="national" />
                    <Label htmlFor="national">National</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="international" id="international" />
                    <Label htmlFor="international">International</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-preference" id="no-preference" />
                    <Label htmlFor="no-preference">No Preference</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="timeline">Funding Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need funding?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="6-12-months">6-12 months</SelectItem>
                    <SelectItem value="planning">Just planning ahead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">
            Startup Profile Setup
          </CardTitle>
          <CardDescription>
            Help us find the perfect funding opportunities for your startup
          </CardDescription>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          {renderStep()}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && (!formData.companyName || !formData.description)) ||
                  (currentStep === 2 && (!formData.stage || !formData.fundingGoal || !formData.useOfFunds)) ||
                  (currentStep === 3 && formData.industry.length === 0) ||
                  (currentStep === 4 && formData.fundingTypes.length === 0)
                }
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || formData.fundingTypes.length === 0}
                className="flex items-center gap-2"
                variant="hero"
              >
                {isSubmitting ? (
                  "Finding Matches..."
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Find My Matches
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}