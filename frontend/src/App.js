import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";


const url = "http://localhost:8000"
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      viewchosen: false,
      serviceList: [],
      modal: false,
      activeItem: {
        service_name: "",
        params: "",
        chosen: false,
      },
      choose: {
        chosen: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(url+"/api/services_static")
      .then((res) => this.setState({ serviceList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleGetParams = (item) => {
    this.toggle();
    axios
    .get(url+"/api/services_static/"+item.choose.chosen)
    .then((res) => this.refreshList())
    .catch((err) => console.log(err));
    console.log(item)
  };

  handleDelete = (item) => {
    axios
      .delete(url+"/api/services_static/"+item.id)
      .then((res) => this.refreshList())
      .catch((err) => console.log(err));
  };

  createItem = () => {
    const item = { service_name: "", params: "", chosen: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displaychosen = (status) => {
    if (status) {
      return this.setState({ viewchosen: true });
    }

    return this.setState({ viewchosen: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displaychosen(true)}
          className={this.state.viewchosen ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displaychosen(false)}
          className={this.state.viewchosen ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewchosen } = this.state;
    const newItems = this.state.serviceList.filter(
      (item) => item.chosen === viewchosen
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewchosen ? "chosen-service" : ""
          }`}
          service_name={item.params}
        >
          {item.service_name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Choose service
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            choose={this.state.choose}
            toggle={this.toggle}
            onSave={this.handleGetParams}
          />
        ) : null}
      </main>
    );
  }
}

export default App;