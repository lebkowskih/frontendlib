import React from "react"
import axios from "axios";
import authHeader from '../services/auth.header';
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

class Categories extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      modal: false,
      name: '',
      description: '',
      id: null,
      mode: '',
    }
  }

  handleShow (e, catId, catName, catDes, mode) {
    this.setState({mode: mode});
    e.preventDefault();
    this.setState({modal:true});
    this.setState({id:catId});
    this.setState({name:catName});
    this.setState({description:catDes});
  }

  handleClose() {
    this.setState({modal: false});
  }

  handleEdit (e) {
    this.setState({mode:'edit'})
    axios.put('http://127.0.0.1:8000/api/categories/'+this.state.id+'/', {
      "name":this.state.name,
      "category_description":this.state.description,
    }, { headers: authHeader() }).then(res => {
      this.setState({modal: false})
      e.preventDefault();
      this.componentDidMount();
      toast.success("Edycja udana!");
    }).catch(() => {
      toast.error("Edycja niepowiodła się!")
    });
  }

  handleDelete (e, catId) {
    this.setState({id:catId}, () => {
      axios.delete('http://127.0.0.1:8000/api/categories/'+this.state.id+'/',{
        headers: authHeader()
     }).then(res => {
        toast.success('Usuwanie udane!');
        this.componentDidMount();
     }).catch(function(error) {
       if(error.res) {
        toast.error("Usuwanie niepowiodło się!");
       }
     })
    });
  }
    
  handleAdd(e) {
    this.setState({mode:'add'})
    console.log("hm");
    this.setState({modal:true})
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/categories/', {
      "name":this.state.name,
      "category_description":this.state.description,
    }, {
      headers: authHeader()
    }).then(
      res => {
        this.setState({modal:false})
        toast.success("Dodawanie udane!");
        this.componentDidMount();
    }).catch(function(error) {
      if(error.res) {
        this.setState({modal:false})
        toast.error("Dodawanie nieudane!")
      }
    })
  } 

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/categories/', { headers: authHeader() })
    .then(res => this.setState({categories: res.data}));
    console.log(this.state.categories);
  }

  render = (counter=1) => { 
    return(
    <div>
        <Button variant="success" onClick={(e) => this.handleShow(e, null,null,null,"add")}> Add </Button>
          <ToastContainer />
          <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        { this.state.categories.map(categories =>
        <>
          <tr>
            <td>{counter++}</td>
            <td key="{categories.name}">{categories.name}</td>
            <td key="{categories.category_description}">{categories.category_description}</td>
            <td>
              <Button variant="secondary" className="me-1" onClick={(e) => this.handleShow(e, categories.id, categories.name, categories.category_description, "edit")}>Edit</Button>
              <Button variant="danger" className="btn btn-danger me-1" onClick={(e) => this.handleDelete(e, categories.id)}>Delete</Button>
            </td>
          </tr>
          </>
          )}
        </tbody>
      </table>  
      <>
      

      <Modal show={this.state.modal} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.mode === 'edit' ? <p>Edit</p> : <p>Add</p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter description" value={this.state.description} onChange={(e) => this.setState({description:e.target.value})} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={this.state.mode === 'edit' ? (e) => this.handleEdit(e) : (e) => this.handleAdd(e)  }>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    </div>
  
  )
    }
}
export default Categories;