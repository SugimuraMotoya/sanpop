import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import Config from 'react-native-config'; // .envから読み込む場合

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = Config.OPENWEATHER_API_KEY; // .envでOPENWEATHER_API_KEY=xxxxx
        if (!apiKey) {
          Alert.alert('エラー', 'APIキーが設定されていません。');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // データの整合性チェック
        if (!data.weather || !data.weather[0] || !data.main) {
          Alert.alert('エラー', '天気情報が不完全です。');
          setLoading(false);
          return;
        }

        setWeather({
          condition: data.weather[0].description,
          temperature: `${data.main.temp}°C`,
        });
      } catch (error) {
        console.error(error);
        Alert.alert('エラー', '天気情報を取得できませんでした');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>天気情報を取得しています...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>こんにちは！今日も元気に歩きましょう！</Text>
      {weather ? (
        <>
          <Text>天気: {weather.condition}</Text>
          <Text>気温: {weather.temperature}</Text>
        </>
      ) : (
        <Text>天気情報がありません。</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
