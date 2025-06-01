import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  LineChart as RechartsLineChart,
  Bar,
  Pie,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { View, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const colors = {
  primary: '#8884d8',
  secondary: '#82ca9d',
  success: '#00C49F',
  error: '#FF8042',
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

const AnalyticsScreen = () => {
  const [chartType, setChartType] = useState<'performance' | 'availability' | 'trend' | 'price'>('performance');

  const generateChartData = () => {
    // Replace with your actual data generation logic
    switch (chartType) {
      case 'performance':
        return [{ name: 'Jan', value: 100 }];
      case 'availability':
        return [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 }];
      case 'trend':
        return [{ name: 'Jan', thisWeek: 100, lastWeek: 90 }];
      case 'price':
        return [{ name: 'Product', population: 100, color: '#00C49F' }];
      default:
        return [];
    }
  };

  const renderChart = () => {
    if (chartType === 'performance') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <RechartsBarChart data={generateChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={colors.primary} />
          </RechartsBarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'availability') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <RechartsPieChart>
            <Pie
              data={generateChartData()}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {generateChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? colors.success : colors.error} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'trend') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <RechartsLineChart data={generateChartData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="thisWeek" stroke={colors.primary} />
            <Line type="monotone" dataKey="lastWeek" stroke={colors.secondary} />
          </RechartsLineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'price') {
      return (
        <BarChart
          data={generateChartData()}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          style={styles.chart}
        />
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderChart()}
    </View>
  );
};

export default AnalyticsScreen;