import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
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
    // const { auth, anchorEl } = this.state;
    // const open = Boolean(anchorEl);
    const sideList = (
      <div>

   {
       showingLocations.map((menuItems) =>
       {
        return (
          <ul
            key={menuItems.key}
            role="link"
            onClick={

              () => {this.props.showInfoWindowNow(menuItems)}
            }
          >
              {menuItems.title}
              <br/>
          </ul>)
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

      React Maps Project

      </Typography>
    </Toolbar>
</AppBar>


<Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>

<header className="drawer__header">
    <div className="drawer__header-content">
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
