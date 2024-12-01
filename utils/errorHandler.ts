import { Alert } from 'react-native';

export const handleError = (error: any) => {
  console.error('Error:', error);

  const defaultMessage = 'An unexpected error occurred. Please try again later.';
  let message = defaultMessage;

  if (error?.message) {
    message = error.message; // Use server-provided message if available
  } else if (error?.status) {
    switch (error.status) {
      case 400:
        message = 'Bad Request. Please check your input.';
        break;
      case 401:
        message = 'Unauthorized. Please log in again.';
        break;
      case 404:
        message = 'Resource not found.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      default:
        message = defaultMessage;
    }
  }

  Alert.alert('Error', message);
};
