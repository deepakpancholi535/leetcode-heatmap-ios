# LeetCode Heatmap iOS App

A beautiful iOS app to track LeetCode progress for **deepakpancholi535** with visual heatmap and statistics.

## Features

- 📊 **Visual Heatmap**: GitHub-style contribution heatmap showing daily submissions
- 📈 **Statistics Dashboard**: Total problems solved, difficulty breakdown (Easy/Medium/Hard)
- 🏆 **Global Ranking**: Display your LeetCode global ranking
- 🔗 **Direct Profile Link**: One-tap access to your LeetCode profile
- 🎨 **Beautiful UI**: Clean, modern interface optimized for iOS

## Screenshots

The app displays:
- Total problems solved
- Easy, Medium, and Hard problem counts
- Global ranking
- 365-day submission heatmap
- Direct link to LeetCode profile

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Xcode 14+ (for iOS development)
- CocoaPods
- React Native CLI

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/deepakpancholi535/leetcode-heatmap-ios.git
cd leetcode-heatmap-ios
```

2. **Install dependencies**
```bash
npm install
```

3. **Install iOS dependencies**
```bash
cd ios
pod install
cd ..
```

4. **Run on iOS**
```bash
npm run ios
```

## Customization

To use this app for a different LeetCode username, modify the `LEETCODE_USERNAME` constant in `App.tsx`:

```typescript
const LEETCODE_USERNAME = 'your-username-here';
```

## App Store Deployment

### Step 1: Configure App in Xcode

1. Open `ios/LeetCodeHeatmap.xcworkspace` in Xcode
2. Select your project in the navigator
3. Update **Bundle Identifier** (e.g., `com.yourname.leetcodeheatmap`)
4. Set **Team** to your Apple Developer account
5. Configure **App Icons** in Assets.xcassets
6. Update **Display Name** and **Version**

### Step 2: Create App Store Connect Record

1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Click **My Apps** → **+** → **New App**
3. Fill in app information:
   - **Platform**: iOS
   - **Name**: LeetCode Heatmap
   - **Primary Language**: English
   - **Bundle ID**: Match your Xcode bundle identifier
   - **SKU**: Unique identifier

### Step 3: Prepare App Metadata

Required information:
- **App Name**: LeetCode Heatmap
- **Subtitle**: Track Your Coding Progress
- **Description**: Detailed app description
- **Keywords**: leetcode, coding, heatmap, progress tracker
- **Screenshots**: iPhone 6.7", 6.5", and 5.5" displays
- **App Icon**: 1024x1024px
- **Privacy Policy URL**: Required for App Store

### Step 4: Build and Archive

1. In Xcode, select **Any iOS Device** as target
2. Go to **Product** → **Archive**
3. Once archived, click **Distribute App**
4. Select **App Store Connect**
5. Follow the upload wizard

### Step 5: Submit for Review

1. In App Store Connect, select your app
2. Create a new version
3. Fill in **What's New** section
4. Add screenshots and preview videos
5. Complete **App Review Information**
6. Submit for review

### Step 6: App Review Process

- Review typically takes 24-48 hours
- Respond promptly to any reviewer questions
- Once approved, app goes live automatically or on your scheduled date

## Technical Details

### API Integration

The app uses LeetCode's GraphQL API:
- Endpoint: `https://leetcode.com/graphql`
- Fetches user statistics and submission calendar
- No authentication required for public profiles

### Data Displayed

- **Total Solved**: All accepted submissions
- **Difficulty Breakdown**: Easy, Medium, Hard counts
- **Global Ranking**: Your position among all users
- **Heatmap**: 365-day submission history with color intensity

### Color Scheme

Heatmap colors based on daily submissions:
- Gray (#ebedf0): 0 submissions
- Light Green (#9be9a8): 1-2 submissions
- Green (#40c463): 3-5 submissions
- Dark Green (#30a14e): 6-8 submissions
- Darkest Green (#216e39): 9+ submissions

## Troubleshooting

### Build Errors

**Pod install fails:**
```bash
cd ios
pod deintegrate
pod install
```

**Metro bundler issues:**
```bash
npm start -- --reset-cache
```

**Xcode build fails:**
- Clean build folder: Cmd + Shift + K
- Delete derived data
- Restart Xcode

### API Issues

If data doesn't load:
- Check internet connection
- Verify LeetCode username is correct
- Check LeetCode API status

## Requirements

- iOS 13.0 or higher
- Internet connection for data fetching
- Valid LeetCode username

## License

MIT License - Feel free to use and modify

## Support

For issues or questions:
- Open an issue on GitHub
- Check LeetCode API documentation
- Review React Native documentation

## Future Enhancements

Potential features:
- Multiple user profiles
- Problem difficulty filters
- Streak tracking
- Push notifications for daily reminders
- Dark mode support
- Offline caching
- Contest participation tracking

---

**Built with React Native for iOS** 🚀

Profile: [deepakpancholi535 on LeetCode](https://leetcode.com/deepakpancholi535)
