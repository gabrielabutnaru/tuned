import { Typography, Colors } from 'react-native-ui-lib';

export const configTheme = () => {
  Colors.loadColors({
    gray: 'gray',
    black: 'black',
    white: 'white',
    violet: '#1a0938',
    cerise: '#ED1BA3',
  });

  Typography.loadTypographies({
    megan: { fontFamily: 'Megan' },
    xxxl: { fontSize: 52 },
    xxl: { fontSize: 46 },
    xl: { fontSize: 32 },
    l: { fontSize: 24 },
    m: { fontSize: 16 },
    s: { fontSize: 14 },
    xs: { fontSize: 12 },
    bold: { fontWeight: 'bold' },
    montserratL: { fontFamily: 'MontserratL' },
    montserratM: { fontFamily: 'MontserratM' },
    h: { lineHeight: 40 },
    center: { textAlign: 'center' },
  });
};
