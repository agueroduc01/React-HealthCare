import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
// import { FormattedMessage } from "react-intl";
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: '',
      contentMarkdown: '',
      selectedDoctor: '',
      description: '',
      listDoctors: [],
      isCreated: false,
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    console.log(`Option selected:`, selectedDoctor);
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0) {
      if (res.data.Markdown) {
        let contentHTML = res.data.Markdown.contentHTML
          ? res.data.Markdown.contentHTML
          : '';
        let contentMarkdown = res.data.Markdown.contentMarkdown
          ? res.data.Markdown.contentMarkdown
          : '';
        let description = res.data.Markdown.description
          ? res.data.Markdown.description
          : '';
        this.setState({
          contentHTML,
          contentMarkdown,
          description,
          isCreated: true,
        });
      } else {
        this.setState({
          contentHTML: '',
          contentMarkdown: '',
          description: '',
          isCreated: false,
        });
      }
    }
  };
  handleSave = () => {
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };
  handleOnChangeDesc = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  render() {
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Thêm thông tin bác sĩ</div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
              options={this.state.listDoctors}
            />
          </div>
          <div className="content-right">
            <label className="">Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(e) => this.handleOnChangeDesc(e)}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSave()}
          className={
            this.state.isCreated
              ? 'manage-doctor-btn-edit'
              : 'manage-doctor-btn-save'
          }
        >
          {this.state.isCreated ? 'Sua thong tin' : 'Lưu thông tin bác sĩ'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
