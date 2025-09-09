import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BarChart3, Shield, Award, Globe } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Landing() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t('trackUsage'),
      description: t('trackUsageDesc')
    },
    {
      icon: Shield,
      title: t('setLimits'),
      description: t('setLimitsDesc')
    },
    {
      icon: Award,
      title: t('earnBadges'),
      description: t('earnBadgesDesc')
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      
      {/* Header with Language Switcher */}
      <View style={{ 
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1a1a1a'
        }}>
          IRL: Digital Detox
        </Text>
        
        <TouchableOpacity 
          onPress={toggleLanguage}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20
          }}
        >
          <Globe size={16} color="#6b7280" />
          <Text style={{
            marginLeft: 6,
            fontSize: 14,
            fontWeight: '600',
            color: '#6b7280'
          }}>
            {language === 'en' ? 'العربية' : 'English'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 60 }}>
          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: language === 'ar' ? 'right' : 'left',
            marginBottom: 16,
            lineHeight: 44
          }}>
            {t('heroTitle')}
          </Text>
          
          <Text style={{
            fontSize: 18,
            color: '#6b7280',
            textAlign: language === 'ar' ? 'right' : 'left',
            marginBottom: 40,
            lineHeight: 26
          }}>
            {t('heroSubtitle')}
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/dashboard')}
            style={{
              backgroundColor: '#3b82f6',
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 20
            }}
          >
            <Text style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: '600'
            }}>
              {t('getStarted')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: language === 'ar' ? 'right' : 'left',
            marginBottom: 30
          }}>
            {t('keyFeatures')}
          </Text>

          {features.map((feature, index) => (
            <View key={index} style={{
              flexDirection: language === 'ar' ? 'row-reverse' : 'row',
              backgroundColor: '#f9fafb',
              padding: 20,
              borderRadius: 12,
              marginBottom: 16,
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: '#3b82f6',
                padding: 12,
                borderRadius: 10,
                marginRight: language === 'ar' ? 0 : 16,
                marginLeft: language === 'ar' ? 16 : 0
              }}>
                <feature.icon size={24} color="#ffffff" />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1a1a1a',
                  textAlign: language === 'ar' ? 'right' : 'left',
                  marginBottom: 4
                }}>
                  {feature.title}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#6b7280',
                  textAlign: language === 'ar' ? 'right' : 'left',
                  lineHeight: 20
                }}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 40,
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#1a1a1a',
            marginBottom: 8
          }}>
            IRL
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            textAlign: 'center'
          }}>
            © 2025 IRL Collective. {t('allRightsReserved')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}