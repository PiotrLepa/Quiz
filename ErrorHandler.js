import Snackbar from 'react-native-snackbar';
import { Colors } from 'react-native/Libraries/NewAppScreen';

class ErrorHandler {

    static showError = (error) => {
        const message = this.resolveMessage(error);
        Snackbar.show({
            title: message,
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: 'red'
        });
    };

    static resolveMessage = (error) => {
        return "Wystapił nieoczekiwany błąd."
    };
};

export default ErrorHandler;