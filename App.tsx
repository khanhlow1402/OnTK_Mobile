import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import SeatCard from "./components/SeatCard";

export interface SeatInfo {
  seatNumber: number;
  isSelected: boolean;
  isBooked: boolean;
}

const initSeat: SeatInfo[] = Array.from({ length: 40 }, (_, i) => ({
  seatNumber: i + 1,
  isSelected: false,
  isBooked: i >= 30 ? true : false,
}));

export default function App() {
  const [seats, setSeats] = useState<SeatInfo[]>(initSeat);

  const handleSelect = (seatNumber: number) => {
    const seat = seats.find((item) => item.seatNumber === seatNumber);
    if (!seat) return;

    if (seat.isBooked) {
      Alert.alert("Thong bao", "Ghe nay da co nguoi dat");
      return;
    }

    const updatedSeats = seats.map((s) => {
      if (s.seatNumber === seatNumber) {
        return { ...s, isSelected: !s.isSelected };
      }
      return s;
    });
    setSeats(updatedSeats);
  };

  const onSubmit = () => {
    const updatedSeats = seats.map((s) => {
      if (s.isSelected) {
        s.isSelected = false;
        s.isBooked = true;
      }
      return s;
    });
    setSeats(updatedSeats);
    Alert.alert("Thong bao", "Dat ghe thanh cong");
  };

  return (
    <View style={styles.container}>
      <Button title="Dat ghe" onPress={onSubmit}></Button>
      <FlatList
        data={seats}
        numColumns={4}
        keyExtractor={(item) => item.seatNumber.toString()}
        renderItem={({ item }) => (
          <SeatCard onClick={handleSelect} seat={item}></SeatCard>
        )}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
});
