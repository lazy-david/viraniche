import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const getUserRegion = async (userId) => {
  try {
    if (!userId) {
      return 'US'; // Default to US if no user ID
    }
    
    // Try to get user region from Firestore with timeout
    try {
      // Create a promise that rejects after 3 seconds
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore request timed out')), 3000)
      );
      
      // Race between Firestore request and timeout
      const userDocRef = doc(db, 'users', userId);
      const userSnapshot = await Promise.race([
        getDoc(userDocRef),
        timeout
      ]);
      
      if (userSnapshot.exists()) {
        return userSnapshot.data().region || 'US';
      }
    } catch (firestoreError) {
      console.warn('Firestore error (possibly offline):', firestoreError.message);
      // Continue with default region if Firestore fails
    }
    
    return 'US'; // Default to US if user document doesn't exist or can't be accessed
  } catch (error) {
    console.error('Error getting user region:', error);
    return 'US'; // Default to US on error
  }
};