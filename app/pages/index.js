import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import Link from 'next/link'

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
          Welcome to the <a href="#">Survey!</a>
        </h1>
        <p className={styles.description}>
          This survey is about blah blah blah. Although, it will take some time to complete. You can win X.
        </p>

        <div className={styles.grid}>
          <Link href="/survey"><Button variant="contained" color="primary" className={classes.landingPageButton}>
            Start the survey
          </Button></Link>
        </div>

        <h2 className={classes.instructionSectionHeader}>How it works</h2>
        <Grid container item xs={12}>
          <Grid container justify="center" spacing={spacing} className={classes.instructionSection}>
            <Grid key={0} item className={classes.instructionItem}>
              <img src="/user.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Enter Your Wallet ID</h3>
              <p>The first thing you should do before you start the survey is enter your wallet id. This enters you in the raffle to win money rewards!</p>
            </Grid>
            <Grid key={1} item className={classes.instructionItem}>
              <img src="/clipboard.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Complete the Survey</h3>
              <p>Make sure you answer each question before submitting.</p>
            </Grid>
            <Grid key={2} item className={classes.instructionItem}>
              <img src="/money.svg" alt="ROI" className={classes.instructionIcon} />
              <h3 className={classes.instructionHeader}>Win Money</h3>
              <p>We will get back to the winners of the prize after several weeks. Good luck!</p>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}