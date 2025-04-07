import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

const contacts = [
  { name: 'Alice', number: '1234567890', group: 'Family' },
  { name: 'Bob', number: '2345678901', group: 'Friends' },
  { name: 'Charlie', number: '3456789012', group: 'Work' },
  { name: 'David', number: '4567890123', group: 'Family' },
  { name: 'Eve', number: '5678901234', group: 'Friends' },
  { name: 'Frank', number: '6789012345', group: 'Work' },
  { name: 'Grace', number: '7890123456', group: 'Family' },
  { name: 'Hannah', number: '8901234567', group: 'Friends' },
  { name: 'Ivy', number: '9012345678', group: 'Work' },
  { name: 'Jack', number: '0123456789', group: 'Friends' },
];

const App = () => {
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredContacts = contacts.filter(
    c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.number.includes(search)
  );

  const grouped = ['Family', 'Friends', 'Work'].map(group => ({
    title: group,
    data: filteredContacts.filter(contact => contact.group === group),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name or number"
        value={search}
        onChangeText={setSearch}
      />

      <SectionList
        sections={grouped}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedContact(item);
              setModalVisible(true);
            }}
            style={styles.item}
          >
            <Text>{item.name} - {item.number}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      {/* Contact Details Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedContact && (
              <>
                <Text style={styles.modalText}>Name: {selectedContact.name}</Text>
                <Text style={styles.modalText}>Number: {selectedContact.number}</Text>
                <Text style={styles.modalText}>Group: {selectedContact.group}</Text>
              </>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    width: '80%',
  },
  modalText: { fontSize: 18, marginVertical: 5 },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: { color: '#fff', textAlign: 'center' },
});

export default App;