import { useState } from "react";
import { View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";
import { apiFetch } from "../services/api";

const uploadImageAsync = async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const filename = `products/${Date.now()}.jpg`;
  const storageRef = ref(storage, filename);
  await uploadBytes(storageRef, blob);
  return getDownloadURL(storageRef);
};

export const AddProduct = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("kg");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const url = await uploadImageAsync(uri);
      setImages((prev) => [...prev, url]);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    const token = await user.getIdToken();
    await apiFetch("/api/products", token, {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        description,
        qty: Number(qty),
        unit,
        priceMin: Number(priceMin),
        priceMax: Number(priceMax),
        location,
        images
      })
    });
    setTitle("");
    setCategory("");
    setDescription("");
    setQty("");
    setUnit("kg");
    setPriceMin("");
    setPriceMax("");
    setLocation("");
    setImages([]);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>Add Product</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
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
        placeholder="Price Min"
        value={priceMin}
        onChangeText={setPriceMin}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Price Max"
        value={priceMax}
        onChangeText={setPriceMax}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button title="Add Image" onPress={pickImage} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: 8 }}>
        {images.map((url) => (
          <Image
            key={url}
            source={{ uri: url }}
            style={{ width: 64, height: 64, marginRight: 8, marginBottom: 8 }}
          />
        ))}
      </View>
      <Button title="Save Product" onPress={handleSubmit} />
    </ScrollView>
  );
};
