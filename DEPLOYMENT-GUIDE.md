# Deployment Guide: Public vs. Private Mode

This guide explains how to toggle between public and password-protected modes for your blog.

## How to Use Private/Public Modes

Your blog has two visibility modes:

1. **Public Mode (default)**: Anyone can access the site without a password
2. **Private Mode**: Requires a password to access any page (great for development & testing)

## Toggling Between Modes

### Option 1: Using the Admin Page

1. Go to `/admin` on your site (e.g., https://yourdomain.com/admin)
2. Log in with the admin password
3. Use the toggle switch to enable/disable password protection

### Option 2: Using Keyboard Shortcut

From any page on your site:

1. Press `Ctrl+Shift+P` to toggle between public and private modes
2. You'll see a confirmation message

## Passwords

- **Admin Password**: `admin1234` (change this in the admin.js file)
- **Site Visitor Passwords**: Any of the following will work:
  - `TheoBlog2025`
  - `FromBricksToBytes`
  - `DataJourney`

## Use Cases

- **Making Major Changes**: Enable private mode while you work on significant updates
- **Testing New Features**: Test in private mode before making them public
- **Content Preview**: Let specific people preview content with the password
- **Public Release**: Switch to public mode when ready to share with everyone

## Security Notes

This implementation is meant for convenience, not high security. The passwords are stored in the source code and local storage is used to maintain authentication state. For more secure implementations, consider:

1. Using environment variables for passwords
2. Implementing server-side authentication
3. Using a proper authentication service
