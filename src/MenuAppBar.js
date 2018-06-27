import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LeftDrawer from './LeftDrawer';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import escapeRegEx from 'escape-string-regexp'


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false
  };


  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };


  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

render() {

let showingLocations;

if (this.props.query){
      const match = new RegExp(escapeRegEx(this.props.query), 'i')
      showingLocations = this.props.locations.filter((location) => match.test(location.title))

    } else {
      showingLocations = this.props.locations;
}

    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      <div>

   {
       showingLocations.map((menuItems) =>
       {
        return (<list>{menuItems.title}<br/></list>)
       })

   }


      </div>
    );



return (
<div className={classes.root}>

<AppBar position="static">
    <Toolbar>
    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
    onClick={this.toggleDrawer('left', true)}
    >
    <MenuIcon/>
    </IconButton>
      <Typography variant="title" color="inherit" className={classes.flex}>
new haven maps
      </Typography>
    </Toolbar>
</AppBar>


<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>

<header class="drawer__header">
    <div class="drawer__header-content">
      Locations:
    </div>
</header>

<input
className= "menuFilterInput"
type= "text"
id="menuFilterInputBox"
placeholder= "Search"
value= {this.props.query}
onChange= { (event) => {
  this.props.updateQuery(event.target.value);

}
}
/>

<Button
onClick={this.props.clearQuery}
>Reset</Button>

{sideList}

</Drawer>


</div>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
