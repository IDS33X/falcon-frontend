import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { ButtonBase, CardActionArea, Button} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'

// This is a general component that will render the cards shown in different lists. 
const SmallCard = ({ bottomActions, editButton, title, description, onClickCard, bottomTitle, name, bottomCounter }) => {
  const classes = useStyles();

  /* <CardActionArea classsName = {classes.cardAction} component={RouterLink} to="/questions"> */
  return (
    <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={(e) => {
          e.stopPropagation();
          onClickCard();
        }}
      >
      <Card name={name} className={classes.card} raised elevation = {6}>
              <div>
              <div className={classes.topActions}>
                  <Tooltip title={editButton.title} placement="right-start">
                      <IconButton
                        onClick={(e) => {
                        e.stopPropagation(); // This avoid to open the father component when clicking the button, this is how we say to the dom to stop the event propagation for calling parent events.
                          editButton.onClick();
                        }}
                        style={{ color: editButton.color }}
                        size="small"
                      >
                        <editButton.Icon className = {classes.editButton} fontSize="default" />
                      </IconButton>

                      {/* <IconButton className = {classes.overlay2} onClick={(e) => { 
                        e.stopPropagation();
                        onEditClick.onClick()}} aria-label={onEditClick.title} size="small" >
                        <onEditClick.Icon fontSize="small" />
                      </IconButton> */}
                  </Tooltip>
              </div>
              <div className={classes.cardText}>
                  <Tooltip title={title} placement="top-start">
                    <Typography gutterBottom variant="h6" component="h2" noWrap className={classes.title}>
                      {title && title}
                    </Typography>
                  </Tooltip>
                  <Typography variant="subtitle1" justify noWrap color="textSecondary" component="p">
                    {description && description}
                  </Typography>
              </div>
              </div>

            <CardActions className={classes.cardBottom}>
              {
                <Tooltip>
                  <Typography variant="subtitle1" style={{color: 'white', marginRight: '10px', fontWeight: 600, fontSize: '15px'}}>
                    {bottomTitle}: <span style={{color: 'orange', marginRight: '10px', fontWeight: 600}}>{bottomCounter}</span>
                  </Typography>
                </Tooltip>
              //   bottomActions &&
              //   bottomActions.map((button) =>
              //   <Tooltip title={button.title} placement="bottom">
              //       <IconButton onClick={(e) => { 
              //         e.stopPropagation();
              //         button.onClick()
              //       }} 
              //       aria-label={button.title}
              //       size="small">
              //         <button.Icon className={classes.bottomButtons} fontSize="small" />
              //       </IconButton>
              //   </Tooltip>
              // )
            }
            </CardActions>
      </Card>
    </ButtonBase>
  );
}

export default SmallCard;