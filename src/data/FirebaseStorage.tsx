import { getApps } from "firebase/app";
import firebase from "firebase/compat";

class FirebaseStorage {
  constructor() {
    this.init();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  init = () => {
    if (!getApps().length) {
      const firebaseConfig = {
        apiKey: "AIzaSyB3qcC0n8s4wZimHZ6RlK-_rLYr_Ju-uA8",
        authDomain: "thecriminals-6dd08.firebaseapp.com",
        databaseURL:
          "https://thecriminals-6dd08-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "thecriminals-6dd08",
        storageBucket: "thecriminals-6dd08.appspot.com",
        messagingSenderId: "709088777204",
        appId: "1:709088777204:web:d76532d02b737f9d6d9fa1",
        measurementId: "G-SWK4C4CN42",
      };
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }
  };

  onAuthStateChanged = (user: firebase.User | null) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  parse = (snapshot: any) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    return {
      _id,
      timestamp,
      text,
      user,
    };
  };

  on = (callback: (messages: any) => void) =>
    this.ref
      .limitToLast(50)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  send = (messages: any[]) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = (message: any) => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

const instance = new FirebaseStorage();

export default instance;
