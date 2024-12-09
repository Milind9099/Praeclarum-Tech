import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import ProductDialog from "./ProductDialog";

const CreateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const getPrductData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong!");
        setLoading(false);
      });
  };

  useEffect(() => {
    getPrductData();
  }, []);

  if (loading) {
    return <div style={{justifyContent:"center",width:"100%"}}>Loading...</div>; // Show a loading message or spinner while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's any
  }

  const handleAddToCart = () => {
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuantity(1); // Reset quantity when dialog is closed
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product?.id}>
            <Card
              sx={{
                maxWidth: 345,
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={product?.image}
                alt={product?.title}
                sx={{ objectFit: "cover", borderRadius: "8px" }}
              />
              <CardContent>
                <Tooltip title={product?.title} placement="top">
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                      whiteSpace: "normal",
                      width: "100%",
                    }}
                  >
                    {product?.title}
                  </Typography>
                </Tooltip>
                <Typography sx={{ marginTop: "10px", fontWeight: "bold" }}>
                  ${product?.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => {
                  setSelectedProduct(product);
                  setOpenDialog(true);
                }}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

       {/* Product Dialog Component */}
       <ProductDialog
        open={openDialog}
        product={selectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        onClose={handleCloseDialog}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default CreateProduct;
