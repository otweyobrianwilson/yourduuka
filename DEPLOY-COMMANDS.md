# 🚀 YourDuka E-commerce - Deployment Commands

## ⚡ One-Click Deployment Options

I've created **multiple ways** to deploy your e-commerce platform. Choose the one that works best for you:

---

## 🎯 **Option 1: Complete Build & Deploy (RECOMMENDED)**

### Single Command - Does Everything:
```bash
./deploy-yourduuka.sh
```

**What it does:**
- ✅ Runs `npm run build` locally first
- ✅ Installs Vercel CLI  
- ✅ Logs into Vercel
- ✅ Links your project
- ✅ Adds all environment variables
- ✅ Deploys to production
- ✅ Runs database migrations
- ✅ Seeds database with products
- ✅ Shows your live URL and admin credentials

---

## 🔥 **Option 2: Simple One-Click Deploy**

### Build + Original Setup Script:
```bash
./one-click-deploy.sh
```

**What it does:**
- ✅ Runs `npm run build`
- ✅ Executes `./vercel-deployment-setup.sh`
- ✅ Shows success/failure status

---

## 🛠️ **Option 3: Manual Two-Step**

### Step 1 - Build:
```bash
npm run build
```

### Step 2 - Deploy:
```bash
./vercel-deployment-setup.sh
```

---

## 📋 **Option 4: Individual Commands**

If you prefer to run each step manually:

```bash
# Build application
npm run build

# Install and setup Vercel
npm i -g vercel
vercel login
vercel link

# Add environment variables
echo "postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" | vercel env add DATABASE_URL production

echo "d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" | vercel env add AUTH_SECRET production

echo "production" | vercel env add NODE_ENV production

# Deploy
vercel --prod

# Setup database (replace with your actual URL)
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://yourdomain.vercel.app/api/migrate

curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://yourdomain.vercel.app/api/seed
```

---

## 📂 **Available Scripts Summary**

| Script | Purpose | Command |
|--------|---------|---------|
| `deploy-yourduuka.sh` | **Complete build & deploy** (BEST) | `./deploy-yourduuka.sh` |
| `one-click-deploy.sh` | Simple build + deploy | `./one-click-deploy.sh` |
| `vercel-deployment-setup.sh` | Vercel setup only | `./vercel-deployment-setup.sh` |

---

## 🎯 **Quick Start - Choose One:**

### 🚀 **For Complete Automation:**
```bash
./deploy-yourduuka.sh
```

### ⚡ **For Quick Deploy:**  
```bash
./one-click-deploy.sh
```

### 🔧 **For Manual Control:**
```bash
npm run build && ./vercel-deployment-setup.sh
```

---

## 🔐 **After Deployment**

### Admin Access:
- **URL**: Your Vercel domain (shown after deployment)
- **Email**: `admin@yourduka.com`
- **Password**: `admin123`

### Your E-commerce Features:
- ✅ **Product Catalog** - Browse shoes by category
- ✅ **Shopping Cart** - Add/remove products
- ✅ **User Accounts** - Registration and login  
- ✅ **Admin Panel** - Manage products and orders
- ✅ **Order Processing** - Complete checkout flow
- ✅ **Mobile Responsive** - Works on all devices

---

## 💡 **Troubleshooting**

### Build Fails:
```bash
# Check for errors in build output
npm run build
```

### Deployment Issues:
```bash
# Check Vercel status
vercel logs
```

### Database Issues:
```bash
# Manually run database setup
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://yourdomain.vercel.app/api/migrate
```

---

## 🎉 **Ready to Go Live?**

**Pick your preferred command above and watch your e-commerce platform come to life! 🛒✨**

The build issues have been resolved, all dependencies are configured, and your Neon database is ready. 

**Your YourDuka e-commerce platform is just one command away from being live on the internet! 🌍**