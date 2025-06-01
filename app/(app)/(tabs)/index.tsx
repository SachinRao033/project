import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useData } from '@/contexts/DataContext';
import { Sun, Moon, RefreshCw } from 'lucide-react-native';
import { getGreeting } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext';
import SystemMetricsCard from '@/components/SystemMetricsCard';
import RefreshIntervalPicker from '@/components/RefreshIntervalPicker';
import AlertsCard from '@/components/AlertsCard';
import { getSystemMetrics } from '@/services/metrics';

export default function DashboardScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { scrapedData, isLoading: isDataLoading, fetchData, lastScrapeTime } = useData();
  const [refreshing, setRefreshing] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30); // 30 seconds default
  
  // Load system metrics
  useEffect(() => {
    loadSystemMetrics();
    
    // Set up interval for refreshing metrics
    const intervalId = setInterval(() => {
      loadSystemMetrics();
    }, refreshInterval * 1000);
    
    return () => clearInterval(intervalId);
  }, [refreshInterval]);
  
  const loadSystemMetrics = async () => {
    try {
      const metrics = await getSystemMetrics();
      setSystemMetrics(metrics);
    } catch (error) {
      console.error('Failed to load system metrics:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadSystemMetrics(),
        fetchData()
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleScrapingTrigger = () => {
    fetchData();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              {getGreeting()},
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.displayName || 'User'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.themeToggle, { backgroundColor: colors.backgroundSecondary }]} 
            onPress={toggleTheme}
          >
            {isDark ? (
              <Sun size={20} color={colors.textSecondary} />
            ) : (
              <Moon size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.refreshContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>System Monitoring</Text>
          <RefreshIntervalPicker
            selectedInterval={refreshInterval}
            onSelectInterval={setRefreshInterval}
          />
        </View>
        
        <View style={styles.metricsGrid}>
          {systemMetrics ? (
            <>
              <SystemMetricsCard 
                title="CPU Usage"
                value={`${systemMetrics.cpu.usage}%`}
                status={systemMetrics.cpu.status}
                data={systemMetrics.cpu.history}
                icon="cpu"
              />
              <SystemMetricsCard 
                title="Memory Usage"
                value={`${systemMetrics.memory.usage}%`}
                status={systemMetrics.memory.status}
                data={systemMetrics.memory.history}
                icon="memory"
              />
              <SystemMetricsCard 
                title="Disk Space"
                value={`${systemMetrics.disk.usage}%`}
                status={systemMetrics.disk.status}
                data={systemMetrics.disk.history}
                icon="disc"
              />
              <SystemMetricsCard 
                title="Network"
                value={`${systemMetrics.network.throughput} MB/s`}
                status={systemMetrics.network.status}
                data={systemMetrics.network.history}
                icon="activity"
              />
            </>
          ) : (
            <View style={[styles.loadingContainer, { backgroundColor: colors.backgroundSecondary }]}>
              <RefreshCw size={24} color={colors.textSecondary} />
              <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
                Loading system metrics...
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
          
          <TouchableOpacity 
            style={[
              styles.scrapeButton, 
              { backgroundColor: colors.primary },
              isDataLoading && { opacity: 0.7 }
            ]}
            onPress={handleScrapingTrigger}
            disabled={isDataLoading}
          >
            {isDataLoading ? (
              <Text style={styles.scrapeButtonText}>Scraping...</Text>
            ) : (
              <Text style={styles.scrapeButtonText}>Scrape Now</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View style={styles.dataSection}>
          <View style={[styles.dataCard, { backgroundColor: colors.card }]}>
            <View style={styles.dataHeader}>
              <Text style={[styles.dataTitle, { color: colors.text }]}>
                Latest Data
              </Text>
              <Text style={[styles.dataTime, { color: colors.textSecondary }]}>
                {lastScrapeTime ? `Last updated: ${lastScrapeTime}` : 'No data available'}
              </Text>
            </View>
            
            <View style={styles.dataSummary}>
              <View style={styles.dataItem}>
                <Text style={[styles.dataLabel, { color: colors.textSecondary }]}>
                  Total Items
                </Text>
                <Text style={[styles.dataValue, { color: colors.text }]}>
                  {scrapedData?.length || 0}
                </Text>
              </View>
              
              <View style={styles.dataItem}>
                <Text style={[styles.dataLabel, { color: colors.textSecondary }]}>
                  Categories
                </Text>
                <Text style={[styles.dataValue, { color: colors.text }]}>
                  {scrapedData ? [...new Set(scrapedData.map(item => item.category))].length : 0}
                </Text>
              </View>
              
              <View style={styles.dataItem}>
                <Text style={[styles.dataLabel, { color: colors.textSecondary }]}>
                  Avg. Price
                </Text>
                <Text style={[styles.dataValue, { color: colors.text }]}>
                  {scrapedData && scrapedData.length > 0 
                    ? `$${(scrapedData.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0) / scrapedData.length).toFixed(2)}`
                    : '$0.00'
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <AlertsCard />
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  loadingContainer: {
    flex: 1,
    height: 150,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  scrapeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  scrapeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  dataSection: {
    marginBottom: 16,
  },
  dataCard: {
    borderRadius: 16,
    padding: 16,
  },
  dataHeader: {
    marginBottom: 16,
  },
  dataTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  dataTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  dataSummary: {
    flexDirection: 'row',
  },
  dataItem: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
});