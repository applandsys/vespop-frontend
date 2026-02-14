"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import {TextField, Button, Modal, Box} from "@mui/material";
import { getAllProductsStock } from "@/services/admin/getProductStock";
import { addStock } from "@/services/admin/addProductStock";
import {html} from "gridjs";

const ProductStock = () => {
    const [productStock, setProductStock] = useState([]);
    const [stockInputs, setStockInputs] = useState(); // track input per product/variant

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        fetchProductStock();

        const handleClick = (e) => {
            const btn = e.target.closest(".paid-btn");
            if (!btn) return;

            const productId = btn.dataset.pid;
            const variantKey = btn.dataset.vid;
            const name = btn.dataset.name;

            setSelected({ productId, variantKey, name });
            setOpen(true);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const fetchProductStock = async () => {
        try {
            const res = await getAllProductsStock();
            setProductStock(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputChange = (key, value) => {
        setStockInputs((prev) => ({ ...prev, [key]: value }));
    };

    const handleAddStock = async (productId, variantKey = "no-variant") => {
        const key = `${productId}-${variantKey}`;
        if (!quantity || quantity <= 0) return alert("Enter a valid quantity");
        try {
            await addStock({
                productId: selected.productId,
                productVariantId:
                    selected.variantKey === "no-variant"
                        ? null
                        : Number(selected.variantKey),
                quantity: Number(quantity),
            });
            alert("Stock added successfully!");
            setOpen(false);
            setQuantity("");
            setStockInputs((prev) => ({ ...prev, [key]: "" }));
            await fetchProductStock();

        } catch (err) {
            console.error(err);
            alert("Failed to add stock");
        }
    };

    // Build data for Grid.js
    const data = productStock.flatMap((product, index) => {
        return Object.entries(product.variants).map(([vKey, variant], vIndex) => {
            const key = `${product.productId}-${vKey}`;
            return [
                product.productId,
                vKey,
                index + 1,
                product.productName,
                variant.variantName,
                variant.stock,
                variant.reserved,
                variant.stock - variant.reserved,
                html(`
                    <button 
                     class="paid-btn bg-yellow-600 rounded-md p-1 hover:border-yellow-300 text-white text-xs"
                     data-pid="${product.productId}"
                     data-vid="${vKey}"
                     data-name="${product.productName} - ${variant.variantName}"
                    >
                    Add
                    </button>
                    `),
            ];
        });
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Product Stock</h2>
            <Grid
                data={data}
                columns={[
                    { name: "productId", hidden: true },
                    { name: "variantKey", hidden: true },
                    "SL",
                    "Product Name",
                    "Variant",
                    "Stock",
                    "Reserved",
                    "Available",
                    "Add"
                ]}
                search
                sort
                pagination={{ limit: 10 }}
            />

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 350,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    {/* Close button */}
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            minWidth: "auto",
                            padding: "2px 6px",
                            fontSize: 12,
                        }}
                        variant="outlined"
                        color="error"
                    >
                        X
                    </Button>

                    <h4 style={{ marginBottom: 10 }} className="text-center">Add Stock</h4>

                    <p style={{ fontSize: 12, marginBottom: 10 }}>
                        {selected?.name}
                    </p>

                    <TextField
                        fullWidth
                        size="small"
                        label="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={handleAddStock}
                    >
                        Confirm
                    </Button>
                </Box>
            </Modal>


        </div>
    );
};

export default ProductStock;
