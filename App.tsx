import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const LEETCODE_USERNAME = 'deepakpancholi535';
const LEETCODE_PROFILE_URL = `https://leetcode.com/${LEETCODE_USERNAME}`;

interface UserStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface SubmissionCalendar {
  [timestamp: string]: number;
}

const App = () => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [calendar, setCalendar] = useState<SubmissionCalendar>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  const fetchLeetCodeData = async () => {
    try {
      // Using LeetCode GraphQL API
      const query = `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
            }
            submissionCalendar
          }
        }
      `;

      const response = await axios.post('https://leetcode.com/graphql', {
        query,
        variables: { username: LEETCODE_USERNAME },
      });

      const data = response.data.data.matchedUser;
      
      // Parse stats
      const acSubmissions = data.submitStats.acSubmissionNum;
      const statsData: UserStats = {
        totalSolved: acSubmissions.find((s: any) => s.difficulty === 'All')?.count || 0,
        easySolved: acSubmissions.find((s: any) => s.difficulty === 'Easy')?.count || 0,
        mediumSolved: acSubmissions.find((s: any) => s.difficulty === 'Medium')?.count || 0,
        hardSolved: acSubmissions.find((s: any) => s.difficulty === 'Hard')?.count || 0,
        acceptanceRate: 0,
        ranking: data.profile.ranking || 0,
      };

      // Parse calendar
      const calendarData = JSON.parse(data.submissionCalendar || '{}');
      
      setStats(statsData);
      setCalendar(calendarData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching LeetCode data:', error);
      setLoading(false);
    }
  };

  const openLeetCodeProfile = () => {
    Linking.openURL(LEETCODE_PROFILE_URL);
  };

  const getHeatmapColor = (count: number): string => {
    if (count === 0) return '#ebedf0';
    if (count < 3) return '#9be9a8';
    if (count < 6) return '#40c463';
    if (count < 9) return '#30a14e';
    return '#216e39';
  };

  const renderHeatmap = () => {
    const today = new Date();
    const days = 365;
    const heatmapData = [];

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const timestamp = Math.floor(date.getTime() / 1000).toString();
      const count = calendar[timestamp] || 0;
      
      heatmapData.push({
        date: date.toLocaleDateString(),
        count,
        color: getHeatmapColor(count),
      });
    }

    const weeks = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      weeks.push(heatmapData.slice(i, i + 7));
    }

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.heatmapContainer}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekColumn}>
              {week.map((day, dayIndex) => (
                <View
                  key={dayIndex}
                  style={[
                    styles.heatmapCell,
                    { backgroundColor: day.color },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFA116" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>LeetCode Progress</Text>
          <TouchableOpacity onPress={openLeetCodeProfile} style={styles.profileButton}>
            <Text style={styles.profileButtonText}>View Profile →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.usernameContainer}>
          <Text style={styles.username}>@{LEETCODE_USERNAME}</Text>
        </View>

        {stats && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalSolved}</Text>
              <Text style={styles.statLabel}>Total Solved</Text>
            </View>
            <View style={[styles.statCard, styles.easyCard]}>
              <Text style={styles.statNumber}>{stats.easySolved}</Text>
              <Text style={styles.statLabel}>Easy</Text>
            </View>
            <View style={[styles.statCard, styles.mediumCard]}>
              <Text style={styles.statNumber}>{stats.mediumSolved}</Text>
              <Text style={styles.statLabel}>Medium</Text>
            </View>
            <View style={[styles.statCard, styles.hardCard]}>
              <Text style={styles.statNumber}>{stats.hardSolved}</Text>
              <Text style={styles.statLabel}>Hard</Text>
            </View>
          </View>
        )}

        <View style={styles.rankingContainer}>
          <Text style={styles.rankingText}>Global Ranking: #{stats?.ranking.toLocaleString()}</Text>
        </View>

        <View style={styles.heatmapSection}>
          <Text style={styles.sectionTitle}>Submission Heatmap</Text>
          <Text style={styles.sectionSubtitle}>Last 365 days</Text>
          {renderHeatmap()}
          <View style={styles.legend}>
            <Text style={styles.legendText}>Less</Text>
            <View style={[styles.legendBox, { backgroundColor: '#ebedf0' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#9be9a8' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#40c463' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#30a14e' }]} />
            <View style={[styles.legendBox, { backgroundColor: '#216e39' }]} />
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#262626',
  },
  profileButton: {
    backgroundColor: '#FFA116',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  usernameContainer: {
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  easyCard: {
    backgroundColor: '#d4f4dd',
  },
  mediumCard: {
    backgroundColor: '#fff4ce',
  },
  hardCard: {
    backgroundColor: '#ffe0e0',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  rankingContainer: {
    backgroundColor: '#FFA116',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  rankingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heatmapSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  heatmapContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  weekColumn: {
    marginRight: 3,
  },
  heatmapCell: {
    width: 12,
    height: 12,
    marginBottom: 3,
    borderRadius: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
  },
  legendBox: {
    width: 12,
    height: 12,
    marginHorizontal: 2,
    borderRadius: 2,
  },
});

export default App;
