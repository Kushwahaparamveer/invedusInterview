import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import BookDataService from "../services/book.services";

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("Available");
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleImageChange=(e) => {
  setBookId({...id,image:e.target.files[0]})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || author === "" || imgUrl === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBook = {
      title,
      author,
      status,
      imgUrl,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle("");
    setAuthor("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
      setImgUrl(docSnap.data().imgUrl);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <InputGroup>
              <InputGroup.Text id="formBookTitle">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Email"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">P</InputGroup.Text>
              <Form.Control
                type="file"
               
                
                value={imgUrl}
                onChange={(e) => handleImageChange(e)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setStatus("Office");
                setFlag(true);
              }}
            >
              Office
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setStatus("Home");
                setFlag(false);
              }}
            >
              Home
            </Button>
          </ButtonGroup>
          {/* <div className="progress">
            <div className="progress-bar progress-bar-striped">
              50%
            </div>
          </div> */}
          <div className="d-grid gap-2 mt-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddBook;
