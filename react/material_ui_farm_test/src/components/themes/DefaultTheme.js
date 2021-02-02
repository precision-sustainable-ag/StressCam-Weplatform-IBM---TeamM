import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function themeBuilder() {

    const DefaultTheme = createMuiTheme({
        palette: {
            info: {
                main: "#212121",
            },
        },
    });

    return DefaultTheme;
}