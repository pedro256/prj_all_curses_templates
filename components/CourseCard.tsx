import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Course } from '@/types';
import { Lock, BookOpen } from 'lucide-react-native';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const { title, description, imageUrl, locked, duration, level, instructor } = course;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        {locked && (
          <View style={styles.lockedOverlay}>
            <Lock size={24} color="#FFFFFF" />
            <Text style={styles.lockedText}>Premium</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {locked ? (
            <View style={styles.lockedBadge}>
              <Lock size={14} color="#FFFFFF" />
              <Text style={styles.lockedBadgeText}>Premium</Text>
            </View>
          ) : (
            <View style={styles.unlockedBadge}>
              <BookOpen size={14} color="#FFFFFF" />
              <Text style={styles.unlockedBadgeText}>Free</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.meta}>{duration}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.meta}>{level}</Text>
        </View>
        
        <View style={styles.instructorContainer}>
          <Text style={styles.instructorText}>By {instructor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    height: 160,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginTop: 8,
  },
  contentContainer: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1A202C',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  meta: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#718096',
  },
  metaDot: {
    marginHorizontal: 6,
    color: '#718096',
  },
  instructorContainer: {
    marginTop: 4,
  },
  instructorText: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#3E64FF',
  },
  lockedBadge: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  lockedBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  unlockedBadge: {
    backgroundColor: '#38B2AC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  unlockedBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
});