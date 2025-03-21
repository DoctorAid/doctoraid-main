import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Search size={20} color="#2C3E50" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Look who's available"
        placeholderTextColor="#2C3E50"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D4EAF7",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#2C3E50",
    fontSize: 14,
  },
});

export default SearchBar;
