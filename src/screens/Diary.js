// Diary.js (React Native版)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Diary = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // 'YYYY-MM-DD'形式で日付を管理
  const [diaryList, setDiaryList] = useState([]);
  const [currentDiary, setCurrentDiary] = useState('');

  // データ読み込み（AsyncStorage使用）
  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const stored = await AsyncStorage.getItem('diaries');
        const diaries = stored ? JSON.parse(stored) : [];
        setDiaryList(diaries);
        // 初期日付に対応する日記をセット
        const diary = diaries.find((entry) => entry.date === date);
        setCurrentDiary(diary ? diary.content : '');
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiaries();
  }, []);

  // 日付またはdiaryListが変わったら、currentDiaryを更新
  useEffect(() => {
    const diary = diaryList.find((entry) => entry.date === date);
    setCurrentDiary(diary ? diary.content : '');
  }, [date, diaryList]);

  const saveDiary = async () => {
    if (!currentDiary) {
      Alert.alert('エラー', '内容を入力してください。');
      return;
    }

    const updatedDiaries = diaryList.filter((entry) => entry.date !== date);
    updatedDiaries.push({ date, content: currentDiary });

    try {
      await AsyncStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      setDiaryList(updatedDiaries);
      Alert.alert('完了', '日記が保存されました！');
    } catch (e) {
      console.error(e);
    }
  };

  // 日付表示用
  const displayDate = new Date(date).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>カレンダー形式の日記</Text>
      <View style={styles.innerContainer}>
        {/* カレンダー表示部分: react-native-calendarsを使用 */}
        <Calendar
          onDayPress={(day) => setDate(day.dateString)}
          markedDates={{
            [date]: { selected: true, selectedColor: '#007BFF' },
          }}
        />

        {/* 日記表示・編集部分 */}
        <View style={styles.diaryContainer}>
          <Text style={styles.subTitle}>選択された日付: {displayDate}</Text>
          <TextInput
            value={currentDiary}
            onChangeText={setCurrentDiary}
            multiline
            style={styles.textInput}
            placeholder="この日の日記を書いてください..."
          />
          <View style={styles.buttonContainer}>
            <Button title="保存" onPress={saveDiary} color="#007BFF" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row', 
  },
  diaryContainer: {
    flex: 1,
    marginLeft: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top', // Android向けにテキストを上揃え
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
});

export default Diary;
