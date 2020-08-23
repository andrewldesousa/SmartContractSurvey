import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
  landingPageButton: {
    width: 400,
    height: 60,
    backgroundColor: theme.primary,
    color: 'white',
  },
}));


export default function Home() {
  const classes = useStyles(useTheme());
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Smart Contract Survey!</a>
        </h1>
        <p className={styles.description}>
          This survey is about blah blah blah. Although, it will take some time to complete. You can win X.
        </p>

        <div className={styles.grid}>
          <Button variant="contained" color="primary" className={classes.landingPageButton}>
            Start the survey
          </Button>
        </div>
      </main>
    </div>
  )
}