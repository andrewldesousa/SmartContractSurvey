import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ButtonAppBar from '../components/homeHeader';
import Binary from '../components/questions/create/binary';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8rem',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    width: '20rem',
    height: '20rem',
    margin: '4rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paperBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


export default function Start() {
  const classes = useStyles(useTheme());
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(key) {
    console.log(key);
    console.log('This is a test');
  };

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <main className={classes.container}>
        <div>
          <Binary questionKey={0} handleChange={handleChange}></Binary>
        </div>

        <Button onClick={handleOpen}>Add a new question</Button>

        <Button>Create Survey</Button>
        <Modal
          open={open}
          // onClose={handleClose}
        >
          This is a test
        </Modal>
      </main>
    </>
  );
}
