import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const useStyles = makeStyles({
  card: {
    height: '1500px',
    width: '1000px',
    marginTop: '50px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <NavBar showRightSide={true}/>
      <div className={classes.container}>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              <center> <u> Lottery Explanation </u></center>
            </Typography>
            <br/>
            <Typography className={classes.pos} color="textSecondary">
                    Thank you very much for your interest in our survey tool! <br/>
                    In the following we explain everything you need to know about our survey tool. To structure this explanation, we answer four simple questions: <br/>
                    Why are we doing this? <br/>
                    What are we doing? <br/>
                    How are we doing it? <br/>
                    What do you need to do? <br/> <br/>

                    Purpose (Why are we doing this?) <br/>
                    We believe – even more so in the era of fake new – that research and facts should be our guiding lights. This is only possible if we can fully rely on their integrity. Especially, with modern technology undermining the integrity of research and spreading wrong messages has never been easier before. Therefore, our mission is to help rigorously conducted research to leave no doubt about its integrity.
              <br/><br/>
                    Problem and Solution (What are we doing?) <br/>
                    Surveys have two fundamental problems.
                    Does your answer matter? If you answer a survey, most of the time you probably want to communicate your opinion. However, can you tell for sure whether your answers were actually included into the survey results. Maybe, your opinion did not fit with the goal of the survey and was therefore ignored. Such doubts are extremely difficult to refute and heavily question the integrity of proper survey research.
                    Fair incentives: A lot of surveys try to lure participants by offering incentives. - everything from vouchers to technical gadgets (e.g. iPads are often preferred). But have you sometimes wondered who has won the lottery? Have you even been in the pool of lottery participants, or was there something to win at all?
                    Our solution is to leverage blockchain technology to increase the integrity of survey research and mitigate both problems:
                    We provide a cryptographic proof, that all answers have been added to the survey results. This proof further allows to check whether someone has altered the survey answers after the survey has been completed.
                    We automate the lottery. In doing so, we ensure that there is a price to win (this price has to be committed before the lottery can start, is made public, is locked up until a winner is determined), that everyone who answered the survey participates in the lottery and has the same chance to win the price.
              <br/><br/>
                    Technical approach (how are we doing it?) <br/>
                    We automatically hash all questions and answers of a survey and store them on the Ethereum blockchain. This means we use cryptography to encode all data of the survey into a small size data format and send to a decentralized network of computers. Every computer holds a copy of the hashed survey and all answers and thus nobody can change it later. In that way the author if can assure that no answer got lost or altered. As we the author as to enter the addresses of (real) users who shall be able to answer the survey, we also mitigate the problem that the authors themselves distort the survey results by adding made-up answers.
                    We user a smart contract to automate the lottery. This ensures that everyone how participates in the survey will be added to the pool of possible winners. The incentive has to be locked up (by sending it to the smart contract) survey’s authors before they are able to start the survey. Once the survey is finished, the smart contract automatically determined the winner and sends the reward. As the smart contract is predefined, openly available, verified, everyone can read it and comprehend the exact terms of the lottery before participating in the survey.
                    You can find the link to our smart contract survey here.
              <br/><br/>
                    Procedure (What do you need to do?) <br/>
                    To participate in our survey, you need to follow the following 5 simple steps:- <br/>
                    1.  You need to check whether you have been invited to a survey. Invited participants will receive a token and will find it in their wallet. <br/>
                    2. Go to the survey webpage (the link is the name of the token) and enter your wallet address (only your public address, we would never ask for your private key). In this way me make sure that everyone can only participate once. <br/>
                    3. Fill out the survey <br/>
                    4. Confirm you survey answers by clicking the submit button. Clicking the submit button will initiate a metamask transaction to our smart contract. Of course we will reimburse the gas fees (you can look that up in our smart contract source code: link).After completing this step you are done. If you are lucky and you have won, the lottery our smart contract will automatically send you your reward. In any case the winner of the winner of the lottery will be announced on the survey’s webpage and you can check whether he/she has received the reward as we will publish the transaction (yes, we really do care about transparency!). <br/>
              <br/><br/>
                    If you have any further questions, please feel free to contact us. We are happy to answer all your questions!
              <br/>
              <Link href="/contact">
                <Button variant="outlined" color="primary">
                        Contact Us
                </Button>
              </Link>
                    &nbsp; &nbsp;
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
