import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Search, MapPin, FileSliders as Sliders, Briefcase, Building2, Clock, Globe as Globe2 } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function SearchScreen() {
  const { colors } = useTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead'];
  const workModels = ['Remote', 'Hybrid', 'On-site'];

  const mockJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $180,000',
      posted: '2h ago',
      description: 'Join our dynamic team building next-generation cloud solutions...',
      isVerified: true,
      logo: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '2',
      title: 'Product Designer',
      company: 'DesignStudio',
      location: 'New York, NY',
      type: 'Remote',
      salary: '$90,000 - $130,000',
      posted: '5h ago',
      description: 'Looking for a creative product designer to join our growing team...',
      isVerified: true,
      logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Find Your Dream Job</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Discover opportunities that match your interests
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <View style={styles.searchInputs}>
          <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Job title, keywords, or company"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary }]}>
            <MapPin size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Location"
              placeholderTextColor={colors.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Sliders size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {showFilters && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.filtersPanel, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.filterTitle, { color: colors.text }]}>Filters</Text>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: colors.textSecondary }]}>
              Employment Type
            </Text>
            <View style={styles.filterOptions}>
              {jobTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    { backgroundColor: colors.backgroundSecondary },
                  ]}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: colors.textSecondary }]}>
              Experience Level
            </Text>
            <View style={styles.filterOptions}>
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.filterOption,
                    { backgroundColor: colors.backgroundSecondary },
                  ]}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, { color: colors.textSecondary }]}>
              Work Model
            </Text>
            <View style={styles.filterOptions}>
              {workModels.map((model) => (
                <TouchableOpacity
                  key={model}
                  style={[
                    styles.filterOption,
                    { backgroundColor: colors.backgroundSecondary },
                  ]}
                >
                  <Text style={[styles.filterOptionText, { color: colors.text }]}>{model}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>
      )}

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {mockJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={[styles.jobCard, { backgroundColor: colors.card }]}
          >
            <View style={styles.jobHeader}>
              <View style={styles.companyInfo}>
                <View style={[styles.logoContainer, { backgroundColor: colors.backgroundSecondary }]}>
                  <Building2 size={24} color={colors.primary} />
                </View>
                <View style={styles.companyDetails}>
                  <Text style={[styles.jobTitle, { color: colors.text }]}>{job.title}</Text>
                  <Text style={[styles.companyName, { color: colors.textSecondary }]}>
                    {job.company}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookmarkButton}>
                <BookmarkCheck size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.jobDetails}>
              <View style={styles.detailItem}>
                <MapPin size={16} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {job.location}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Briefcase size={16} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.type}</Text>
              </View>

              <View style={styles.detailItem}>
                <Clock size={16} color={colors.textSecondary} />
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>{job.posted}</Text>
              </View>
            </View>

            <Text style={[styles.salary, { color: colors.primary }]}>{job.salary}</Text>

            <Text
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={3}
            >
              {job.description}
            </Text>

            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputs: {
    flex: 1,
    marginRight: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersPanel: {
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  filterOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  jobCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyDetails: {
    marginLeft: 12,
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  bookmarkButton: {
    padding: 8,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginLeft: 4,
  },
  salary: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  applyButton: {
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});