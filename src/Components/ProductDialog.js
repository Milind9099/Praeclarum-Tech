import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const ProductDialog = ({ open, product, quantity, setQuantity, onClose, onAddToCart }) => {
  const totalPrice = product ? product?.price * quantity : 0;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Product Details:</DialogTitle>
      <DialogContent>
        {product && (
          <>
            <Typography variant="h6">{product?.title}</Typography>
            <Typography variant="body1" color="text.secondary">
              Price: ${product?.price}
            </Typography>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e?.target?.value))}
              sx={{ marginTop: "15px", width: "100%" }}
              inputProps={{ min: 1 }}
            />
            <Typography variant="body1" sx={{ marginTop: "15px" }}>
              Total Price: ${totalPrice?.toFixed(2)}
            </Typography>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Checkout
              </Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialog;
