#!/bin/bash

# =============================================================================
# YourDuka E-commerce - One-Click Deploy Command
# =============================================================================
# Single command: npm run build + complete Vercel deployment
# Usage: ./one-click-deploy.sh
# =============================================================================

echo "🚀 YourDuka E-commerce - One-Click Deploy"
echo "=========================================="

# Build and deploy in sequence
npm run build && ./vercel-deployment-setup.sh

# Success message
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 SUCCESS! Your YourDuka e-commerce platform is now LIVE!"
    echo "🔐 Admin: admin@yourduka.com / admin123"
    echo "✨ Happy selling!"
else
    echo ""
    echo "❌ Deployment failed. Check the errors above."
    echo "💡 Try running the commands individually to debug."
fi