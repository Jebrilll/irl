import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  BarChart3,
  Smartphone,
  Bell,
  Settings,
  Award,
  Globe,
  Menu,
  X,
  RefreshCw,
} from "lucide-react-native";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { language, toggleLanguage, t } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);

  // Load dashboard data
  useEffect(() => {
    loadDashboardData();
    // Simulate some usage data on first load if none exists
    simulateInitialData();
  }, []);

  const simulateInitialData = async () => {
    try {
      // Check if we have any data
      const response = await fetch("/api/dashboard?timeframe=week");
      const data = await response.json();

      if (
        data.success &&
        (!data.data.dailyBreakdown || data.data.dailyBreakdown.length === 0)
      ) {
        // No data exists, simulate a week of usage
        await fetch("/api/simulate-usage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "simulate_week" }),
        });

        // Reload dashboard data
        setTimeout(() => loadDashboardData(), 1000);
      }
    } catch (error) {
      console.error("Error checking initial data:", error);
    }
  };

  const loadDashboardData = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const response = await fetch("/api/dashboard?timeframe=week");
      const data = await response.json();

      if (data.success) {
        setDashboardData(data.data);
      } else {
        console.error("Failed to load dashboard data:", data.error);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    loadDashboardData(true);
  };

  // Mock data as fallback
  const fallbackData = {
    summary: {
      totalHours: 28.5,
      dailyAverageHours: 4.1,
      peakDay: "Monday",
      peakDayHours: 6.2,
    },
    dailyBreakdown: [
      { date: "2025-01-06", hours: 3.2 },
      { date: "2025-01-07", hours: 6.2 },
      { date: "2025-01-08", hours: 4.1 },
      { date: "2025-01-09", hours: 3.8 },
      { date: "2025-01-10", hours: 4.5 },
      { date: "2025-01-11", hours: 2.1 },
      { date: "2025-01-12", hours: 4.6 },
    ],
    badges: [],
  };

  const data = dashboardData || fallbackData;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // All possible badges with their definitions
  const allBadges = [
    {
      id: "mindfulMonday",
      name: t("mindfulMonday"),
      description: t("mindfulMondayDesc"),
      color: "#10b981",
    },
    {
      id: "weekendWarrior",
      name: t("weekendWarrior"),
      description: t("weekendWarriorDesc"),
      color: "#8b5cf6",
    },
    {
      id: "consistentCheckin",
      name: t("consistentCheckin"),
      description: t("consistentCheckinDesc"),
      color: "#f59e0b",
    },
    {
      id: "digitalDetox",
      name: t("digitalDetox"),
      description: t("digitalDetoxDesc"),
      color: "#ef4444",
    },
    {
      id: "downwardTrend",
      name: t("downwardTrend"),
      description: t("downwardTrendDesc"),
      color: "#06b6d4",
    },
  ];

  // Merge earned badges with all badges
  const earnedBadgeIds = new Set((data.badges || []).map((b) => b.id));
  const displayBadges = allBadges.map((badge) => ({
    ...badge,
    earned: earnedBadgeIds.has(badge.id),
    earnedAt: (data.badges || []).find((b) => b.id === badge.id)?.earnedAt,
  }));

  const navigationItems = [
    {
      icon: BarChart3,
      label: t("dashboard"),
      route: "/dashboard",
      active: true,
    },
    { icon: Smartphone, label: t("monitoredApps"), route: "/apps" },
    { icon: Bell, label: t("reminders"), route: "/reminders" },
    { icon: Settings, label: t("settings"), route: "/settings" },
  ];

  const maxUsage = Math.max(...(data.dailyBreakdown || []).map((d) => d.hours));

  const Sidebar = () => (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: 280,
        backgroundColor: "#ffffff",
        borderRightWidth: 1,
        borderRightColor: "#e5e7eb",
        paddingTop: insets.top + 20,
        paddingHorizontal: 20,
        zIndex: 1000,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#1a1a1a",
          }}
        >
          IRL: Digital Detox
        </Text>
        <TouchableOpacity onPress={() => setSidebarOpen(false)}>
          <X size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {navigationItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            router.push(item.route);
            setSidebarOpen(false);
          }}
          style={{
            flexDirection: language === "ar" ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 12,
            marginBottom: 8,
            backgroundColor: item.active ? "#eff6ff" : "transparent",
          }}
        >
          <item.icon size={20} color={item.active ? "#3b82f6" : "#6b7280"} />
          <Text
            style={{
              marginLeft: language === "ar" ? 0 : 12,
              marginRight: language === "ar" ? 12 : 0,
              fontSize: 16,
              fontWeight: item.active ? "600" : "400",
              color: item.active ? "#3b82f6" : "#6b7280",
            }}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

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
        <RefreshCw size={32} color="#3b82f6" />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#6b7280" }}>
          Loading dashboard...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <StatusBar style="dark" />

      {sidebarOpen && <Sidebar />}

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
        <TouchableOpacity onPress={() => setSidebarOpen(true)}>
          <Menu size={24} color="#1a1a1a" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#1a1a1a",
          }}
        >
          {t("dashboard")}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Weekly Overview */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1a1a1a",
              textAlign: language === "ar" ? "right" : "left",
              marginBottom: 20,
            }}
          >
            {t("weeklyOverview")}
          </Text>

          {/* Stats Cards */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#f9fafb",
                padding: 16,
                borderRadius: 12,
                marginRight: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  textAlign: language === "ar" ? "right" : "left",
                  marginBottom: 4,
                }}
              >
                {t("totalWeeklyUsage")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  textAlign: language === "ar" ? "right" : "left",
                }}
              >
                {data.summary.totalHours}h
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#f9fafb",
                padding: 16,
                borderRadius: 12,
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#6b7280",
                  textAlign: language === "ar" ? "right" : "left",
                  marginBottom: 4,
                }}
              >
                {t("dailyAverage")}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1a1a1a",
                  textAlign: language === "ar" ? "right" : "left",
                }}
              >
                {data.summary.dailyAverageHours}h
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 16,
              borderRadius: 12,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#6b7280",
                textAlign: language === "ar" ? "right" : "left",
                marginBottom: 4,
              }}
            >
              {t("peakDay")}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#1a1a1a",
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {data.summary.peakDay} - {data.summary.peakDayHours}h
            </Text>
          </View>

          {/* Simple Bar Chart */}
          <View
            style={{
              backgroundColor: "#f9fafb",
              padding: 20,
              borderRadius: 12,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "#1a1a1a",
                textAlign: language === "ar" ? "right" : "left",
                marginBottom: 20,
              }}
            >
              Daily Usage This Week
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                height: 120,
                marginBottom: 10,
              }}
            >
              {(data.dailyBreakdown || []).map((usage, index) => {
                const dayIndex = index % 7;
                return (
                  <View key={index} style={{ alignItems: "center", flex: 1 }}>
                    <View
                      style={{
                        width: 20,
                        height:
                          maxUsage > 0 ? (usage.hours / maxUsage) * 100 : 0,
                        backgroundColor: "#3b82f6",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6b7280",
                        textAlign: "center",
                      }}
                    >
                      {days[dayIndex]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#9ca3af",
                        textAlign: "center",
                      }}
                    >
                      {usage.hours}h
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1a1a1a",
              textAlign: language === "ar" ? "right" : "left",
              marginBottom: 20,
            }}
          >
            {t("badges")}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {displayBadges.map((badge) => (
              <View
                key={badge.id}
                style={{
                  width: "48%",
                  backgroundColor: badge.earned
                    ? badge.color + "20"
                    : "#f3f4f6",
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 16,
                  borderWidth: badge.earned ? 2 : 1,
                  borderColor: badge.earned ? badge.color : "#e5e7eb",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Award
                    size={20}
                    color={badge.earned ? badge.color : "#9ca3af"}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 14,
                      fontWeight: "600",
                      color: badge.earned ? badge.color : "#9ca3af",
                    }}
                  >
                    {badge.name}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: badge.earned ? "#374151" : "#9ca3af",
                    lineHeight: 16,
                  }}
                >
                  {badge.description}
                </Text>
                {badge.earned && badge.earnedAt && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: badge.color,
                      marginTop: 4,
                      fontWeight: "500",
                    }}
                  >
                    Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
