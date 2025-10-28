# 🚀 DEPLOYMENT GUIDE - Get Your Website Online!

Your code is ready! Follow these steps to deploy your website and get a public URL.

---

## ✅ What's Already Done:
- ✅ Code pushed to GitHub: https://github.com/mulige-indu/lms-aispry
- ✅ API URLs configured for production
- ✅ Frontend and backend separated

---

## 📋 DEPLOYMENT STEPS

### **STEP 1: Deploy Backend to Render (FREE)**

1. **Go to Render.com:**
   - Visit: https://render.com
   - Click "Get Started for Free"
   - Sign up with your GitHub account

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Click "Connect GitHub" → Find and select: `mulige-indu/lms-aispry`
   - Click "Connect"

3. **Configure Service:**
   ```
   Name: lms-backend-360
   Region: Choose closest to you (e.g., Singapore for India)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Instance Type: Free
   ```

4. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable" → Add these:

   ```env
   PORT=8080

   # Database (You'll need a free MySQL database - see below)
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=digitmg_360_academy

   # Email Configuration
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   EMAIL_FROM_NAME=360DigiTMG Academy

   # SMS (Optional - leave blank if not using)
   FAST2SMS_API_KEY=
   MSG91_API_KEY=
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_PHONE_NUMBER=
   ```

5. **Deploy:**
   - Click "Create Web Service"
   - Wait 5-10 minutes
   - **COPY YOUR BACKEND URL:** `https://lms-backend-360-xxxx.onrender.com`

---

### **STEP 2: Get FREE MySQL Database**

**Option A: Render PostgreSQL (Recommended for simplicity)**
- On Render dashboard, click "New +" → "PostgreSQL"
- Name: `lms-database`
- Free plan → Create
- Copy connection details to backend env vars

**Option B: FreeMySQLHosting.net**
- Visit: https://www.freemysqlhosting.net
- Sign up → Get free MySQL database
- Copy host, username, password
- Update Render backend env vars

**Option C: Railway (Free tier)**
- Visit: https://railway.app
- Add MySQL plugin
- Copy connection details

---

### **STEP 3: Deploy Frontend to Vercel (FREE)**

1. **Update Backend URL in Code:**
   - Open: `src/config.js`
   - Replace line 14 with YOUR Render backend URL:
   ```javascript
   return 'https://lms-backend-360-xxxx.onrender.com/api';
   ```
   - Save and push to GitHub:
   ```bash
   git add src/config.js
   git commit -m "Update production API URL"
   git push
   ```

2. **Go to Vercel:**
   - Visit: https://vercel.com
   - Click "Sign Up" → Use GitHub
   - Click "Add New..." → "Project"

3. **Import Repository:**
   - Find: `mulige-indu/lms-aispry`
   - Click "Import"

4. **Configure Project:**
   ```
   Framework Preset: Other
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

5. **Add Environment Variable (Optional):**
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL=https://lms-backend-360-xxxx.onrender.com/api
     ```

6. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - **YOUR WEBSITE IS LIVE!**
   - URL: `https://your-project.vercel.app`

---

## 🎉 SUCCESS! YOUR WEBSITE IS NOW ONLINE!

### Your URLs:
- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://lms-backend-360-xxxx.onrender.com`

### Share Your Website:
- Send the **frontend URL** to anyone
- They can visit, register, login, browse courses!

---

## ⚠️ IMPORTANT NOTES:

### Free Tier Limitations:
1. **Render Backend:**
   - Spins down after 15 minutes of inactivity
   - First visit after inactivity takes 30-60 seconds to wake up
   - 750 hours/month free (enough for personal projects)

2. **Vercel Frontend:**
   - 100% uptime
   - Fast global CDN
   - 100GB bandwidth/month

### Custom Domain (Optional):
- Buy domain from Namecheap/GoDaddy (~$10/year)
- Add to Vercel: Settings → Domains → Add
- Get professional URL like: `www.360digitmg.com`

---

## 🔧 TROUBLESHOOTING:

### "Cannot connect to database" error:
- Make sure you've created a MySQL database
- Double-check DB credentials in Render env vars
- Database host should be accessible from Render servers

### "CORS error" in browser console:
- Backend `server.js` already has CORS enabled
- Make sure backend URL is correct in `src/config.js`

### Email not sending:
- Verify EMAIL_USER and EMAIL_PASSWORD in Render env vars
- Make sure you're using Gmail App Password, not regular password

### Website shows "API Error":
- Check if backend is running (visit backend URL directly)
- Render free tier sleeps after 15 min - first load takes time
- Check Render logs for errors

---

## 📱 NEXT STEPS:

1. **Test Everything:**
   - Visit your frontend URL
   - Try signup/login
   - Test course enrollment
   - Submit "Book Free Class" form

2. **Share Your Link:**
   - Send frontend URL to friends/teachers
   - Post on social media
   - Add to your resume/portfolio

3. **Monitor Usage:**
   - Check Render dashboard for backend status
   - Vercel shows visitor analytics

---

## 💡 UPGRADE OPTIONS (When Ready):

### Keep it Free:
- Current setup works great for 100-1000 users
- Perfect for portfolio/learning projects

### Upgrade for Production:
- **Render:** $7/month (always-on, no sleep)
- **PlanetScale:** Free MySQL (1 database, 5GB storage)
- **Custom Domain:** $10/year

---

## 🆘 NEED HELP?

If you get stuck:
1. Check Render logs: Dashboard → Your Service → Logs
2. Check browser console: F12 → Console tab
3. Verify all environment variables are set correctly

---

**Made with ❤️ using Claude Code**
