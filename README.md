# Treblle ROI Calculator

A professional ROI estimation tool for Treblle's API Intelligence Platform, designed for sales teams and enterprise customers to calculate potential cost savings and return on investment.

## 🚀 Live Demo

**Production**: https://treblle-roi-api.vercel.app/

## ✨ Features

### 📊 Comprehensive ROI Analysis
- **Cost-benefit modeling** for API observability implementation
- **Conservative estimates** with configurable confidence factors
- **Multiple savings categories**: Support time, engineering effort, retention, compliance
- **Flexible deployment options**: SaaS vs Private Cloud pricing

### 📄 Professional Export Options
- **PDF Reports**: Comprehensive 2-page formatted business documents
- **Copy to Clipboard**: Formatted text summaries for quick sharing
- **JSON Export**: Structured data for integration with other tools
- **Shareable Links**: URL-encoded parameters for easy collaboration

### 🎨 Professional Design
- **Treblle brand consistency** with dark theme
- **Mobile-responsive** design for all devices  
- **Accessible** with proper contrast and keyboard navigation
- **Hero video** showcasing Treblle platform capabilities

## 🛠 Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js with Express (Vercel serverless)
- **Deployment**: Vercel with edge functions
- **Assets**: Optimized video and SVG graphics

## 📁 Project Structure

```
treblle-roi-calculator/
├── index.html              # Main application (single-page app)
├── api/                     # Serverless API endpoints
│   └── calc.js             # ROI calculation endpoint
├── public/                  # Static assets
│   ├── demo-video-treblle.mp4
│   └── treblle-logo.svg
├── assets/                  # Additional branding assets
├── roi-formulas.js         # Core calculation logic
├── server.js               # Local development server
├── vercel.json             # Deployment configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/scott-lgtm/treblle-roi-api.git
   cd treblle-roi-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   node server.js
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 📊 ROI Calculation Model

### Input Categories

- **Company & Traffic**: API volume, growth rate, consumer count
- **Support & Engineering**: Ticket volume, escalation rates, hourly costs
- **Analysis & Governance**: Pattern analysis time, manual query effort
- **Customer & Revenue**: Customer count, retention risk, annual value
- **Compliance & Tooling**: FTE costs, alternative tool expenses

### Calculation Logic

1. **Benefit Calculation**
   - Support time savings: `tickets × hours × reduction% × rate`
   - Engineering savings: `escalations × hours × reduction% × rate`
   - Communication overhead reduction
   - Manual query time elimination
   - Pattern analysis automation
   - Customer retention value protection

2. **Cost Calculation**
   - SaaS: `base + (extra_apis/25) × pack_cost`
   - Private: `base + extra_apis × per_api_cost`
   - Override option for custom pricing

3. **ROI Metrics**
   - Net Value: `benefit - cost`
   - ROI Multiple: `net_value / cost`
   - Payback Period: `12 × cost / benefit`

## 🎯 Business Use Cases

### Sales Enablement
- **Prospect qualification** with quantified value propositions
- **Executive presentations** with professional PDF reports
- **ROI justification** for budget approval processes
- **Competitive differentiation** through concrete savings estimates

### Customer Success
- **Onboarding value demonstration** for new customers
- **Expansion conversations** with usage-based projections
- **Renewal discussions** with realized value tracking
- **Case study development** with anonymized data exports

## 📈 Export Features

### PDF Reports Include:
- Executive summary with key metrics
- Detailed savings breakdown by category
- Complete input assumptions
- Efficiency improvement percentages
- Professional Treblle branding
- Contact information and disclaimers

### Sharing Options:
- **Copy Results**: Formatted text for emails/Slack
- **Download JSON**: Structured data for analysis
- **Share Link**: URL with pre-filled parameters
- **Print PDF**: Browser-optimized for professional output

## 🔧 Configuration

### Environment Variables
```bash
# Optional: For API rate limiting (production)
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15
```

### Customization
- **Pricing Models**: Edit `roi-formulas.js` for different pricing tiers
- **Branding**: Replace assets in `/public` for white-label versions
- **Calculations**: Modify benchmark percentages in default values

## 🚦 API Endpoints

### POST /api/calc
Calculate ROI based on input parameters

**Request Body:**
```json
{
  "annualRequests": 300000000,
  "numAPIs": 25,
  "ticketsPerMonth": 200,
  "pctApiTickets": 70,
  // ... other parameters
}
```

**Response:**
```json
{
  "benefit": 850000,
  "cost": 35988,
  "net": 814012,
  "roi": 22.6,
  "paybackMonths": 0.5
}
```

## 🎨 Design System

### Colors
- **Primary**: `#0058FF` (Treblle Blue)
- **Background**: `#0a1422` (Dark)
- **Cards**: `#1a2332` (Elevated surfaces)
- **Text**: `#f1f5f9` (Primary), `#94a3b8` (Secondary)

### Typography
- **Headings**: Inter, system fonts
- **Body**: -apple-system, BlinkMacSystemFont
- **Monospace**: ui-monospace, SFMono-Regular

## 📱 Browser Support

- **Modern browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari, Chrome Mobile
- **Features**: CSS Grid, ES6+, Clipboard API with fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push branch: `git push origin feature-name`
5. Create Pull Request

## 📄 License

This project is proprietary to Treblle. All rights reserved.

## 📞 Support

- **Email**: sales@treblle.com
- **Website**: https://treblle.com
- **Documentation**: https://docs.treblle.com

---

**Built with ❤️ for the Treblle community**
