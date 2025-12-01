# Complete App Store Deployment Guide

## Prerequisites Checklist

- [ ] Apple Developer Account ($99/year)
- [ ] Mac with Xcode 14+
- [ ] Valid payment method for App Store Connect
- [ ] App icons (1024x1024px)
- [ ] Screenshots for all required device sizes
- [ ] Privacy policy URL

## Step-by-Step Deployment

### 1. Apple Developer Account Setup

1. **Enroll in Apple Developer Program**
   - Visit: https://developer.apple.com/programs/
   - Cost: $99/year
   - Processing time: 24-48 hours

2. **Create App ID**
   - Go to: https://developer.apple.com/account/resources/identifiers
   - Click **+** to create new identifier
   - Select **App IDs** → **App**
   - Description: LeetCode Heatmap
   - Bundle ID: `com.yourname.leetcodeheatmap` (explicit)
   - Capabilities: None required for this app

3. **Create Provisioning Profile**
   - Go to: https://developer.apple.com/account/resources/profiles
   - Click **+** to create new profile
   - Select **App Store** distribution
   - Choose your App ID
   - Select your distribution certificate
   - Download and install

### 2. Xcode Configuration

1. **Open Project**
   ```bash
   cd ios
   open LeetCodeHeatmap.xcworkspace
   ```

2. **Update Project Settings**
   - Select project in navigator
   - **General Tab**:
     - Display Name: `LeetCode Heatmap`
     - Bundle Identifier: `com.yourname.leetcodeheatmap`
     - Version: `1.0.0`
     - Build: `1`
     - Deployment Target: `iOS 13.0`
   
   - **Signing & Capabilities**:
     - Team: Select your Apple Developer team
     - Signing Certificate: Apple Distribution
     - Provisioning Profile: Match your App ID

3. **Add App Icons**
   - Navigate to `ios/LeetCodeHeatmap/Images.xcassets/AppIcon.appiconset`
   - Add icons for all required sizes:
     - 20x20 (2x, 3x)
     - 29x29 (2x, 3x)
     - 40x40 (2x, 3x)
     - 60x60 (2x, 3x)
     - 1024x1024 (App Store)

### 3. App Store Connect Setup

1. **Create App Record**
   - Visit: https://appstoreconnect.apple.com
   - Click **My Apps** → **+** → **New App**
   - Platform: iOS
   - Name: LeetCode Heatmap
   - Primary Language: English
   - Bundle ID: Select your bundle ID
   - SKU: `leetcode-heatmap-001`
   - User Access: Full Access

2. **App Information**
   - **Category**: Productivity or Developer Tools
   - **Content Rights**: Check if you own rights
   - **Age Rating**: 4+
   - **Privacy Policy URL**: Required (create one)

3. **Pricing and Availability**
   - Price: Free (or set price)
   - Availability: All countries
   - Pre-order: Optional

### 4. Prepare App Metadata

#### App Description
```
Track your LeetCode coding journey with a beautiful visual heatmap! 

LeetCode Heatmap helps you visualize your problem-solving progress with:

✓ GitHub-style contribution heatmap showing 365 days of activity
✓ Comprehensive statistics: total problems solved, difficulty breakdown
✓ Real-time global ranking display
✓ Direct link to your LeetCode profile
✓ Clean, intuitive interface designed for iOS

Perfect for:
- Tracking daily coding consistency
- Visualizing your learning progress
- Staying motivated with visual feedback
- Monitoring your competitive programming journey

Features:
• 365-day submission heatmap with color intensity
• Easy, Medium, and Hard problem counts
• Global ranking among all LeetCode users
• One-tap access to your LeetCode profile
• Automatic data synchronization
• Beautiful, native iOS design

Stay consistent, track your progress, and level up your coding skills!
```

#### Keywords
```
leetcode, coding, heatmap, programming, algorithm, data structures, interview prep, coding practice, developer tools, progress tracker
```

#### Support URL
```
https://github.com/deepakpancholi535/leetcode-heatmap-ios
```

#### Marketing URL (Optional)
```
https://github.com/deepakpancholi535/leetcode-heatmap-ios
```

### 5. Create Screenshots

Required sizes:
- **6.7" Display** (iPhone 14 Pro Max): 1290 x 2796 pixels
- **6.5" Display** (iPhone 11 Pro Max): 1242 x 2688 pixels
- **5.5" Display** (iPhone 8 Plus): 1242 x 2208 pixels

