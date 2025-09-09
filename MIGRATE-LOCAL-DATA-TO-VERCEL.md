# 🚀 Migrate Your Local Database Data to Vercel

Since you've already deployed your YourDuka application to Vercel, now we need to migrate your local database data (including all the size information we added) to your live Vercel deployment.

---

## 🎯 **What We're Migrating**

Your local database contains:
- ✅ **Product data** with size information
- ✅ **Size categories** (Men's, Women's, Unisex)
- ✅ **Available sizes** for each product
- ✅ **All the size guide functionality** we implemented

---

## 🚀 **Quick Migration (Recommended)**

### **Option 1: Run the Migration Script**

```bash
# Navigate to your project directory
cd /path/to/your/yourduka/project

# Run the migration script
./scripts/migrate-to-vercel.sh
```

**What it does:**
1. ✅ Runs database migrations on Vercel
2. ✅ Seeds basic data (categories, products, admin user)
3. ✅ Updates all products with size information
4. ✅ Sets up size categories (Men's, Women's, Unisex)
5. ✅ Enables size selector functionality

---

## 🔧 **Alternative: Node.js Migration Script**

If you prefer a Node.js approach:

```bash
# Run the Node.js migration script
node scripts/migrate-data-to-vercel.js
```

---

## 📋 **Step-by-Step Manual Migration**

If you want to do it manually:

### 1. **Get Your Vercel URL**
Your Vercel URL should look like: `https://yourduka-xyz123.vercel.app`

### 2. **Run Migrations**
```bash
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://your-vercel-url.vercel.app/api/migrate
```

### 3. **Seed Basic Data**
```bash
curl -X POST -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" https://your-vercel-url.vercel.app/api/seed
```

### 4. **Update Products with Size Data**
```bash
# Nike Air Max 270 - Unisex sizes
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
  https://your-vercel-url.vercel.app/api/products/nike-air-max-270

# Adidas Ultraboost - Unisex sizes
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer d9e355c16c9f9ff860dbe709e66c4758cb15cbe387ff9e3b990cf668bb3b9d81" \
  -d '{"availableSizes":["7","7.5","8","8.5","9","9.5","10","10.5","11"],"sizeCategory":"Unisex"}' \
  https://your-vercel-url.vercel.app/api/products/adidas-ultraboost-22-updated

# Continue for all products...
```

---

## ✅ **Verify Your Migration**

After migration, verify everything is working:

```bash
# Run the verification script
./scripts/verify-vercel-data.sh
```

**Or manually check:**
1. Visit your Vercel URL
2. Go to a product page
3. Check that size selector appears
4. Test the size guide modal
5. Try adding items to cart with sizes

---

## 🔐 **Admin Access After Migration**

Once migration is complete:

- **URL**: `https://your-vercel-url.vercel.app/admin`
- **Email**: `admin@yourduka.com`
- **Password**: `admin123`

---

## 🎯 **Expected Results**

After successful migration, your Vercel deployment will have:

### **Size Functionality:**
- ✅ **Size Selector** on all product pages
- ✅ **Size Guide Modal** with measurement instructions
- ✅ **Multiple Size Categories** (Men's, Women's, Unisex)
- ✅ **Size Validation** - users must select size before adding to cart
- ✅ **Size Information** in cart and order items

### **Product Data:**
- ✅ **Nike Air Max 270** - Unisex sizes (7-11)
- ✅ **Adidas Ultraboost** - Unisex sizes (7-11)  
- ✅ **Timberland Boots** - Unisex sizes (7-11)
- ✅ **New Balance** - Men's sizes (8-12)
- ✅ **Vans Old Skool** - Men's sizes (8-12)
- ✅ **Dr. Martens** - Women's sizes (4-8)
- ✅ **Converse** - Women's sizes (4-8)

### **E-commerce Features:**
- ✅ **Complete shopping cart** with size tracking
- ✅ **Admin panel** for product management
- ✅ **User authentication**
- ✅ **Order processing**
- ✅ **Mobile-responsive** design

---

## 🆘 **Troubleshooting**

### **Migration Script Fails:**
```bash
# Check if Vercel URL is correct
curl https://your-vercel-url.vercel.app/

# Verify API endpoints are working
curl https://your-vercel-url.vercel.app/api/products
```

### **Size Data Not Appearing:**
1. Check that migration completed successfully
2. Verify product API includes `availableSizes` field
3. Clear browser cache and refresh

### **Admin Access Issues:**
1. Ensure seed script ran successfully
2. Try the forgot password flow
3. Check Vercel logs for any errors

---

## 🎉 **You're All Set!**

After running the migration:

1. **Your local development** continues to work as before
2. **Your Vercel deployment** now has all your data + size functionality  
3. **Size guide** works perfectly on both environments
4. **Admin panel** lets you manage products and sizes
5. **Ready for production** use with real customers

**Your YourDuka shoe store is now live with complete size guide functionality! 🚀👟🛒**

---

## 📞 **Need Help?**

If you encounter any issues:

1. **Run the verification script**: `./scripts/verify-vercel-data.sh`
2. **Check Vercel logs** in your dashboard
3. **Re-run migration**: `./scripts/migrate-to-vercel.sh`
4. **Test locally first** to ensure everything works

Your deployment should now perfectly match your local development environment! ✨