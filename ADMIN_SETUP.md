# Admin Password Protection Setup

## Overview

The admin panel now includes an additional layer of security with password protection. Even authenticated admin users must enter a password to access the admin panel.

## Setup Instructions

### 1. Environment Variable Configuration

Create a `.env.local` file in your project root and add the following:

```bash
# Admin Password (change this to a secure password)
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_admin_password_here

# Other existing environment variables
NEXT_PUBLIC_UWDSC_WEBSITE_SERVER_URL=your_external_api_url_here
NEXT_PUBLIC_SECRET_KEY=your_event_secret_key_here
```

### 2. Default Password

If no environment variable is set, the default admin password is: `admin123`

**⚠️ Security Warning:** Change this default password immediately in production!

## How It Works

### Authentication Flow

1. **User Login**: Admin user logs in normally
2. **Admin Access**: User clicks "Admin" in navbar or navigates to `/admin`
3. **Verification Redirect**: Middleware redirects to `/admin/verify` if not verified
4. **Password Entry**: User enters admin password on verification page
5. **Session Creation**: If password is correct, `adminVerified` cookie is set
6. **Admin Access**: User can now access `/admin` for 24 hours

### Security Features

- **Session-based**: Admin verification lasts 24 hours
- **Cookie-based**: Uses secure HTTP-only cookies
- **Middleware Protection**: All admin routes are protected
- **Auto-redirect**: Already verified admins skip password entry
- **Logout Option**: Admin can logout from admin mode separately

### Routes

- `/admin/verify` - Password verification page
- `/admin` - Main admin dashboard (requires verification)

### Cookie Management

- `adminVerified=true` - Set when password is correct
- Expires after 24 hours
- Cleared on regular logout or admin logout

## Usage

### For Admin Users

1. Log in with admin credentials
2. Click "Admin" in the navbar
3. Enter the admin password when prompted
4. Access admin features
5. Use "Admin Logout" to exit admin mode

### For Developers

- Test with default password: `admin123`
- Set `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local` for production
- Admin verification is separate from regular authentication
- Middleware handles all routing logic automatically

## Security Considerations

1. **Strong Password**: Use a strong, unique password
2. **Environment Variables**: Never commit passwords to version control
3. **HTTPS**: Use HTTPS in production for secure cookie transmission
4. **Regular Rotation**: Consider changing admin password periodically
5. **Access Logging**: Monitor admin access for security

## Troubleshooting

### Common Issues

1. **Password not working**: Check environment variable is set correctly
2. **Redirect loops**: Clear browser cookies and try again
3. **Admin access denied**: Verify user has admin role in external system

### Debug Endpoints

- `/api/debug` - Check current cookies and authentication state
- Browser console logs show detailed authentication flow 