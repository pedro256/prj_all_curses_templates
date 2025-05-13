import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { ArrowLeft, Lock, BookOpen, Clock, User, Info } from 'lucide-react-native';
import Button from '@/components/Button';
import { allCourses } from '@/data/courses';
import { Course } from '@/types';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPdfVisible, setIsPdfVisible] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch course from API
    const foundCourse = allCourses.find(c => c.id === id);
    setCourse(foundCourse || null);
    setLoading(false);
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleOpenPdf = () => {
    if (course && !course.locked) {
      setIsPdfVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3E64FF" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Course not found</Text>
        <Button title="Go Back" onPress={handleGoBack} style={styles.backButton} />
      </View>
    );
  }

  // PDF viewing content
  if (isPdfVisible && course.pdfUrl) {
    return (
      <View style={styles.pdfContainer}>
        <View style={styles.pdfHeader}>
          <TouchableOpacity onPress={() => setIsPdfVisible(false)} style={styles.backIconButton}>
            <ArrowLeft size={24} color="#2D3748" />
          </TouchableOpacity>
          <Text style={styles.pdfTitle} numberOfLines={1}>
            {course.title}
          </Text>
        </View>
        <WebView 
          source={{ uri: course.pdfUrl }}
          style={styles.webView}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webViewLoading}>
              <ActivityIndicator size="large" color="#3E64FF" />
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: course.imageUrl }}
            style={styles.coverImage}
          />
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {course.locked && (
            <View style={styles.lockedOverlay}>
              <Lock size={32} color="#FFFFFF" />
              <Text style={styles.lockedText}>Premium Content</Text>
            </View>
          )}
        </View>

        {/* Course Info */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{course.title}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={16} color="#718096" />
              <Text style={styles.metaText}>{course.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <BookOpen size={16} color="#718096" />
              <Text style={styles.metaText}>{course.lessons} lessons</Text>
            </View>
            <View style={styles.metaItem}>
              <Info size={16} color="#718096" />
              <Text style={styles.metaText}>{course.level}</Text>
            </View>
          </View>
          
          <View style={styles.instructorRow}>
            <User size={16} color="#3E64FF" />
            <Text style={styles.instructorText}>Instructor: {course.instructor}</Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>About This Course</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>
          
          {course.locked ? (
            <View style={styles.premiumContainer}>
              <View style={styles.premiumBadge}>
                <Lock size={16} color="#FFFFFF" />
                <Text style={styles.premiumBadgeText}>Premium Content</Text>
              </View>
              <Text style={styles.premiumText}>
                This course is only available for premium members. Upgrade your account to access this content.
              </Text>
              <Button 
                title="Upgrade to Premium" 
                onPress={() => {}} 
                style={styles.upgradeButton}
              />
            </View>
          ) : (
            <Button 
              title="Open Course Material" 
              onPress={handleOpenPdf} 
              style={styles.startButton}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
    marginBottom: 16,
  },
  imageContainer: {
    height: 240,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 12,
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1A202C',
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 6,
    color: '#718096',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  instructorText: {
    marginLeft: 8,
    color: '#3E64FF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    lineHeight: 24,
  },
  premiumContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  premiumBadge: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  premiumBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
  },
  premiumText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#4A5568',
    marginBottom: 16,
    lineHeight: 22,
  },
  upgradeButton: {
    backgroundColor: '#FF6B6B',
  },
  startButton: {
    marginTop: 8,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  pdfHeader: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  backIconButton: {
    padding: 8,
  },
  pdfTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2D3748',
    marginLeft: 12,
    flex: 1,
  },
  webView: {
    flex: 1,
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});