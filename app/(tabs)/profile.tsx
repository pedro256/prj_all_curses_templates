import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import { User, Book, Certificate, Settings, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.profileHeader}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <User size={40} color="#CBD5E0" />
            </View>
          )}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>75%</Text>
            <Text style={styles.statLabel}>Progress</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Learning</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Book size={20} color="#3E64FF" />
          </View>
          <Text style={styles.menuText}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Certificate size={20} color="#3E64FF" />
          </View>
          <Text style={styles.menuText}>Certificates</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <User size={20} color="#3E64FF" />
          </View>
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Settings size={20} color="#3E64FF" />
          </View>
          <Text style={styles.menuText}>Preferences</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subscriptionCard}>
        <Text style={styles.subscriptionTitle}>Unlock Premium</Text>
        <Text style={styles.subscriptionText}>
          Get unlimited access to all courses and exclusive content
        </Text>
        <Button 
          title="Upgrade Now" 
          onPress={() => {}} 
          style={styles.upgradeButton}
        />
      </View>

      <View style={styles.logoutContainer}>
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          isLoading={isLoading}
          style={styles.logoutButton}
          textStyle={styles.logoutText}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  subscriptionCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#3E64FF',
    borderRadius: 12,
  },
  subscriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subscriptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#FFFFFF',
  },
  logoutContainer: {
    padding: 16,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderColor: '#FC8181',
  },
  logoutText: {
    color: '#E53E3E',
  },
});