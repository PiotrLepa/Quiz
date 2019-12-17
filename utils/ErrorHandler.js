import Snackbar from 'react-native-snackbar';
import { NoConnectivityException } from './Exceptions';

class ErrorHandler {
  static showError = error => {
    const message = this.resolveMessage(error);
    Snackbar.show({
      title: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: 'red',
    });
  };

  static resolveMessage = error => {
    if (error instanceof NoConnectivityException) {
      return 'Brak połączenia z internetem';
    }
    return 'Wystapił nieoczekiwany błąd.';
  };
}

export default ErrorHandler;
