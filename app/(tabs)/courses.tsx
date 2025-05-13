import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import CourseCard from '@/components/CourseCard';
import { allCourses } from '@/data/courses';
import InputField from '@/components/InputField';

export default function CoursesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Free', 'Premium', 'Beginner', 'Intermediate', 'Advanced'];

  const handleCoursePress = (courseId: string) => {
    router.push(`/course/${courseId}`);
  };

  const filteredCourses = allCourses.filter(course => {
    // Filter by search query
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesFilter = 
      activeFilter === 'All' ||
      (activeFilter === 'Free' && !course.locked) ||
      (activeFilter === 'Premium' && course.locked) ||
      activeFilter === course.level;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#718096" style={styles.searchIcon} />
          <InputField
            label=""
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search courses..."
            style={styles.searchInput}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item ? styles.activeFilter : null
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === item ? styles.activeFilterText : null
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filtersList}
        />
      </View>

      <FlatList
        data={filteredCourses}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            onPress={() => handleCoursePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.coursesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No courses found matching your criteria</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    marginBottom: 0,
  },
  filtersContainer: {
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filtersList: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4A5568',
  },
  activeFilter: {
    backgroundColor: '#3E64FF',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  coursesList: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#718096',
    textAlign: 'center',
  },
});