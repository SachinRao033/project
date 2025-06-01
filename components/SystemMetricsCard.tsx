import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LineChart } from 'react-native-chart-kit';
import { Cpu, Database, HardDrive, Activity } from 'lucide-react-native';

interface SystemMetricsCardProps {
  title: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
  data: number[];
  icon: 'cpu' | 'memory' | 'disc' | 'activity';
}

export default function SystemMetricsCard({ title, value, status, data, icon }: SystemMetricsCardProps) {
  const { colors, isDark } = useTheme();
  
  const getStatusColor = () => {
    switch (status) {
      case 'critical':
        return colors.error;
      case 'warning':
        return colors.warning;
      case 'normal':
      default:
        return colors.success;
    }
  };
  
  const getStatusBackgroundColor = () => {
    switch (status) {
      case 'critical':
        return colors.errorLight;
      case 'warning':
        return colors.warningLight;
      case 'normal':
      default:
        return colors.successLight;
    }
  };
  
  const renderIcon = () => {
    const iconColor = getStatusColor();
    const size = 24;
    
    switch (icon) {
      case 'cpu':
        return <Cpu size={size} color={iconColor} />;
      case 'memory':
        return <Database size={size} color={iconColor} />;
      case 'disc':
        return <HardDrive size={size} color={iconColor} />;
      case 'activity':
      default:
        return <Activity size={size} color={iconColor} />;
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          {renderIcon()}
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusBackgroundColor() }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: [],
            datasets: [
              {
                data: data.length > 0 ? data : [0, 0],
              },
            ],
          }}
          width={140}
          height={60}
          chartConfig={{
            backgroundColor: 'transparent',
            backgroundGradientFrom: 'transparent',
            backgroundGradientTo: 'transparent',
            decimalPlaces: 0,
            color: () => getStatusColor(),
            labelColor: () => 'transparent',
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
            },
          }}
          bezier
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withDots={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    width: '46%',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  value: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginVertical: 8,
  },
  chartContainer: {
    marginTop: 8,
    marginLeft: -16,
  },
  chart: {
    paddingRight: 0,
  },
});