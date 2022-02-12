import Card from "./ProductCard";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { observer } from "mobx-react";
import productStore from "../stores/productStore";
import { Button, Form, Row, Stack } from "react-bootstrap";

function ProductList() {
  const [query, setQuery] = useState("");

  const productList = productStore.products
    .filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((product) => <Card key={product._id} product={product} />);

  return (
    <div>
      <h1 className="title">Products</h1>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          className="m-2"
          placeholder="Search for product by name"
          onChange={(event) => setQuery(event.target.value)}
        />
        <ProductModal />
      </Stack>

      <Row>{productList}</Row>
    </div>
  );
}

export default observer(ProductList);
