import { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

export const AddDemand = () => {
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("kg");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    await apiFetch("/api/demands", token, {
      method: "POST",
      body: JSON.stringify({
        category,
        description,
        qty: Number(qty),
        unit,
        budgetMin: Number(budgetMin),
        budgetMax: Number(budgetMax),
        location
      })
    });
    setCategory("");
    setDescription("");
    setQty("");
    setUnit("kg");
    setBudgetMin("");
    setBudgetMax("");
    setLocation("");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Add Demand</Text>
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Quantity"
        value={qty}
        onChangeText={setQty}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Unit"
        value={unit}
        onChangeText={setUnit}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Budget Min"
        value={budgetMin}
        onChangeText={setBudgetMin}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Budget Max"
        value={budgetMax}
        onChangeText={setBudgetMax}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Save Demand" onPress={handleSubmit} />
    </ScrollView>
  );
};
