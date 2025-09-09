import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Landing Page
    heroTitle: 'Find Your Digital Balance',
    heroSubtitle: 'Help yourself not scroll your life away.',
    getStarted: 'Get Started',
    keyFeatures: 'Key Features',
    trackUsage: 'Track Usage',
    trackUsageDesc: 'Monitor your daily screen time across all your favorite apps',
    setLimits: 'Set Limits',
    setLimitsDesc: 'Create healthy boundaries with customizable daily limits',
    earnBadges: 'Earn Badges',
    earnBadgesDesc: 'Get rewarded for maintaining healthy digital habits',
    allRightsReserved: 'All rights reserved.',
    
    // Navigation
    dashboard: 'Dashboard',
    monitoredApps: 'Monitored Apps',
    reminders: 'Reminders',
    settings: 'Settings',
    
    // Dashboard
    weeklyOverview: 'Weekly Overview',
    totalWeeklyUsage: 'Total Weekly Usage',
    dailyAverage: 'Daily Average',
    peakDay: 'Peak Day',
    badges: 'Badges',
    hours: 'hours',
    minutes: 'minutes',
    
    // Apps
    selectApps: 'Select Apps to Monitor',
    dailyLimit: 'Daily Limit (minutes)',
    openLimit: 'Daily Opens Limit',
    save: 'Save',
    
    // Reminders
    morningReminder: 'Morning Reminder',
    eveningReminder: 'Evening Reminder',
    thresholdReminder: 'Threshold Reminder',
    enabled: 'Enabled',
    disabled: 'Disabled',
    editMessage: 'Edit Message',
    defaultMorningMessage: 'Good morning! Start your day mindfully.',
    defaultEveningMessage: 'Time to wind down. Consider putting your phone away.',
    defaultThresholdMessage: 'You\'ve reached your daily limit. Take a break!',
    
    // Settings
    language: 'Language',
    aboutUs: 'About Us',
    aboutUsContent: 'The app was provided by IRL collective, a platform for digital wellbeing and health. We help you live above ground without being a victim of any disorder or harm, intentional or unintentional, that may come to you from the digital world.',
    visitWebsite: 'Visit irl.ma',
    
    // Badge Names
    mindfulMonday: 'Mindful Monday',
    weekendWarrior: 'Weekend Warrior',
    consistentCheckin: 'Consistent Check-in',
    digitalDetox: 'Digital Detox',
    downwardTrend: 'Downward Trend',
    
    // Badge Descriptions
    mindfulMondayDesc: 'Started the week with reduced screen time',
    weekendWarriorDesc: 'Maintained healthy habits over the weekend',
    consistentCheckinDesc: 'Checked the app daily for a week',
    digitalDetoxDesc: 'Went a full day under all limits',
    downwardTrendDesc: 'Reduced usage for 3 consecutive days'
  },
  ar: {
    // Landing Page
    heroTitle: 'اعثر على توازنك الرقمي',
    heroSubtitle: 'ساعد نفسك على عدم تضييع حياتك في التمرير.',
    getStarted: 'ابدأ الآن',
    keyFeatures: 'الميزات الرئيسية',
    trackUsage: 'تتبع الاستخدام',
    trackUsageDesc: 'راقب وقت الشاشة اليومي عبر جميع تطبيقاتك المفضلة',
    setLimits: 'ضع حدود',
    setLimitsDesc: 'أنشئ حدود صحية مع حدود يومية قابلة للتخصيص',
    earnBadges: 'اكسب شارات',
    earnBadgesDesc: 'احصل على مكافآت للحفاظ على عادات رقمية صحية',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    monitoredApps: 'التطبيقات المراقبة',
    reminders: 'التذكيرات',
    settings: 'الإعدادات',
    
    // Dashboard
    weeklyOverview: 'نظرة عامة أسبوعية',
    totalWeeklyUsage: 'إجمالي الاستخدام الأسبوعي',
    dailyAverage: 'المتوسط اليومي',
    peakDay: 'اليوم الأعلى',
    badges: 'الشارات',
    hours: 'ساعات',
    minutes: 'دقائق',
    
    // Apps
    selectApps: 'اختر التطبيقات للمراقبة',
    dailyLimit: 'الحد اليومي (دقائق)',
    openLimit: 'حد الفتح اليومي',
    save: 'حفظ',
    
    // Reminders
    morningReminder: 'تذكير الصباح',
    eveningReminder: 'تذكير المساء',
    thresholdReminder: 'تذكير الحد الأقصى',
    enabled: 'مفعل',
    disabled: 'معطل',
    editMessage: 'تعديل الرسالة',
    defaultMorningMessage: 'صباح الخير! ابدأ يومك بوعي.',
    defaultEveningMessage: 'حان وقت الاسترخاء. فكر في وضع هاتفك جانباً.',
    defaultThresholdMessage: 'لقد وصلت إلى حدك اليومي. خذ استراحة!',
    
    // Settings
    language: 'اللغة',
    aboutUs: 'من نحن',
    aboutUsContent: 'تم توفير التطبيق من قبل مجموعة IRL، منصة للرفاهية والصحة الرقمية. نحن نساعدك على العيش فوق الأرض دون أن تكون ضحية لأي اضطراب أو ضرر، مقصود أو غير مقصود، قد يأتي إليك من العالم الرقمي.',
    visitWebsite: 'زيارة irl.ma',
    
    // Badge Names
    mindfulMonday: 'الاثنين الواعي',
    weekendWarrior: 'محارب نهاية الأسبوع',
    consistentCheckin: 'تسجيل دخول منتظم',
    digitalDetox: 'التخلص من السموم الرقمية',
    downwardTrend: 'اتجاه تنازلي',
    
    // Badge Descriptions
    mindfulMondayDesc: 'بدأ الأسبوع بتقليل وقت الشاشة',
    weekendWarriorDesc: 'حافظ على عادات صحية خلال نهاية الأسبوع',
    consistentCheckinDesc: 'فحص التطبيق يومياً لمدة أسبوع',
    digitalDetoxDesc: 'قضى يوماً كاملاً تحت جميع الحدود',
    downwardTrendDesc: 'قلل الاستخدام لمدة 3 أيام متتالية'
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}