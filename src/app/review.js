import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Button, StyleSheet, Text, View } from 'react-native'; // Alert එකතු කළා

export default function ReviewScreen() {
  const router = useRouter(); 
  
  // කලින් පිටුවෙන් එවපු age එකත් ලබාගන්නවා
  const { userName, email, phoneNumber, age } = useLocalSearchParams(); 

  const handleConfirm = () => {
    // වයස 18ට අඩු නම් Alert එකක් පෙන්වනවා
    if (parseInt(age) < 18) {
      Alert.alert('Warning', 'You must be 18 or older to proceed.');
      return; 
    }

    // 18ට වැඩි නම් විතරක් Success පිටුවට යනවා
    router.push({
      pathname: '/success',
      params: { userName }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Details</Text>
      
      <View style={styles.card}>
        <Text style={styles.detail}>Username: {userName}</Text>
        <Text style={styles.detail}>Email: {email}</Text>
        <Text style={styles.detail}>Phone: {phoneNumber || 'Not provided'}</Text>
        {/* වයස පෙන්වනවා */}
        <Text style={styles.detail}>Age: {age}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="EDIT INFO" color="red" onPress={() => router.back()} />
        <Button title="CONFIRM & SUBMIT" onPress={handleConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8, marginBottom: 20 },
  detail: { fontSize: 16, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' }
});