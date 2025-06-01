import React, { useState } from 'react';
import { BarChart, PieChart, LineChart } from 'react-native-chart-kit';
import { View, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

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
    switch (chartType) {
      case 'performance':
        return {
          labels: ['Jan'],
          datasets: [{ data: [100] }],
        };
      case 'availability':
        return [
          { name: 'Group A', population: 400, color: '#00C49F', legendFontColor: '#7F7F7F', legendFontSize: 15 },
          { name: 'Group B', population: 300, color: '#FF8042', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        ];
      case 'trend':
        return {
          labels: ['Jan'],
          datasets: [
            { data: [100], color: () => '#8884d8', legend: 'This Week' },
            { data: [90], color: () => '#82ca9d', legend: 'Last Week' },
          ],
        };
      case 'price':
        return {
          labels: ['Product'],
          datasets: [{ data: [100] }],
        };
      default:
        return {};
    }
  };

  const renderChart = () => {
    if (chartType === 'performance' || chartType === 'price') {
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
    } else if (chartType === 'availability') {
      return (
        <PieChart
          data={generateChartData()}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          style={styles.chart}
        />
      );
    } else if (chartType === 'trend') {
      return (
        <LineChart
          data={generateChartData()}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
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
