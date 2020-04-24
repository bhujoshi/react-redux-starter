import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) =>
  createStyles({
    mainRoot: {
      // ...theme.mixins.gutters(),
      background: '#F4F8F9',
    },
  });

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1d7dea',
    },
    secondary: {
      main: '#1d7dea',
    },
  },

  typography: {
    fontFamily: "'Rubik','sans-serif'",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

interface MainLayoutProps extends WithStyles<typeof styles> {
  children: any;
}

const MainLayout = ({ classes, children }: MainLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      {/* <Header /> */}
      <main className={classes.mainRoot}>{children}</main>
      {/* <Footer /> */}
    </ThemeProvider>
  );
};

export default withStyles(styles)(MainLayout);
