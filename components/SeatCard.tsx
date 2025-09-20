import React from "react";
import { SeatInfo } from "../App";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SeatProps {
  seat: SeatInfo;
  onClick: (seatNumber: number) => void;
}

const SeatCard = ({ seat, onClick }: SeatProps) => {
  let seatStatusColor = "blue";
  if (seat.isBooked) seatStatusColor = "gray";
  else if (seat.isSelected) seatStatusColor = "red";
  return (
    <Pressable
      onPress={() => onClick(seat.seatNumber)}
      style={[styles.container, { backgroundColor: seatStatusColor }]}
    >
      <Text style={styles.title}>{seat.seatNumber}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
  },
  title: {
    fontWeight: "bold",
    color: "white",
  },
});

export default SeatCard;
