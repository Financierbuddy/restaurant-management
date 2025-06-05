# 🔧 Troubleshooting Guide

## ✅ Issues Fixed

### 1. AuthProvider Not Available
**Error**: `useAuth must be used within an AuthProvider`

**Solution**: ✅ Added `AuthProvider` to root layout (`src/app/layout.tsx`)
```tsx
import { AuthProvider } from '@/contexts/AuthContext'

// Wrapped the entire app with AuthProvider
<AuthProvider>
  {/* app content */}
</AuthProvider>
```

### 2. API URL Configuration
**Error**: API calls failing due to missing environment variables

**Solution**: ✅ Created `.env.local` with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🚀 Next Steps

### 1. Start Your Laravel Backend
Make sure your Laravel API is running on `http://localhost:8000`:
```bash
cd your-laravel-project
php artisan serve
```

### 2. Verify API Endpoints
Your Laravel routes should be accessible at:
- `http://localhost:8000/api/auth/login`
- `http://localhost:8000/api/profile`
- `http://localhost:8000/api/users/me`
- etc.

### 3. Test the Integration
1. **Restart Next.js** (already done): `npm run dev`
2. **Visit**: `http://localhost:3000/account`
3. **Expected behavior**: 
   - Should redirect to login if not authenticated
   - Should load profile data if authenticated

## 🔍 Debugging Tips

### Check Environment Variables
```bash
# In your Next.js app, add this to any page to debug:
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

### Check Network Tab
1. Open browser DevTools → Network tab
2. Visit `/account` page
3. Look for API calls to your Laravel backend
4. Check request/response data

### Check Authentication Flow
1. Visit `/login` first
2. Login with valid credentials
3. Should redirect to account page
4. Check if token is saved in cookies

## 🛠️ Common Issues & Solutions

### Issue: CORS Errors
**Solution**: In your Laravel `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_headers' => ['*'],
'allowed_methods' => ['*'],
```

### Issue: 401 Unauthorized
**Cause**: Token not being sent or invalid
**Check**: 
1. Token exists in cookies
2. Bearer token format in request headers
3. Laravel middleware configuration

### Issue: 404 Not Found
**Cause**: Route not found in Laravel
**Check**: 
1. `php artisan route:list` to see available routes
2. Ensure routes are in `routes/api.php`
3. Check route parameters match

## 📊 API Testing Checklist

- [ ] Laravel backend running on port 8000
- [ ] Environment file `.env.local` created
- [ ] Next.js server restarted
- [ ] AuthProvider wrapped in layout
- [ ] CORS configured in Laravel
- [ ] API routes defined in Laravel

## 🎯 Test Pages

| Page | URL | API Endpoints |
|------|-----|---------------|
| Login | `/login` | `POST /auth/login` |
| Account | `/account` | `GET /profile`, `PUT /profile` |
| Preferences | `/account-preferences` | `GET/POST /users/preferences` |
| QR Code | `/qr` | `GET /qr/{hash}/{slug}` |
| Admin | `/admin-v1/user` | `GET /users/me`, `GET /users/{id}` |

## 🔗 Quick Test Commands

```bash
# Test Laravel API directly
curl http://localhost:8000/api/auth/login

# Check if Next.js can reach Laravel
# (from browser console)
fetch('http://localhost:8000/api/auth/login', {method: 'POST'})
```

## 📧 Still Having Issues?

1. Check browser console for JavaScript errors
2. Check Laravel logs: `tail -f storage/logs/laravel.log`
3. Verify database connection in Laravel
4. Test API endpoints with Postman first

---

✨ **Everything should now work!** Try visiting `/account` - it should either show the account page (if logged in) or redirect to login. 