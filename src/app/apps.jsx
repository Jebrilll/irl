import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Twitch,
  Gamepad2,
  Check,
} from "lucide-react-native";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Apps() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const [appSettings, setAppSettings] = useState({
    instagram: { enabled: false, dailyLimit: 60, openLimit: 10 },
    facebook: { enabled: false, dailyLimit: 45, openLimit: 8 },
    twitter: { enabled: false, dailyLimit: 30, openLimit: 15 },
    tiktok: { enabled: false, dailyLimit: 90, openLimit: 20 },
    youtube: { enabled: false, dailyLimit: 120, openLimit: 12 },
    linkedin: { enabled: false, dailyLimit: 30, openLimit: 5 },
    twitch: { enabled: false, dailyLimit: 180, openLimit: 6 },
    kick: { enabled: false, dailyLimit: 120, openLimit: 8 },
  });

  const availableApps = [
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "#E4405F",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
    },
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: Twitter,
      color: "#1DA1F2",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Gamepad2, // Using gamepad as placeholder for TikTok
      color: "#000000",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "#FF0000",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0A66C2",
    },
    {
      id: "twitch",
      name: "Twitch",
      icon: Twitch,
      color: "#9146FF",
    },
    {
      id: "kick",
      name: "Kick",
      icon: Gamepad2, // Using gamepad as placeholder for Kick
      color: "#53FC18",
    },
  ];

  // Load app settings on component mount
  useEffect(() => {
    loadAppSettings();
  }, []);

  const loadAppSettings = async () => {
    try {
      const response = await fetch("/api/app-settings");
      const data = await response.json();

      if (data.success && data.data) {
        const loadedSettings = { ...appSettings };

        // Update settings with backend data
        data.data.forEach((setting) => {
          if (loadedSettings[setting.app_id]) {
            loadedSettings[setting.app_id] = {
              enabled: setting.enabled,
              dailyLimit: setting.daily_limit_minutes,
              openLimit: setting.daily_open_limit,
            };
          }
        });

        setAppSettings(loadedSettings);
      }
    } catch (error) {
      console.error("Error loading app settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppSetting = (appId, field, value) => {
    setAppSettings((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/app-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appSettings }),
      });

      const data = await response.json();

      if (data.success) {
        setLastSaved(new Date());
        Alert.alert("Success", "App settings saved successfully!", [
          { text: "OK" },
        ]);

        // Track usage for enabled apps
        const enabledApps = Object.entries(appSettings)
          .filter(([_, settings]) => settings.enabled)
          .map(([appId, _]) => appId);

        // Start monitoring enabled apps (in a real implementation, this would
        // integrate with device APIs to monitor actual app usage)
        for (const appId of enabledApps) {
          await fetch("/api/usage-tracking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "app_opened",
              appId: appId,
            }),
          });
        }
      } else {
        Alert.alert("Error", data.error || "Failed to save app settings", [
          { text: "OK" },
        ]);
      }
    } catch (error) {
      console.error("Error saving app settings:", error);
      Alert.alert("Error", "Failed to save app settings. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading app settings...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#1a1a1a",
          }}
        >
          {t("monitoredApps")}
        </Text>

        <TouchableOpacity
          onPress={toggleLanguage}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            paddingHorizontal: 8,
            paddingVertical: 6,
            borderRadius: 16,
          }}
        >
          <Globe size={14} color="#6b7280" />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 12,
              fontWeight: "600",
              color: "#6b7280",
            }}
          >
            {language === "en" ? "AR" : "EN"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#6b7280",
              textAlign: language === "ar" ? "right" : "left",
              marginBottom: 30,
              lineHeight: 24,
            }}
          >
            {t("selectApps")}
          </Text>

          {/* Last Saved Indicator */}
          {lastSaved && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#dcfce7",
                padding: 12,
                borderRadius: 8,
                marginBottom: 20,
              }}
            >
              <Check size={16} color="#16a34a" />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  color: "#16a34a",
                  fontWeight: "500",
                }}
              >
                Last saved: {lastSaved.toLocaleTimeString()}
              </Text>
            </View>
          )}

          {availableApps.map((app) => (
            <View
              key={app.id}
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16,
                borderWidth: appSettings[app.id].enabled ? 2 : 1,
                borderColor: appSettings[app.id].enabled
                  ? app.color
                  : "#e5e7eb",
              }}
            >
              {/* App Header */}
              <View
                style={{
                  flexDirection: language === "ar" ? "row-reverse" : "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: appSettings[app.id].enabled ? 20 : 0,
                }}
              >
                <View
                  style={{
                    flexDirection: language === "ar" ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: app.color,
                      padding: 8,
                      borderRadius: 8,
                      marginRight: language === "ar" ? 0 : 12,
                      marginLeft: language === "ar" ? 12 : 0,
                    }}
                  >
                    <app.icon size={20} color="#ffffff" />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#1a1a1a",
                    }}
                  >
                    {app.name}
                  </Text>
                </View>

                <Switch
                  value={appSettings[app.id].enabled}
                  onValueChange={(value) =>
                    updateAppSetting(app.id, "enabled", value)
                  }
                  trackColor={{ false: "#e5e7eb", true: app.color + "40" }}
                  thumbColor={
                    appSettings[app.id].enabled ? app.color : "#9ca3af"
                  }
                />
              </View>

              {/* App Settings */}
              {appSettings[app.id].enabled && (
                <View>
                  {/* Daily Limit */}
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#374151",
                        textAlign: language === "ar" ? "right" : "left",
                        marginBottom: 8,
                      }}
                    >
                      {t("dailyLimit")}
                    </Text>
                    <TextInput
                      value={appSettings[app.id].dailyLimit.toString()}
                      onChangeText={(text) => {
                        const value = parseInt(text) || 0;
                        updateAppSetting(app.id, "dailyLimit", value);
                      }}
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#d1d5db",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        fontSize: 16,
                        textAlign: language === "ar" ? "right" : "left",
                      }}
                      placeholder="60"
                    />
                  </View>

                  {/* Open Limit */}
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: "#374151",
                        textAlign: language === "ar" ? "right" : "left",
                        marginBottom: 8,
                      }}
                    >
                      {t("openLimit")}
                    </Text>
                    <TextInput
                      value={appSettings[app.id].openLimit.toString()}
                      onChangeText={(text) => {
                        const value = parseInt(text) || 0;
                        updateAppSetting(app.id, "openLimit", value);
                      }}
                      keyboardType="numeric"
                      style={{
                        backgroundColor: "#ffffff",
                        borderWidth: 1,
                        borderColor: "#d1d5db",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        fontSize: 16,
                        textAlign: language === "ar" ? "right" : "left",
                      }}
                      placeholder="10"
                    />
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            style={{
              backgroundColor: saving ? "#9ca3af" : "#3b82f6",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              marginTop: 20,
              opacity: saving ? 0.7 : 1,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {saving ? "Saving..." : t("save")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
