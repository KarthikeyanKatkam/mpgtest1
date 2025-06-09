# Maya Payments Gateway

A modern payment gateway integration system built with Next.js, featuring KYC verification, payment links generation, and transaction management.

## Features

- 🔐 Secure Authentication System
- 💳 Payment Links Generation
- 📊 Transaction Dashboard
- 🔍 KYC Verification
- 🔑 API Keys Management
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design

## Tech Stack

- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Context for Auth

## Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager

## Installation

1. Clone the repository:
```sh
git clone https://gitlab.com/mayaexchange/maya-payments-gateway-v0.0.1.git
cd maya-payments-gateway-v0.0.1
````

2. Install dependencies:
```sh
npm install
# or
yarn install
```

3. Set up environment variables:
```sh
cp .env.example .env.local
```

4. Start the development server:
```sh
npm run dev
# or
yarn dev
```

## Project Structure

```
├── app/                   # Next.js app router pages
│   ├── api-keys/         # API keys management
│   ├── dashboard/        # Main dashboard
│   ├── kyc/             # KYC verification
│   ├── login/           # Authentication
│   ├── payment-links/   # Payment links generation
│   └── transactions/    # Transaction management
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── lib/               # Utility functions and contexts
└── public/           # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For support, please email support@mayapayments.com or raise an issue in the GitLab repository.

## Authors

- Maya Exchange Team

## Project Status

Active development - Version 0.0.1
````

This README provides a comprehensive overview of the project while maintaining a professional structure that includes all necessary information for developers to get started with the project. It's based on the project structure and components visible in the workspace.This README provides a comprehensive overview of the project while maintaining a professional structure that includes all necessary information for developers to get started with the project. It's based on the project structure and components visible in the workspace.
