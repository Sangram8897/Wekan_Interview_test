import * as Keychain from 'react-native-keychain';

export const saveUserData = async (userData) => {
    try {
        console.log('saveUserData coming here');
        // Serialize user data to JSON before storing
        const serializedData = JSON.stringify(userData);

        // Store the serialized user data securely
        await Keychain.setGenericPassword('userData', serializedData);
        console.log('User data saved successfully');
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const getUserData = async () => {
    try {
        // Retrieve the serialized user data securely
        const credentials = await Keychain.getGenericPassword();
        if (credentials && credentials.password) {
            // Deserialize user data from JSON
            const userData = JSON.parse(credentials.password);
            console.log('User data retrieved successfully:', userData);
            return userData;
        } else {
            console.log('No user data found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

export const clearUserData = async () => {
    try {
        // Clear the stored user data
        await Keychain.resetGenericPassword();
        console.log('User data cleared successfully');
    } catch (error) {
        console.error('Error clearing user data:', error);
    }
};
