import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Settings, ChevronRight, Bell, Mail, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { user, signOut } = useAuth();
  
  const menuItems = [
    {
      icon: <Bell size={24} color={colors.primary} />,
      title: 'Notifications',
      subtitle: 'Configure notification settings',
      action: () => {},
    },
    {
      icon: <Mail size={24} color={colors.primary} />,
      title: 'Email Preferences',
      subtitle: 'Manage email subscriptions',
      action: () => {},
    },
    {
      icon: <Shield size={24} color={colors.primary} />,
      title: 'Security',
      subtitle: 'Password and authentication',
      action: () => {},
    },
    {
      icon: <HelpCircle size={24} color={colors.primary} />,
      title: 'Help & Support',
      subtitle: 'Get assistance and report issues',
      action: () => {},
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.profileImage}
          />
          
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.displayName || 'User Name'}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user?.email || 'user@example.com'}
            </Text>
          </View>
          
          <TouchableOpacity style={[styles.editButton, { borderColor: colors.border }]}>
            <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>28</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Scrapes</Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>142</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Items</Text>
          </View>
          
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>7</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Days</Text>
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        
        <View style={[styles.menuCard, { backgroundColor: colors.card }]}>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={item.action}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <View style={styles.menuItemTexts}>
                    <Text style={[styles.menuItemTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.menuItemSubtitle, { color: colors.textSecondary }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              
              {index < menuItems.length - 1 && (
                <View style={[styles.menuDivider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>
        
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.errorLight }]} 
          onPress={signOut}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statsCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  statDivider: {
    width: 1,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  menuCard: {
    borderRadius: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTexts: {
    marginLeft: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  menuDivider: {
    height: 1,
    marginHorizontal: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});