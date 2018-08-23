import React from 'react';
import { Collapse } from 'react-collapse';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: this.props.isOpened ? this.props.isOpened : false
    }
  }
  onClickHandler = () => {
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  render() {
    return (
      <div className="shadow">
        <div className={!this.state.isOpened ? "list-header__clickable" : "list-header__clickable clicked"}
          onClick={this.onClickHandler}>
          <h3 className="list-header-title">Monthly {this.props.wordToRender}</h3>
          <h3 className="list-header-title">{this.props.summaryToRender}</h3>
        </div>
        <Collapse
          isOpened={this.state.isOpened}>
          <div>{this.props.propsToRender.length === 0
            ? <div className="list-item list-item-message">
              <span>No {this.props.wordToRender.toLowerCase()} added yet</span>
            </div>
            : this.props.propsToRender.map((item) => {
              return <ListItem {...item} key={item.id} />
            })
          }
          </div>
          <div className="list-item">
            <div>
              <span className="list-item__subtitle">
                <span>
                  Add another
                </span>
              </span>
            </div>
            <div>
              <Link to={this.props.parent}>
                <FaPlusCircle />
              </Link>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
export default List
