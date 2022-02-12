import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import { useState } from "react";
import productStore from "../stores/productStore";

function ProductModal({ oldProduct }) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(
    oldProduct ?? {
      name: "",
      image: "",
      price: 5,
      description: "",
      color: "black",
      quantity: 5,
    }
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) =>
    setProduct({ ...product, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (oldProduct) productStore.updateProduct(product, oldProduct._id);
    else productStore.createProduct(product);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        {oldProduct ? "Edit" : "New"}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <FormControl
                placeholder="Your product's name"
                name="name"
                value={product.name}
                type="text"
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Image</InputGroup.Text>
              <FormControl
                name="image"
                value={product.image}
                type="text"
                onChange={handleChange}
                placeholder="Image"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Price</InputGroup.Text>
              <FormControl
                name="price"
                value={product.price}
                type="number"
                onChange={handleChange}
                placeholder="لا تصير طماع"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <FormControl
                name="description"
                value={product.description}
                type="text"
                onChange={handleChange}
                placeholder="Description"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Color</InputGroup.Text>
              <FormControl
                name="color"
                value={product.color}
                type="text"
                onChange={handleChange}
                placeholder="Color"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Quantity</InputGroup.Text>
              <FormControl
                name="quantity"
                value={product.quantity}
                type="number"
                onChange={handleChange}
                placeholder="Quantity"
              />
            </InputGroup>
            <Button variant="outline-dark" type="submit">
              {oldProduct ? "Edit" : "Add"} Product
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductModal;
