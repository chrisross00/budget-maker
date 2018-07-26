import React from 'react';
import FontAwesome from 'react-fontawesome';
import handleClickOutside from 'react-onclickoutside';
import PickerListItem from './PickerListItem';

//https://blog.logrocket.com/building-a-custom-dropdown-menu-component-for-react-e94f02ced4a1

export class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
    this.toggle = this.toggle.bind(this);
  };
  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  };
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };
  toggleSelected = (type) => {
    console.log(type);
  }
  toggle = (e) => {
    console.log(e.target.value);
  }
  render() {
    const list = this.props.list;
    const listOpen = this.state.listOpen;
    const headerTitle = this.state.headerTitle;
    // const { listOpen, headerTitle } = this.state;
    return (
      <div className="picker">
        <div className="picker__header" onClick={() => this.toggleList()}>
          {headerTitle}
          <div className="picker__arrow">{listOpen
            ? <FontAwesome name="angle-up" size="2x" />
            : <FontAwesome name="angle-down" size="2x" />
          }
          </div>
        </div>
        <div className="picker__tray">
          {
            listOpen && <div className="picker-list">
              {list[0] === undefined
                ? ""
                : list.map((item) => (
                  <PickerListItem
                    className="picker-list-item"
                    key={item.id}
                    name={item.type} />
                ))}
            </div>
          }
        </div>
      </div>
    );
  };
}

export default Picker;
