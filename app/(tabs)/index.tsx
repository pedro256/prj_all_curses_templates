import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Book, Clock, Award } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import CourseCard from '@/components/CourseCard';
import { featuredCourses } from '@/data/courses';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  
  const welcomeMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleCoursePress = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>{welcomeMessage()},</Text>
          <Text style={styles.nameText}>{user?.name || 'User'}</Text>
        </View>
        {user?.avatar && (
          <Image 
            source={{ uri: user.avatar }} 
            style={styles.avatar}
          />
        )}
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Book size={20} color="#3E64FF" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={20} color="#5A31F4" />
          <Text style={styles.statValue}>24h</Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={20} color="#38B2AC" />
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
      </View>
      
      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <TouchableOpacity onPress={() => router.push('/courses')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {featuredCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onPress={() => handleCoursePress(course.id)} 
          />
        ))}
      </View>

      <View style={styles.bannerContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Unlock Premium Content</Text>
          <Text style={styles.bannerText}>Get access to all courses and exclusive resources</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#718096',
  },
  nameText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#2D3748',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    marginTop: 4,
  },
  featuredSection: {
    padding: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3E64FF',
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#3E64FF',
  },
  bannerImage: {
    width: '100%',
    height: 120,
    opacity: 0.7,
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    padding: 16,
  },
  bannerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    marginBottom: 16,
    opacity: 0.9,
  },
  bannerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3E64FF',
  },
});