import React from "react"
import axios from "axios";
import authHeader from '../services/auth.header';
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

class Authors extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      modal : false,
      name: '',
      surname: '',
      birthday: '',
      nationality: '',
      about: '',
      id: null,
      mode : '',
      books : '',
    }
  }

  handleShow(e , authId, authName, authSurname, authBirthday, authNationality, authAbout, mode,books)
  {
    this.setState({mode: mode})
    e.preventDefault();
    this.setState({modal:true});
    this.setState({id:authId});
    this.setState({name:authName});
    this.setState({surname:authSurname});
    this.setState({birthday:authBirthday});
    this.setState({nationality:authNationality});
    this.setState({books: books});
    this.setState({about: authAbout});
  }

  handleClose() {
    this.setState({modal: false})
  }

  handleEdit (e) {
    this.setState({mode:'edit'})
    axios.put('http://127.0.0.1:8000/api/authors/'+this.state.id+'/', {
      "name":this.state.name,
      "surname":this.state.surname,
      "birthday":this.state.birthday,
      "nationality":this.state.nationality,
      "author_description":this.state.about,
      "books":this.state.books
    }, 
    {
      headers: authHeader()
    }).then(res => {
      this.setState({modal:false})
      e.preventDefault();
      this.componentDidMount();
      toast.success("Edycja udana!");
    }).catch(() => {
      toast.error("Edycja niepowiodła się!")
    });
  }

  handleDelete(e, authId) {
    console.log(authId);
    this.setState({id:authId}, () => {
      axios.delete('http://127.0.0.1:8000/api/authors/'+this.state.id+'/',{
        headers: authHeader()
      }).then(res => {
        toast.success("Usuwanie udane!");
        this.componentDidMount();
      }).catch(function (error) {
        if (error.res) {
          toast.error("Usuwanie niepowiodło się!");
        }
      })
    });
  }

  handleAdd(e) {
    this.setState({mode:'add'})
    this.setState({modal:true})
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/authors/', {
      "name":this.state.name,
      "surname":this.state.surname,
      "birthday":this.state.birthday,
      "nationality":this.state.nationality,
      "author_description":this.state.about,
      "books":this.state.books
    }, {
      headers: authHeader()
    }).then(
      res => {
        this.setState({modal:false})
        toast.success("Dodawanie udane!");
        this.componentDidMount();
      }
    ).catch(function(error) {
      if(error.res) {
        this.setState({modal:false})
        toast.error("Dodawanaie nieudane!")
      }
    })
  }
  

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authors/', { headers: authHeader() })
    .then(res => this.setState({authors:res.data}));
  }

  render = () => { 
    return(
    <div>
        <Button variant="success" onClick={(e) => this.handleShow(e)}> Add </Button>
        <ToastContainer/>
          <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First name</th>
            <th scope="col">Surname</th>
            <th scope="col">Birthday</th>
            <th scope="col">Nationality</th>
            <th scope="col">About author</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        { this.state.authors.map(authors =>
        <>
          <tr>
            <td>{authors.id}</td>
            <td>{authors.name}</td>
            <td>{authors.surname}</td>
            <td>{authors.birthday}</td>
            <td>{authors.nationality}</td>
            <td>{authors.author_description}</td>
            <td>
              <Button variant="secondary" className="me-1" onClick={(e) => this.handleShow(e, authors.id, authors.name, authors.surname, authors.birthday, authors.nationality, authors.author_description, "edit")}>Edit</Button>
              <Button variant="danger" className="btn btn-danger me-1" onClick={(e) => this.handleDelete(e, authors.id)}>Delete</Button>
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

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control type="text" placeholder="Enter surname" value={this.state.surname} onChange={(e) => this.setState({surname:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="text" placeholder="Enter birthday" value={this.state.birthday} onChange={(e) => this.setState({birthday:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNationality">
              <Form.Label>Nationality</Form.Label>
              <Form.Control type="text" placeholder="Enter nationality" value={this.state.nationality} onChange={(e) => this.setState({nationality:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>About</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={this.state.about} onChange={(e) => this.setState({about:e.target.value})} />
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
export default Authors;