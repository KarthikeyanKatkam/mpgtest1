
import DocumentationLayout from "@/components/layouts/DocumentationLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const WebIntegration = () => {
  const navigate = useNavigate();

  return (
    <DocumentationLayout 
      title="Web Integration" 
      description="Complete guide to integrate Maya Payments Gateway into your web application"
    >
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Install the Maya Payments SDK using npm or include it via CDN:</p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">NPM Installation</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <code>npm install @maya-exchange/payments-js</code>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">CDN Integration</h4>
                <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`<script src="https://js.mayaexchange.co.in/v1/"></script>`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Basic Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Initialize the Maya Payments SDK in your application:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Initialize Maya Payments
const maya = MayaPayments('pk_test_your_publishable_key');

// Create elements instance
const elements = maya.elements();

// Create payment element
const paymentElement = elements.create('payment', {
  layout: 'tabs'
});

// Mount the element
paymentElement.mount('#payment-element');`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complete HTML Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`<!DOCTYPE html>
<html>
<head>
    <title>Maya Payments Integration</title>
    <script src="https://js.mayaexchange.co.in/v1/"></script>
</head>
<body>
    <form id="payment-form">
        <div id="payment-element">
            <!-- Maya Elements will create form elements here -->
        </div>
        
        <button id="submit-btn" type="submit">
            Pay Now
        </button>
        
        <div id="error-message" role="alert"></div>
    </form>

    <script>
        const maya = MayaPayments('pk_test_your_publishable_key');
        const elements = maya.elements();
        const paymentElement = elements.create('payment');
        
        paymentElement.mount('#payment-element');
        
        const form = document.getElementById('payment-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const {error} = await maya.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'https://yoursite.com/payment/complete'
                }
            });
            
            if (error) {
                const messageContainer = document.querySelector('#error-message');
                messageContainer.textContent = error.message;
            }
        });
    </script>
</body>
</html>`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>React Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Example integration with React:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`import React, { useState, useEffect } from 'react';
import { loadMayaPayments } from '@maya-exchange/payments-js';

const CheckoutForm = ({ clientSecret }) => {
    const [maya, setMaya] = useState(null);
    const [elements, setElements] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const initializeMaya = async () => {
            const mayaInstance = await loadMayaPayments('pk_test_your_key');
            const elementsInstance = mayaInstance.elements({
                clientSecret
            });
            
            setMaya(mayaInstance);
            setElements(elementsInstance);
        };
        
        initializeMaya();
    }, [clientSecret]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        const { error } = await maya.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://yoursite.com/payment/complete'
            }
        });
        
        if (error) {
            console.error('Payment failed:', error);
        }
        
        setIsLoading(false);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div id="payment-element" />
            <button disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customization Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Customize the appearance and behavior of payment elements:</p>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`const appearance = {
    theme: 'maya', // 'maya', 'dark', 'flat', or 'none'
    variables: {
        colorPrimary: '#0066cc',
        colorText: '#32325d',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSizeBase: '16px',
        borderRadius: '4px'
    }
};

const elements = maya.elements({ appearance });`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate('/docs/integration/mobile-sdks')} className="bg-gradient-to-r from-blue-600 to-indigo-600">
            Next: Mobile SDKs
          </Button>
          <Button variant="outline" onClick={() => navigate('/docs/api-reference/rate-limits')}>
            Previous: Rate Limits
          </Button>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default WebIntegration;