**Screenshot Tips:**
- Show main heatmap view
- Display statistics dashboard
- Highlight key features
- Use device frames for better presentation
- Add captions explaining features

**Tools for Screenshots:**
- Xcode Simulator
- Screenshot Framer: https://www.screenshotframer.com
- App Store Screenshot Generator

### 6. Build and Archive

1. **Clean Build**
   ```bash
   # In Xcode
   Product → Clean Build Folder (Cmd + Shift + K)
   ```

2. **Select Target**
   - Change scheme to **Any iOS Device (arm64)**
   - Do NOT use simulator

3. **Archive**
   ```bash
   # In Xcode
   Product → Archive
   ```
   - Wait for build to complete
   - Archive will appear in Organizer

4. **Validate Archive**
   - In Organizer, select your archive
   - Click **Validate App**
   - Select distribution method: App Store Connect
   - Choose automatic signing
   - Click **Validate**
   - Fix any errors/warnings

5. **Distribute**
   - Click **Distribute App**
   - Select **App Store Connect**
   - Upload method: **Upload**
   - Distribution options:
     - ✓ Strip Swift symbols
     - ✓ Upload your app's symbols
     - ✓ Manage Version and Build Number
   - Click **Upload**

### 7. Submit for Review

1. **Select Build**
   - In App Store Connect, go to your app
   - Click **+ Version** or **Prepare for Submission**
   - Select the uploaded build

2. **Version Information**
   - **What's New in This Version**:
     ```
     Initial release of LeetCode Heatmap!
     
     • Visual heatmap showing 365 days of coding activity
     • Real-time statistics and global ranking
     • Direct link to LeetCode profile
     • Beautiful iOS-native design
     ```

3. **App Review Information**
   - First Name: Your first name
   - Last Name: Your last name
   - Phone: Your phone number
   - Email: Your email
   - Demo Account: Not required (public data)
   - Notes: 
     ```
     This app displays public LeetCode profile data for username: deepakpancholi535
     No login required. All data is fetched from LeetCode's public API.
     ```

4. **Version Release**
   - Automatically release after approval
   - OR manually release

5. **Submit**
   - Click **Add for Review**
   - Click **Submit to App Review**

### 8. App Review Process

**Timeline:**
- Initial review: 24-48 hours
- Resubmission: 24 hours

**Common Rejection Reasons:**
- Missing privacy policy
- Incomplete metadata
- App crashes on launch
- Misleading screenshots
- Guideline violations

**If Rejected:**
- Read rejection message carefully
- Fix issues mentioned
- Respond in Resolution Center
- Resubmit with changes

### 9. Post-Approval

**Once Approved:**
- App goes live (if auto-release enabled)
- Available on App Store within 24 hours
- Monitor reviews and ratings
- Respond to user feedback

**App Store Link:**
```
https://apps.apple.com/app/idYOUR_APP_ID
```

### 10. Updates and Maintenance

**For Updates:**
1. Increment version number in Xcode
2. Update "What's New" in App Store Connect
3. Archive and upload new build
4. Submit for review

**Version Numbering:**
- Major updates: 2.0.0
- Minor features: 1.1.0
- Bug fixes: 1.0.1

## Troubleshooting

### Build Errors

**"No signing certificate found"**
- Go to Xcode → Preferences → Accounts
- Select your team → Manage Certificates
- Click **+** → Apple Distribution

**"Provisioning profile doesn't match"**
- Delete old profiles
- Let Xcode automatically manage signing
- Or create new profile in Developer Portal

**"Archive not showing in Organizer"**
- Ensure target is "Any iOS Device"
- Check build settings for valid architectures
- Clean build folder and retry

### Upload Errors

**"Invalid Bundle"**
- Check bundle identifier matches App Store Connect
- Verify all required icons are present
- Ensure Info.plist is properly configured

**"Missing Compliance"**
- Answer export compliance questions
- Most apps: No encryption (select No)

## Resources

- **Apple Developer**: https://developer.apple.com
- **App Store Connect**: https://appstoreconnect.apple.com
- **App Store Review Guidelines**: https://developer.apple.com/app-store/review/guidelines/
- **Human Interface Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **App Store Connect Help**: https://help.apple.com/app-store-connect/

## Costs

- Apple Developer Program: $99/year
- App Store listing: Free
- Optional: Marketing, analytics tools

## Timeline

- Account setup: 1-2 days
- Development: Already complete
- App Store setup: 2-3 hours
- Review process: 1-2 days
- **Total: ~3-5 days**

---

**Good luck with your App Store submission! 🚀**
