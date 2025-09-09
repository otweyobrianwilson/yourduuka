# 🚨 Fix "Unauthorized" Error - Missing Environment Variables

The "Unauthorized" errors mean your Vercel deployment is missing the required environment variables. Here's how to fix it:

---

## 🚀 **Quick Fix (Automated)**

```bash
# Run the environment variables fix script
./scripts/fix-vercel-env-vars.sh
```

This will automatically:
1. Set all required environment variables in Vercel
2. Redeploy your application
3. Test that everything works

---

## 🖥️ **Manual Fix via Vercel Dashboard (Alternative)**

### **Step 1: Go to Vercel Dashboard**
1. Open [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your YourDuka project
3. Click on it to open

### **Step 2: Add Environment Variables**
1. Go to **Settings** tab
2. Click **Environment Variables** in the sidebar
3. Add these 3 variables for **Production** environment:

| Variable Name | Value |
|---------------|-------|
| `DATABASE_URL` | `postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| `AUTH_SECRET` | `d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81` |
| `NODE_ENV` | `production` |

### **Step 3: Redeploy**
1. Go to **Deployments** tab
2. Click the **⋯** menu on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (1-2 minutes)

### **Step 4: Set Up Database**
After redeployment, run these commands (replace YOUR_URL):

```bash
# Set up database schema
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://YOUR_URL/api/migrate

# Add initial data
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://YOUR_URL/api/seed
```

---

## 🔧 **Manual Fix via Vercel CLI (Alternative)**

If you prefer command line:

```bash
# Make sure you're logged in
vercel login

# Link to your project
vercel link

# Add environment variables
vercel env add DATABASE_URL production
# Paste: postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

vercel env add AUTH_SECRET production
# Paste: d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81

vercel env add NODE_ENV production
# Paste: production

# Redeploy
vercel --prod
```

---

## ✅ **How to Verify It's Fixed**

After setting up environment variables and redeploying:

### **1. Test Authorization**
```bash
# This should NOT return "Unauthorized" anymore
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://your-url.vercel.app/api/migrate
```

### **2. Test APIs**
```bash
# These should return 200 status codes
curl -I https://your-url.vercel.app/api/products
curl -I https://your-url.vercel.app/api/categories
```

### **3. Test Website**
1. Refresh your browser
2. Check browser console - no more 500 errors
3. Homepage should load properly
4. Product pages should work

---

## 🎯 **Why This Happened**

The initial deployment script may have had issues setting environment variables, or:

1. **Vercel CLI wasn't logged in** during deployment
2. **Environment variables weren't pushed** to production
3. **Variables were set for wrong environment** (preview instead of production)

---

## 🔐 **After Fix - Admin Access**

Once fixed, you can access:

- **Website**: `https://your-vercel-url.vercel.app`
- **Admin Panel**: `https://your-vercel-url.vercel.app/admin`
- **Email**: `admin@yourduka.com`
- **Password**: `admin123`

---

## 🆘 **If Still Having Issues**

### **Check Environment Variables Are Set:**
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Ensure all 3 variables are listed for **Production**
3. If missing, add them and redeploy

### **Check Function Logs:**
1. Go to Vercel dashboard → Your project → Functions
2. Look for recent error logs
3. Check for database connection errors

### **Verify Database Connection:**
The DATABASE_URL should be exactly:
```
postgresql://neondb_owner:npg_G2MHsbvunco0@ep-still-glitter-adfe8uwi-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## 🎉 **Expected Result**

After fix:
- ✅ No more "Unauthorized" errors
- ✅ Migration and seed APIs work
- ✅ All website APIs return 200
- ✅ Homepage loads without errors
- ✅ Size functionality works
- ✅ Admin panel accessible

**Run the fix script and your deployment will work perfectly! 🚀**