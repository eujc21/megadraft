/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import {Tabs, Tab} from "material-ui/Tabs";
import FontIcon from "material-ui/FontIcon";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {grey300, grey900, white, indigo500} from "material-ui/styles/colors";

import {MegadraftEditor} from "../../src/Megadraft";
import {editorStateFromRawString, editorStateToJSON, editorStateFromRaw} from "../../src/utils";
import {highlightCode} from "./highlightCode";

import INITIAL_CONTENT from "./contentExample";
import INITIAL_STRING_CONTENT from "./contentStringExample";


const muiTheme = getMuiTheme({
  fontFamily: "Roboto, sans-serif",
  tabs: {
    textColor: grey300,
    selectedTextColor: grey900
  },
  palette: {
    primary1Color: white,
    accent1Color: indigo500
  }
});

class Example extends React.Component {

  constructor(props) {
    super(props);
    const content = editorStateFromRawString(INITIAL_CONTENT);
    const contentString = editorStateFromRawString(INITIAL_STRING_CONTENT);
    this.keyBindings = [
        { name: "save", isKeyBound: (e) => { return e.keyCode === 83 && e.ctrlKey; }, action: () => { this.onSave(); } }
    ];
    this.state = {
      value: content,
      stringValue: contentString,
      activeTab: "a"
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeString = this.onChangeString.bind(this);
    this.onCodeActive = this.onCodeActive.bind(this);
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(muiTheme)};
  }

  componentDidMount() {
    highlightCode(this);
  }

  handleChange = (tab) => {
    this.setState({
      activeTab: tab
    });
  };

  onChangeString(value) {
    this.setState({
      stringValue: value
    });
  }
  onChange(value) {
    this.setState({
      value: value
    });
  }

  onSave() {
    console.log("save");
  }

  onCodeActive() {
    highlightCode(this);
  }

  render() {
    const icon_edit = <FontIcon className="material-icons">mode_edit</FontIcon>;
    const icon_code = <FontIcon className="material-icons">code</FontIcon>;
    const {stringValue, value} = this.state;
    return (
      <Tabs value={this.state.activeTab} onChange={this.handleChange}>
        <Tab label="Editor" value="a" icon={icon_edit}>
          <div className="tab-container-header-editor">
            <MegadraftEditor
              key={0}
              editorState={stringValue}
              placeholder="Text"
              onChange={this.onChangeString}
              keyBindings={this.keyBindings}/>
          </div>
          <div className="tab-container-editor">
            {/* <MegadraftEditor
              key={1}
              editorState={value}
              placeholder="Text"
              onChange={c => this.onChange({"value": c})}
              keyBindings={this.keyBindings}/> */}
          </div>
        </Tab>
        <Tab label="Content JSON" onActive={this.onCodeActive} value="b" icon={icon_code}>
          <div className="tab-container-json">
            <pre className="jsonpreview">
              <code className="json hljs">
                {editorStateToJSON(this.state.value)}
                {editorStateToJSON(this.state.stringValue)}
              </code>
            </pre>
          </div>
        </Tab>
      </Tabs>
    );
  }
}


Example.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default Example;
