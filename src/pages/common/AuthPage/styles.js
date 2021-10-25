import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  falconLogo: {
    //height: '400px',
    animation: 'LogoMove 4s infinite ease-in-out alternate',
    filter: 'drop-shadow(0 0 0.50rem white)'
  },
  falconText: {
    fontWeight: 700,
    fontSize: '100px',
    textTransform: 'none',
    color: 'white',
    fontStyle: 'italic',
    cursor: 'pointer',
    animation: 'textMove 5s infinite ease-in-out alternate',
    '&:hover':{
      textShadow: '0 0 5px blue',
    },
  },
  '@global':{ //need add into global rules
    '@keyframes textMove':{
      "0%": {
        textShadow: '0 0 8px #1eff00',
        fontSize: '101px',
      },
      "50%": {
        textShadow: '0 0 8px #fff200',
        fontSize: '100px'
      },
      "100%": {
        textShadow: '0 0 8px #ff0000',
        fontSize: '101px'
      }
     },
  },
  falconDescriptionText:{

  }
}));
      