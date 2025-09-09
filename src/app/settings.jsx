import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft,
  Globe,
  ExternalLink,
  Instagram,
  Facebook,
  Info
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={{ 
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#1a1a1a'
        }}>
          {t('settings')}
        </Text>
        
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          
          {/* Language Section */}
          <View style={{
            backgroundColor: '#f9fafb',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20
          }}>
            <View style={{
              flexDirection: language === 'ar' ? 'row-reverse' : 'row',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <View style={{
                backgroundColor: '#3b82f6',
                padding: 8,
                borderRadius: 8,
                marginRight: language === 'ar' ? 0 : 12,
                marginLeft: language === 'ar' ? 12 : 0
              }}>
                <Globe size={20} color="#ffffff" />
              </View>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                {t('language')}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              padding: 4
            }}>
              <TouchableOpacity
                onPress={() => language === 'ar' && toggleLanguage()}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 6,
                  backgroundColor: language === 'en' ? '#3b82f6' : 'transparent',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: language === 'en' ? '#ffffff' : '#6b7280'
                }}>
                  English
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => language === 'en' && toggleLanguage()}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 6,
                  backgroundColor: language === 'ar' ? '#3b82f6' : 'transparent',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: language === 'ar' ? '#ffffff' : '#6b7280'
                }}>
                  العربية
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* About Us Section */}
          <View style={{
            backgroundColor: '#f9fafb',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20
          }}>
            <View style={{
              flexDirection: language === 'ar' ? 'row-reverse' : 'row',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <View style={{
                backgroundColor: '#10b981',
                padding: 8,
                borderRadius: 8,
                marginRight: language === 'ar' ? 0 : 12,
                marginLeft: language === 'ar' ? 12 : 0
              }}>
                <Info size={20} color="#ffffff" />
              </View>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                {t('aboutUs')}
              </Text>
            </View>

            <Text style={{
              fontSize: 14,
              color: '#374151',
              textAlign: language === 'ar' ? 'right' : 'left',
              lineHeight: 22,
              marginBottom: 20
            }}>
              {t('aboutUsContent')}
            </Text>

            {/* Website Link */}
            <TouchableOpacity
              onPress={() => openURL('https://irl.ma')}
              style={{
                flexDirection: language === 'ar' ? 'row-reverse' : 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                padding: 16,
                borderRadius: 8,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb'
              }}
            >
              <ExternalLink size={20} color="#3b82f6" />
              <Text style={{
                marginLeft: language === 'ar' ? 0 : 12,
                marginRight: language === 'ar' ? 12 : 0,
                fontSize: 16,
                fontWeight: '600',
                color: '#3b82f6',
                flex: 1
              }}>
                {t('visitWebsite')}
              </Text>
            </TouchableOpacity>

            {/* Social Media Links */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <TouchableOpacity
                onPress={() => openURL('https://instagram.com/irlcollective_')}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 8,
                  marginRight: 6,
                  borderWidth: 1,
                  borderColor: '#e5e7eb'
                }}
              >
                <Instagram size={20} color="#E4405F" />
                <Text style={{
                  marginLeft: 8,
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#E4405F'
                }}>
                  Instagram
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openURL('https://facebook.com/irlmovement')}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 8,
                  marginLeft: 6,
                  borderWidth: 1,
                  borderColor: '#e5e7eb'
                }}
              >
                <Facebook size={20} color="#1877F2" />
                <Text style={{
                  marginLeft: 8,
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#1877F2'
                }}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info */}
          <View style={{
            backgroundColor: '#f9fafb',
            borderRadius: 12,
            padding: 20,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginBottom: 8
            }}>
              IRL: Digital Detox Agent
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#6b7280',
              textAlign: 'center',
              marginBottom: 8
            }}>
              Version 1.0.0
            </Text>
            <Text style={{
              fontSize: 12,
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              © 2025 IRL Collective. {t('allRightsReserved')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}