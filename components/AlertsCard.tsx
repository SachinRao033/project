import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { TriangleAlert as AlertTriangle, Bell, CircleCheck as CheckCircle, X } from 'lucide-react-native';

export default function AlertsCard() {
  const { colors } = useTheme();
  
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage exceeded 80% threshold for 5 minutes',
      time: '10 minutes ago',
    },
    {
      id: 2,
      type: 'error',
      title: 'Scraper Error',
      message: 'Failed to scrape data from target website',
      time: '2 hours ago',
    },
    {
      id: 3,
      type: 'success',
      title: 'Scraping Complete',
      message: 'Successfully scraped 42 new items',
      time: '3 hours ago',
    },
    {
      id: 4,
      type: 'warning',
      title: 'Memory Usage',
      message: 'Memory usage approaching warning threshold',
      time: '5 hours ago',
    },
  ];
  
  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return <AlertTriangle size={20} color={colors.error} />;
      case 'warning':
        return <Bell size={20} color={colors.warning} />;
      case 'success':
        return <CheckCircle size={20} color={colors.success} />;
      default:
        return <Bell size={20} color={colors.primary} />;
    }
  };
  
  const getAlertBackground = (type) => {
    switch (type) {
      case 'error':
        return colors.errorLight;
      case 'warning':
        return colors.warningLight;
      case 'success':
        return colors.successLight;
      default:
        return colors.primaryLight;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Recent Alerts</Text>
        <TouchableOpacity>
          <Text style={[styles.viewAll, { color: colors.primary }]}>View all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={[styles.alertsCard, { backgroundColor: colors.card }]}>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <View key={alert.id} style={styles.alertContainer}>
              <View 
                style={[
                  styles.alertIconContainer, 
                  { backgroundColor: getAlertBackground(alert.type) }
                ]}
              >
                {getAlertIcon(alert.type)}
              </View>
              
              <View style={styles.alertContent}>
                <View style={styles.alertHeader}>
                  <Text style={[styles.alertTitle, { color: colors.text }]}>
                    {alert.title}
                  </Text>
                  <Text style={[styles.alertTime, { color: colors.textSecondary }]}>
                    {alert.time}
                  </Text>
                </View>
                <Text style={[styles.alertMessage, { color: colors.textSecondary }]}>
                  {alert.message}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.dismissButton}>
                <X size={16} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {index < alerts.length - 1 && (
                <View 
                  style={[
                    styles.divider, 
                    { backgroundColor: colors.border }
                  ]} 
                />
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No alerts to display
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  viewAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  alertsCard: {
    borderRadius: 16,
  },
  alertContainer: {
    padding: 16,
  },
  alertIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    top: 16,
  },
  alertContent: {
    marginLeft: 56,
    marginRight: 24,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  alertTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  alertMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  dismissButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    marginTop: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});