import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors'



const useStyles = makeStyles((theme) => ({
  landingPageButton: {
    width: 400,
    height: 60,
    backgroundColor: theme.primary,
    color: 'white',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 240,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
  instructionSection: {
    height: 400
  },
  instructionSectionHeader: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 50,
  },
  instructionItem: {
    width: 400,
    textAlign: "center"
  },
  instructionHeader: {
    fontSize: 20,
    textAlign: "center"
  },
  instructionIcon: {
    height: 100,
  },
}));


export default function Home() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles(useTheme());

  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Survey</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="#">Smart Contract Survey!</a>
        </h1>
        <p className={styles.description}>
          This survey is about blah blah blah. Although, it will take some time to complete. You can win X.
        </p>

        <div className={styles.grid}>
          <Button variant="contained" color="primary" className={classes.landingPageButton}>
            Start the survey
          </Button>
        </div>

        <h2 className={classes.instructionSectionHeader}>How it works</h2>
        <Grid container item xs={12}>
          <Grid container justify="center" spacing={spacing} className={classes.instructionSection}>
            <Grid key={0} item className={classes.instructionItem}>
              <img src="/return-on-investment.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Enter Your Wallet ID</h3>
              <p>Some description about something on something. Some description about something on something</p>
            </Grid>
            <Grid key={1} item className={classes.instructionItem}>
              <img src="/return-on-investment.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Complete the Survey</h3>
              <p>Some description about something on something. Some description about something on something</p>
            </Grid>
            <Grid key={2} item className={classes.instructionItem}>
              <img src="/return-on-investment.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Win money</h3>
              <p>Some description about something on something. Some description about something on something</p>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}