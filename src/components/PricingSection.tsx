
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingSectionProps {
  onSelectPlan: (plan: string) => void;
}

const PricingSection = ({ onSelectPlan }: PricingSectionProps) => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Business Basic",
      description: "For Startups & Small Businesses",
      price: "₹2,999",
      period: "/month",
      features: [
        { name: "Core payment processing", included: true },
        { name: "Basic invoicing", included: true },
        { name: "Basic API access", included: true },
        { name: "Standard support", included: true },
        { name: "Up to ₹5L monthly volume", included: true },
        { name: "White-label payment links", included: false },
        { name: "Multi-currency support", included: false },
        { name: "Crypto payments", included: false },
        { name: "Custom domain pages", included: false }
      ]
    },
    {
      name: "Business",
      description: "Scales with growing businesses",
      price: "₹9,999",
      period: "/month",
      popular: true,
      features: [
        { name: "Everything in Business Basic", included: true },
        { name: "Branded invoices", included: true },
        { name: "Full API access", included: true },
        { name: "White-label payment links", included: true },
        { name: "Multi-currency support", included: true },
        { name: "Webhooks & API events", included: true },
        { name: "Priority support", included: true },
        { name: "Up to ₹25L monthly volume", included: true },
        { name: "Crypto payments", included: false }
      ]
    },
    {
      name: "Business Pro",
      description: "For high-volume businesses",
      price: "₹24,999",
      period: "/month",
      features: [
        { name: "Everything in Business", included: true },
        { name: "Custom domain payment pages", included: true },
        { name: "Invoice payment links", included: true },
        { name: "Crypto payments enabled", included: true },
        { name: "Advanced fraud prevention", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Advanced compliance", included: true },
        { name: "Up to ₹1Cr monthly volume", included: true },
        { name: "24/7 premium support", included: true }
      ]
    },
    {
      name: "Enterprise (S4 All)",
      description: "For enterprises, banks, marketplaces",
      price: "Custom Pricing",
      period: "",
      features: [
        { name: "Fully custom setup", included: true },
        { name: "High-volume discounts", included: true },
        { name: "Dedicated infrastructure", included: true },
        { name: "Advanced compliance (PCI DSS, GDPR)", included: true },
        { name: "24/7 premium support", included: true },
        { name: "SLA-guaranteed uptime", included: true },
        { name: "White-label full suite", included: true },
        { name: "Unlimited monthly volume", included: true },
        { name: "Custom integrations", included: true }
      ]
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing plans designed to grow with your business. All plans include transaction fees starting from 1.8%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                {plan.name !== "Enterprise (S4 All)" && (
                  <p className="text-sm text-gray-500 mt-2">+ Transaction fees from 1.8%</p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300 mr-3 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => onSelectPlan(plan.name)}
                  >
                    {plan.name === 'Enterprise (S4 All)' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Our team is here to help.
          </p>
          <Button 
            variant="outline"
            onClick={() => window.open('https://calendly.com/founder-mayaexchange/maya-pg-collaboration', '_blank')}
          >
            Schedule Integration Call
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
