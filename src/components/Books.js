import React from "react"
import axios from "axios";
import authHeader from '../services/auth.header';
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

class Books extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      title: '',
      isbn: '',
      date_of_publication: '',
      quantity: '',
      book_description: '',
      author_id: '',
      category_id: '',
      modal: false,
      id: null,
      language: '',
      categories : [],
      authors : [],
      catId : 0,
      autId : 0,
    }
  }

  handleShow(e, bookId, bookTitle, bookIsbn, bookDateOfPublication, bookQuantity, bookDescription, bookLanguage, bookAuthor, bookCategory, mode)
  {
    this.setState({mode:mode});
    e.preventDefault();
    this.setState({modal: true});
    this.setState({id: bookId});
    this.setState({title: bookTitle})
    this.setState({isbn: bookIsbn});
    this.setState({date_of_publication: bookDateOfPublication});
    this.setState({quantity: bookQuantity});
    this.setState({book_description: bookDescription});
    this.setState({language: bookLanguage});
    this.setState({autId: bookAuthor});
    this.setState({catId: bookCategory});
  }
  
  handleClose() {
    this.setState({modal: false});
  }

  handleCat(e){
    this.setState({catId: e.target.value});
  }

  handleAut(e){
    this.setState({autId: e.target.value});
  }

  handleBorrow(e,id,quantity){
    if(quantity >= 1)
      {axios.patch('http://127.0.0.1:8000/api/books/'+ id + '/',{
        'quantity': (quantity - 1)
        },{
          headers: authHeader() 
        }
        ).then(res => {
          console.log(res);
          e.preventDefault();
          this.componentDidMount();
        })}
        else{
          toast.error('The numbers of books is zero!')
        }
  }
  handleEdit (e) {
    this.setState({mode:'edit'});
    axios.put('http://127.0.0.1:8000/api/books/'+this.state.id+'/', {
      "title":this.state.title,
      "isbn":this.state.isbn,
      "date_of_publication": this.state.date_of_publication,
      "quantity": this.state.quantity,
      "book_description":this.state.book_description,
      "language":this.state.language,
      "authors":this.state.autId,
      "categories":this.state.catId
    }, {
      headers: authHeader()
    }).then(res => {
      this.setState({modal:false})
      e.preventDefault();
      this.componentDidMount();
      toast.success("Successful editing!");
    }).catch(() => {
      toast.error("Editing failed!")
    });
  }
  handleDelete(e, bookId) {
    this.setState({id:bookId}, () => {
      axios.delete('http://127.0.0.1:8000/api/books/'+this.state.id+'/',{
        headers: authHeader()
      }).then(res => {
        toast.success("Deletion successful!");
        this.componentDidMount();
      }).catch(function (error) {
        if (error.res) {
          toast.error("Deletion failed!");
        }
      })
    });
  }

  handleAdd(e) {
    this.setState({mode:'add'})
    this.setState({modal:true})
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/books/', {
      "title":this.state.title,
      "isbn":this.state.isbn,
      "date_of_publication": this.state.date_of_publication,
      "quantity": this.state.quantity,
      "book_description":this.state.book_description,
      "language":this.state.language,
      "authors":this.state.autId,
      "categories":this.state.catId
    }, {
      headers: authHeader()
    }).then(
      res => {
        this.setState({modal:false})
        toast.success("Adding successful!");
        this.componentDidMount();
      }
    ).catch(function(error) {
      if(error.res) {
        this.setState({modal:false})
        toast.error("Adding failed!")
      }
    })
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/books/', { headers: authHeader() })
    .then(res => this.setState({books:res.data}));
    axios.get('http://127.0.0.1:8000/api/authors/', { headers: authHeader() })
    .then(res => this.setState({authors:res.data}));
    axios.get('http://127.0.0.1:8000/api/categories/', { headers: authHeader() })
    .then(res => this.setState({categories:res.data}));
  }
 
  render = (counter=1) => { 
    return(
    <div>
          <Button variant="success" onClick={(e) => this.handleShow(e)}> Add </Button>
          <ToastContainer/>
          <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">ISBN</th>
            <th scope="col">Date of publication</th>
            <th scope="col">Quantity</th>
            <th scope="col">Book description</th>
            <th scope="col">Language</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        { this.state.books.map(books =>
        <>
          <tr>
            
            <td>{counter++}</td>
            <td>{books.title}</td>
            <td>{books.isbn}</td>
            <td>{books.date_of_publication}</td>
            <td>{books.quantity}</td>
            <td>{books.book_description}</td>
            <td>{books.language}</td>
            {this.state.authors.map(authors=>
              <>
              {authors.id === books.authors && <td>
                {authors.name} {authors.surname}
                </td>}
              </>
              )}
            <td>
            {this.state.categories.map(categories=>
              <>
              {categories.id === books.categories && <td>
                {categories.name}
                </td>}
              </>
              )}
            </td>
            <td>
              <Button variant="warning" className="me-1" onClick={(e) => this.handleBorrow(e,books.id, books.quantity)}>Borrow</Button>
              <Button variant="secondary" className="me-1" onClick={(e) => this.handleShow(e, books.id, books.title ,books.isbn, books.date_of_publication, books.quantity, books.book_description, books.language,books.authors, books.categories, "edit")}>Edit</Button>
              <Button variant="danger" className="btn btn-danger me-1" onClick={(e) => this.handleDelete(e, books.id)}>Delete</Button>
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
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={this.state.title} onChange={(e) => this.setState({title:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsbn">
              <Form.Label>ISBN</Form.Label>
              <Form.Control type="text" placeholder="Enter isbn" value={this.state.isbn} onChange={(e) => this.setState({isbn:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDateOfPublication">
              <Form.Label>Date of publication</Form.Label>
              <Form.Control type="date" placeholder="Enter date of publication" value={this.state.date_of_publication} onChange={(e) => this.setState({date_of_publication:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" placeholder="Enter quantity" value={this.state.quantity} onChange={(e) => this.setState({quantity:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={this.state.book_description} onChange={(e) => this.setState({book_description:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLanguage">
              <Form.Label>Language</Form.Label>
              <Form.Control type="text" placeholder="Enter language" value={this.state.language} onChange={(e) => this.setState({language:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Authors</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => this.handleAut(e)} value = {this.state.autId}>
                  <option>Select category</option>
                  {this.state.authors.map(authors => 
                    <option value={authors.id}>{authors.name} {authors.surname}</option>)}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategoryId">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => this.handleCat(e)} value = {this.state.catId}>
                  <option>Select category</option>
                  {this.state.categories.map(categories => 
                    <option value={categories.id}>{categories.name}</option>)}
                </Form.Select>
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
export default Books;