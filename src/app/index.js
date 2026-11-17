import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RegistrationScreen() {
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // අලුතින් උපන් වර්ෂය ගන්න state එකක් හැදුවා
  const [birthYear, setBirthYear] = useState('');

  const handleReview = () => {
    if (!userName || !email || !phoneNumber || !password || !confirmPassword || !birthYear) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // වයස ගණනය කිරීම
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);

    // age එකත් අරගෙන ඊළඟ පිටුවට යනවා
    router.push({
      pathname: '/review',
      params: { userName, email, phoneNumber, age }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TextInput style={styles.input} placeholder="Username" value={userName} onChangeText={setUserName} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
      
      {/* උපන් වර්ෂය ලබාගන්නා අලුත් Text Input එක */}
      <TextInput style={styles.input} placeholder="Year of Birth (e.g. 2002)" keyboardType="numeric" value={birthYear} onChangeText={setBirthYear} />
      
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      <Button title="REVIEW DETAILS" onPress={handleReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 8 }
});