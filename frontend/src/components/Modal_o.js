import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>service Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="service-service_name">service_name</Label>
              <Input
                type="text"
                id="service-service_name"
                name="service_name"
                value={this.state.activeItem.service_name}
                onChange={this.handleChange}
                placeholder="Enter service service_name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="service-params">params</Label>
              <Input
                type="text"
                id="service-params"
                name="params"
                value={this.state.activeItem.params}
                onChange={this.handleChange}
                placeholder="Enter service params"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="chosen"
                  checked={this.state.activeItem.chosen}
                  onChange={this.handleChange}
                />
                chosen
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}