import { createMuiTheme } from '@material-ui/core/styles';

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