import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Switch, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft,
  Globe,
  Sun,
  Moon,
  AlertTriangle,
  Edit3,
  X
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Reminders() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [editingReminder, setEditingReminder] = useState(null);
  const [tempMessage, setTempMessage] = useState('');

  const [reminders, setReminders] = useState({
    morning: {
      enabled: true,
      message: t('defaultMorningMessage'),
      time: '08:00'
    },
    evening: {
      enabled: true,
      message: t('defaultEveningMessage'),
      time: '22:00'
    },
    threshold: {
      enabled: true,
      message: t('defaultThresholdMessage')
    }
  });

  const reminderTypes = [
    {
      id: 'morning',
      icon: Sun,
      title: t('morningReminder'),
      color: '#f59e0b',
      hasTime: true
    },
    {
      id: 'evening',
      icon: Moon,
      title: t('eveningReminder'),
      color: '#6366f1',
      hasTime: true
    },
    {
      id: 'threshold',
      icon: AlertTriangle,
      title: t('thresholdReminder'),
      color: '#ef4444',
      hasTime: false
    }
  ];

  const updateReminder = (type, field, value) => {
    setReminders(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const openEditModal = (type) => {
    setEditingReminder(type);
    setTempMessage(reminders[type].message);
  };

  const saveMessage = () => {
    if (editingReminder) {
      updateReminder(editingReminder, 'message', tempMessage);
      setEditingReminder(null);
      setTempMessage('');
    }
  };

  const cancelEdit = () => {
    setEditingReminder(null);
    setTempMessage('');
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
          {t('reminders')}
        </Text>
        
        <TouchableOpacity 
          onPress={toggleLanguage}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f4f6',
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 16
          }}
        >
          <Globe size={14} color="#6b7280" />
          <Text style={{
            marginLeft: 4,
            fontSize: 12,
            fontWeight: '600',
            color: '#6b7280'
          }}>
            {language === 'en' ? 'AR' : 'EN'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {reminderTypes.map((reminderType) => (
            <View key={reminderType.id} style={{
              backgroundColor: '#f9fafb',
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              borderWidth: reminders[reminderType.id].enabled ? 2 : 1,
              borderColor: reminders[reminderType.id].enabled ? reminderType.color : '#e5e7eb'
            }}>
              {/* Reminder Header */}
              <View style={{
                flexDirection: language === 'ar' ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 16
              }}>
                <View style={{
                  flexDirection: language === 'ar' ? 'row-reverse' : 'row',
                  alignItems: 'center'
                }}>
                  <View style={{
                    backgroundColor: reminderType.color,
                    padding: 8,
                    borderRadius: 8,
                    marginRight: language === 'ar' ? 0 : 12,
                    marginLeft: language === 'ar' ? 12 : 0
                  }}>
                    <reminderType.icon size={20} color="#ffffff" />
                  </View>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    {reminderType.title}
                  </Text>
                </View>

                <Switch
                  value={reminders[reminderType.id].enabled}
                  onValueChange={(value) => updateReminder(reminderType.id, 'enabled', value)}
                  trackColor={{ false: '#e5e7eb', true: reminderType.color + '40' }}
                  thumbColor={reminders[reminderType.id].enabled ? reminderType.color : '#9ca3af'}
                />
              </View>

              {/* Reminder Settings */}
              {reminders[reminderType.id].enabled && (
                <View>
                  {/* Time Setting (for morning and evening) */}
                  {reminderType.hasTime && (
                    <View style={{ marginBottom: 16 }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#374151',
                        textAlign: language === 'ar' ? 'right' : 'left',
                        marginBottom: 8
                      }}>
                        Time
                      </Text>
                      <TextInput
                        value={reminders[reminderType.id].time}
                        onChangeText={(text) => updateReminder(reminderType.id, 'time', text)}
                        style={{
                          backgroundColor: '#ffffff',
                          borderWidth: 1,
                          borderColor: '#d1d5db',
                          borderRadius: 8,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                          fontSize: 16,
                          textAlign: language === 'ar' ? 'right' : 'left'
                        }}
                        placeholder="08:00"
                      />
                    </View>
                  )}

                  {/* Message */}
                  <View>
                    <View style={{
                      flexDirection: language === 'ar' ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Message
                      </Text>
                      <TouchableOpacity
                        onPress={() => openEditModal(reminderType.id)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: reminderType.color + '20',
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 6
                        }}
                      >
                        <Edit3 size={14} color={reminderType.color} />
                        <Text style={{
                          marginLeft: 4,
                          fontSize: 12,
                          fontWeight: '600',
                          color: reminderType.color
                        }}>
                          {t('editMessage')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={{
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      padding: 12,
                      minHeight: 60
                    }}>
                      <Text style={{
                        fontSize: 14,
                        color: '#374151',
                        textAlign: language === 'ar' ? 'right' : 'left',
                        lineHeight: 20
                      }}>
                        {reminders[reminderType.id].message}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Edit Message Modal */}
      <Modal
        visible={editingReminder !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelEdit}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20
        }}>
          <View style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 20,
            width: '100%',
            maxWidth: 400
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1a1a1a'
              }}>
                {t('editMessage')}
              </Text>
              <TouchableOpacity onPress={cancelEdit}>
                <X size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <TextInput
              value={tempMessage}
              onChangeText={setTempMessage}
              multiline={true}
              numberOfLines={4}
              style={{
                backgroundColor: '#f9fafb',
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 16,
                textAlign: language === 'ar' ? 'right' : 'left',
                minHeight: 100,
                textAlignVertical: 'top',
                marginBottom: 20
              }}
              placeholder="Enter your custom message..."
            />

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <TouchableOpacity
                onPress={cancelEdit}
                style={{
                  flex: 1,
                  backgroundColor: '#f3f4f6',
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginRight: 8
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveMessage}
                style={{
                  flex: 1,
                  backgroundColor: '#3b82f6',
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginLeft: 8
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  {t('save')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}