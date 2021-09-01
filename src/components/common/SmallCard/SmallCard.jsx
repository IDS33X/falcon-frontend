import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

// This is a general component that will render the cards shown in different lists. 
const SmallCard = ({ bottomActions, onEditClick, title, description, manager }) => {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>

      <CardContent>
        <Tooltip title="Editar" placement="right-start">
          <IconButton onClick={onEditClick} aria-label="editar" size="small" >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography gutterBottom variant="h5" component="h2" className={classes.title}> 
          {title && title}
        </Typography>
        <Typography variant="body2" justify color="textSecondary" component="p">
          {description && description}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardBottom}>
        {
          bottomActions &&
          bottomActions.map((button) =>
            <Tooltip title={button.title} placement="bottom">
              <IconButton onClick={() => button.onClick()} aria-label={button.title} size="small" >
                <button.Icon className={classes.bottomBtn} fontSize="small" />
              </IconButton>
            </Tooltip>

          )
        }

      </CardActions>

    </Card>

  );
}

export default SmallCard;