# 🚨 Fix Vercel 500 Errors - Database Not Set Up

The 500 errors you're seeing mean your Vercel deployment's database hasn't been set up yet. Here's how to fix it:

## 🚀 **Quick Fix (1 Command)**

```bash
# Run the debug and fix script
./scripts/debug-vercel-deployment.sh
```

**When prompted, enter your Vercel URL** and it will automatically fix everything.

---

## 🔧 **Manual Fix Steps**

If you prefer to do it manually:

### **Step 1: Get Your Vercel URL**
Your Vercel URL should look like: `https://yourduka-abc123.vercel.app`

### **Step 2: Run Database Migration**
```bash
# Replace YOUR_VERCEL_URL with your actual URL
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://YOUR_VERCEL_URL/api/migrate
```

### **Step 3: Seed Database with Data**
```bash
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://YOUR_VERCEL_URL/api/seed
```

### **Step 4: Test the Fix**
```bash
# Test products API - should return 200
curl https://YOUR_VERCEL_URL/api/products

# Test categories API - should return 200  
curl https://YOUR_VERCEL_URL/api/categories
```

---

## ❓ **Why This Happened**

The 500 errors occur because:

1. **Database exists** but **tables don't exist** yet
2. **APIs try to query empty/missing tables**
3. **Results in server errors** (500 status)

The fix creates the database structure and adds initial data.

---

## ✅ **After Running the Fix**

Your Vercel deployment will have:

- ✅ **Working homepage** (no more loading errors)
- ✅ **Products API** returning 200 status
- ✅ **Categories API** working correctly  
- ✅ **Cart functionality** operational
- ✅ **Admin panel** accessible
- ✅ **Size guide functionality** enabled

---

## 🔐 **Admin Access After Fix**

- **URL**: `https://your-vercel-url.vercel.app/admin`
- **Email**: `admin@yourduka.com` 
- **Password**: `admin123`

---

## 🧪 **Verify It's Fixed**

After running the fix:

1. **Refresh your browser** (hard refresh: Ctrl+F5 / Cmd+Shift+R)
2. **Check browser console** - should see no more 500 errors
3. **Visit a product page** - should load properly
4. **Test size selector** - should appear and work
5. **Try adding to cart** - should work without errors

---

## 🆘 **If Still Having Issues**

### **Check Environment Variables in Vercel:**
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Ensure these are set for **Production**:
   - `DATABASE_URL`
   - `AUTH_SECRET` 
   - `NODE_ENV=production`

### **Check Vercel Function Logs:**
1. Go to Vercel dashboard → Functions tab
2. Look for error messages in the logs
3. Most common issues are missing environment variables

### **Re-deploy if needed:**
```bash
# If environment variables were missing, re-deploy
vercel --prod
```

---

## 🎯 **Expected Result**

After the fix:

- **Homepage loads instantly** with no errors
- **Product pages work** with size selectors
- **Shopping cart functions** properly
- **Admin panel accessible**
- **APIs return 200 status codes**
- **No more 500 errors in browser console**

**Run the debug script and your deployment will be working perfectly in about 2 minutes! 🚀**