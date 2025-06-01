import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { RefreshCw, ChevronDown } from 'lucide-react-native';

interface RefreshIntervalPickerProps {
  selectedInterval: number;
  onSelectInterval: (interval: number) => void;
}

export default function RefreshIntervalPicker({ 
  selectedInterval, 
  onSelectInterval 
}: RefreshIntervalPickerProps) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const intervals = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' },
  ];
  
  const selectedIntervalLabel = intervals.find(interval => interval.value === selectedInterval)?.label || '30 seconds';
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.backgroundSecondary },
        ]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <RefreshCw size={16} color={colors.textSecondary} />
        <Text style={[styles.buttonText, { color: colors.text }]}>
          {selectedIntervalLabel}
        </Text>
        <ChevronDown size={16} color={colors.textSecondary} />
      </TouchableOpacity>
      
      {isOpen && (
        <View style={[styles.dropdown, { backgroundColor: colors.card }]}>
          {intervals.map((interval) => (
            <TouchableOpacity
              key={interval.value}
              style={[
                styles.dropdownItem,
                selectedInterval === interval.value && { backgroundColor: colors.primaryLight },
              ]}
              onPress={() => {
                onSelectInterval(interval.value);
                setIsOpen(false);
              }}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  { color: selectedInterval === interval.value ? colors.primary : colors.text },
                ]}
              >
                {interval.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    width: 150,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});