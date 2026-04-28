import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NOTES, Note } from '../data/notes';
import { COLORS } from '../constants/colors';
import Accordion from '../components/Accordion';

export default function HomeScreen() {
  const renderItem = useCallback(
    ({ item }: { item: Note }) => (
      <Accordion title={item.title} content={item.content} />
    ),
    [],
  );
  const keyExtractor = useCallback((item: Note) => item.id, []);
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <FlatList
          data={NOTES}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingVertical: 8,
  },
  item: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
