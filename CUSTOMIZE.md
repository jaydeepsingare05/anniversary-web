# 🎉 Anniversary Surprise App - Customization Guide

## Welcome! 🎊

This is your magical 3D cinematic anniversary surprise web app! Here's how to customize it with your real photos and memories.

## 📸 Adding Your Photos

### Step 1: Replace the Main Couple Photo
In `/src/app/App.tsx`, find line 12 and replace the URL with your couple photo:

```javascript
const coupleImage = 'YOUR_PHOTO_URL_HERE';
```

### Step 2: Replace Journey Photos
In the same file (around line 14), update the `photos` array with your actual photos. **These photos appear in both Scene 2 (Photo Journey Carousel) and Scene 4 (Memory Universe)**:

```javascript
const photos = [
  {
    url: 'YOUR_ENGAGEMENT_PHOTO_URL',
    caption: 'The moment we said yes',
    date: 'Your Engagement Date',
  },
  {
    url: 'YOUR_WEDDING_PHOTO_URL',
    caption: 'Our special day',
    date: 'Your Wedding Date',
  },
  // Add more photos...
];
```

**Pro Tip:** You can have 6-10 photos for the best experience! They'll appear as beautiful polaroids in Scene 2 and floating orbs in Scene 4.

## 📅 Customizing Timeline Milestones

Around line 44 in `/src/app/App.tsx`, update the `milestones` array:

```javascript
const milestones = [
  {
    icon: <Heart size={32} />,
    title: '💍 Your Milestone Title',
    date: 'Date',
    description: 'Your beautiful description here',
    photos: ['photo1_url', 'photo2_url'], // Optional
  },
  // Add more milestones...
];
```

## 🎨 Customizing Colors

### Rose Gold → Cream → Pink Theme
The new Scene 2 (Photo Journey) uses your requested color palette! You can adjust it in `/src/app/components/Scene2PhotoJourney.tsx`:

**Main Gradient (Line 28-35):** 
```javascript
background: [
  'linear-gradient(135deg, #E8B4B8 0%, #F5E6D3 50%, #FFD4E5 100%)',
  'linear-gradient(135deg, #F5E6D3 0%, #FFD4E5 50%, #FFC1D9 100%)',
  // ... more gradients
]
```

### Other Scene Gradients
**Scene 1 (Intro):** `/src/app/components/Scene1Intro.tsx` - Line 53
**Scene 3 (Gift Box):** `/src/app/components/Scene3GiftBox.tsx` - Line 35
**Scene 4 (Memory Universe):** `/src/app/components/Scene4MemoryUniverse.tsx` - Line 96
**Scene 5 (Timeline):** `/src/app/components/Scene5Timeline.tsx` - Line 20
**Scene 6 (Finale):** `/src/app/components/Scene6Finale.tsx` - Line 23

## ✨ Scene Breakdown

### 🎬 Scene 1: Cinematic Intro
- Main couple photo with 3D gyroscope tilt
- Rose petals, sparkles, light rays
- Letter-by-letter text reveal

### 📷 Scene 2: Photo Journey (NEW!)
- 3D polaroid-style carousel with your photos
- Auto-advances every 3 seconds
- Rose gold → cream → pink gradient background
- Vintage polaroid aesthetic

### 🎁 Scene 3: Gift Box
- Interactive 3D gift box
- Tap to open with explosion effect
- Sparkle particles burst

### 🌌 Scene 4: Memory Universe
- Photos orbit in 3D space
- Tap to expand and view details
- Double-tap for heart animations
- Swipe navigation

### 📖 Scene 5: Love Story Timeline
- Vertical timeline with milestones
- Expandable photo galleries
- Glowing light effects

### 💕 Scene 6: Finale
- Heart-shaped photo collage
- Floating lanterns
- Confetti rain
- Replay button

## ✨ Customizing Messages

### Intro Message
`/src/app/components/Scene1Intro.tsx` - Lines 134-154

### Photo Journey Title
`/src/app/components/Scene2PhotoJourney.tsx` - Lines 93-102

### Finale Message
`/src/app/components/Scene6Finale.tsx` - Lines 196-210

### Easter Egg Message
`/src/app/components/HiddenEasterEgg.tsx` - Lines 82-100

## 🎯 Using Your Own Photos (Not Unsplash)

If you have your photos hosted online:

1. Upload photos to a hosting service (Imgur, Cloudinary, or any CDN)
2. Get the direct image URLs
3. Replace all the Unsplash URLs in `/src/app/App.tsx` with your URLs

## 🎬 Scene Timing

You can adjust how long each scene lasts:

- **Scene 1 Button Appearance:** Line 44 in `Scene1Intro.tsx` (currently 5 seconds)
- **Scene 2 Photo Duration:** Line 17 in `Scene2PhotoJourney.tsx` (currently 3 seconds per photo)
- **Scene 3 Gift Animation:** Lines 15-20 in `Scene3GiftBox.tsx` (2 second sequence)

## 🎭 Special Features

### Hidden Easter Egg
Users can press and hold anywhere for 3 seconds to trigger a secret romantic message!

### Gyroscope 3D Tilt
Scene 1 uses phone gyroscope for 3D photo tilt effect (iOS users will get permission prompt)

### Heart Animation on Double Tap
In the Memory Universe scene, double-tap photos for heart animations!

### Polaroid Auto-Advance
Scene 2 automatically cycles through your journey photos like a cinematic slideshow!

## 📱 Testing

1. Open in a mobile browser (portrait mode only)
2. Allow device orientation permissions if prompted
3. Test all interactions:
   - Tap buttons
   - Swipe photos
   - Long press for easter egg
   - Double tap photos

## 🎁 Final Touch

Replace placeholder content with:
- Your actual photos
- Real dates and captions
- Personal messages
- Timeline milestones

## ❤️ Tips for Maximum Impact

1. Use high-quality photos (at least 1080px width)
2. Write heartfelt, personal captions
3. Choose photos that tell your love story
4. Test on the actual device before presenting
5. Make sure battery is charged!
6. Have tissues ready (they'll need them! 😭)

---

**Made with ❤️ for celebrating love**

Enjoy your magical anniversary surprise! 🎊✨