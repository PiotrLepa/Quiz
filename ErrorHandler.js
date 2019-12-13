import Snackbar from 'react-native-snackbar';

class ErrorHandler {

    static showError = (error) => {
        const message = this.resolveMessage(error);
        Snackbar.show({
            title: message,
            duration: Snackbar.LENGTH_LONG,
        });
    };

    static resolveMessage = (error) => {
        return "Wystapił nieoczekiwany błąd."
    };
};

export default ErrorHandler;