import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Routes from './routes/routes';

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'navitem' },
          style: {
            color: 'white',
            textTransform: 'none',
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: `'Playfair Display', serif`,
        }
      }
    }
  },
});

function App() {

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  container: {
    // backgroundColor:'black', 
    // color: 'white', 
    // opacity: '90%'
  },
});