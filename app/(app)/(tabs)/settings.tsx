import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, BellRing, Shield, Database, Clock, RefreshCw, Globe, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [errorAlerts, setErrorAlerts] = useState(true);
  const [dataRetention, setDataRetention] = useState(30);
  const [autoScrape, setAutoScrape] = useState(false);
  
  const intervals = [15, 30, 60, 300];
  const retentionPeriods = [7, 14, 30, 90];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Configure your application
        </Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              {isDark ? (
                <Moon size={24} color={colors.primary} />
              ) : (
                <Sun size={24} color={colors.primary} />
              )}
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Switch between light and dark themes
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={isDark ? colors.primary : colors.textSecondary}
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>System Monitoring</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <RefreshCw size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Refresh Interval</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  How frequently to refresh metrics
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.intervalOptions}>
            {intervals.map((interval) => (
              <TouchableOpacity
                key={interval}
                style={[
                  styles.intervalOption,
                  refreshInterval === interval && { backgroundColor: colors.primaryLight },
                ]}
                onPress={() => setRefreshInterval(interval)}
              >
                <Text
                  style={[
                    styles.intervalText,
                    { color: refreshInterval === interval ? colors.primary : colors.textSecondary },
                    refreshInterval === interval && { fontFamily: 'Inter-SemiBold' },
                  ]}
                >
                  {interval < 60 ? `${interval}s` : `${interval / 60}m`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <AlertTriangle size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Error Alerts</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Get notified of system issues
                </Text>
              </View>
            </View>
            <Switch
              value={errorAlerts}
              onValueChange={setErrorAlerts}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={errorAlerts ? colors.primary : colors.textSecondary}
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Clock size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Data Retention</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  How long to keep scraped data
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.intervalOptions}>
            {retentionPeriods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.intervalOption,
                  dataRetention === period && { backgroundColor: colors.primaryLight },
                ]}
                onPress={() => setDataRetention(period)}
              >
                <Text
                  style={[
                    styles.intervalText,
                    { color: dataRetention === period ? colors.primary : colors.textSecondary },
                    dataRetention === period && { fontFamily: 'Inter-SemiBold' },
                  ]}
                >
                  {period} days
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Database size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Auto Scraping</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Automatically scrape on a schedule
                </Text>
              </View>
            </View>
            <Switch
              value={autoScrape}
              onValueChange={setAutoScrape}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={autoScrape ? colors.primary : colors.textSecondary}
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <BellRing size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Push Notifications</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  Receive alerts and updates
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primaryLight }}
              thumbColor={notifications ? colors.primary : colors.textSecondary}
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Globe size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Version</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  1.0.0 (Build 2025.01)
                </Text>
              </View>
            </View>
          </View>
          
          <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Shield size={24} color={colors.primary} />
              <View style={styles.settingTexts}>
                <Text style={[styles.settingName, { color: colors.text }]}>Privacy Policy</Text>
                <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                  How we handle your data
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: 16,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTexts: {
    marginLeft: 16,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  settingDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  intervalOptions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  intervalOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  intervalText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});