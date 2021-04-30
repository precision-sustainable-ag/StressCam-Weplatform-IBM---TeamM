import { createMuiTheme } from '@material-ui/core/styles';

// them file used to make bulk styling changes
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