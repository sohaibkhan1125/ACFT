# ACFT Calculator Admin Panel

## Overview

The Admin Panel provides administrative control over the ACFT Calculator website, including maintenance mode management.

## Access

The Admin Panel is accessible at: `yourdomain.com/admin`

## Features

### General Settings

#### Maintenance Mode
- **Toggle Control**: Enable/disable maintenance mode with a simple toggle switch
- **Real-time Updates**: Changes are saved to Firebase and applied immediately
- **Status Indicator**: Visual indicator showing current maintenance mode status
- **Save Functionality**: Save button to persist changes to Firebase

## Firebase Integration

The Admin Panel uses Firebase Firestore to store and manage settings:

- **Collection**: `admin`
- **Document**: `maintenance_settings`
- **Fields**:
  - `enabled` (boolean): Maintenance mode status
  - `updatedAt` (string): Last update timestamp

## How It Works

1. **Maintenance Mode ON**: 
   - All visitors see a professional maintenance page
   - Admin panel remains accessible at `/admin`
   - Real-time updates via Firebase listeners

2. **Maintenance Mode OFF**:
   - Website functions normally
   - All features accessible to visitors

## Technical Implementation

### Components Structure
```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLayout.js      # Main admin layout
│   │   └── GeneralSettings.js  # Settings management
│   ├── MaintenancePage.js      # Maintenance mode page
│   └── MaintenanceWrapper.js   # Maintenance mode checker
├── firebase/
│   ├── config.js               # Firebase configuration
│   └── maintenanceService.js   # Firebase service functions
└── pages/
    └── AdminPage.js           # Admin route handler
```

### Firebase Service Functions
- `getMaintenanceMode()`: Get current maintenance status
- `setMaintenanceMode(enabled)`: Set maintenance status
- `onMaintenanceModeChange(callback)`: Real-time listener

## Security Considerations

- Admin panel is accessible without authentication (as requested)
- Maintenance mode only affects the main website, not the admin panel
- All changes are logged with timestamps in Firebase

## Usage Instructions

1. Navigate to `/admin` to access the admin panel
2. Click on "General Settings" in the sidebar
3. Toggle the maintenance mode switch
4. Click "Save Settings" to apply changes
5. Changes take effect immediately across the website

## Maintenance Page Features

When maintenance mode is enabled, visitors see:
- Professional maintenance page design
- Clear messaging about the maintenance
- Contact information for support
- Animated background elements
- Responsive design for all devices

## Development Notes

- Uses React Router for navigation
- Firebase Firestore for data persistence
- Real-time updates via Firebase listeners
- Professional UI with Tailwind CSS
- Mobile-responsive design
