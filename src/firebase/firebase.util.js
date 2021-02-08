import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAUnlRFr303UlcGh7jMxZF-kZHZ9m7_RAU",
    authDomain: "react-deeper.firebaseapp.com",
    databaseURL: "https://react-deeper.firebaseio.com",
    projectId: "react-deeper",
    storageBucket: "react-deeper.appspot.com",
    messagingSenderId: "255810716013",
    appId: "1:255810716013:web:c4c575f98324c90c2cda64",
    measurementId: "G-RJ21G603F3"
};

firebase.initializeApp(config)
export const auth = firebase.auth()
export const firestore = firebase.firestore()
export default firebase

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }
        catch (error) {
            console.log(`Error Creating User`, error.message)    
        }
    }
    return userRef
}
