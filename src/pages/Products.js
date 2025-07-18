import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import SEO from "../Components/SEO";

function Products() {
  const { getToken } = useAuth();
  const Host = process.env.REACT_APP_HOST;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", category: "" });
  const [customCategory, setCustomCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const [categoryOptions, setCategoryOptions] = useState([
    "Electronics", "Clothing", "Food", "Books", "Home Appliances", "Kitchen Items",
    "Beauty Products", "Furniture", "Stationery", "Footwear", "Toys", "Sports", "Garden",
    "Health Care", "Automobile", "Mobile Accessories", "Computer Accessories", "Tools", "Grocery", "Others"
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.get(`${Host}/api/products/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products);

      // Extract and add any new categories found in fetched products
      const fetchedCategories = [...new Set(res.data.products.map(p => p.category))];
      setCategoryOptions(prev =>
        Array.from(new Set([...prev, ...fetchedCategories.filter(c => c)]))
      );
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      errs.price = "Price must be greater than 0";
    if (!formData.category || (formData.category === "Others" && !customCategory))
      errs.category = "Category is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleAddProduct = async () => {
    if (!validate()) return;

    const finalCategory = formData.category === "Others" ? customCategory : formData.category;

    try {
      const token = await getToken();
      await axios.post(`${Host}/api/products/add`, { ...formData, category: finalCategory }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowAddModal(false);
      setFormData({ name: "", price: "", category: "" });
      setCustomCategory("");
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({ name: product.name, price: product.price, category: product.category });
    setCustomCategory(product.category === "Others" ? product.category : "");
    setShowEditModal(true);
  };

  const handleUpdateProduct = async () => {
    if (!validate()) return;

    const finalCategory = formData.category === "Others" ? customCategory : formData.category;

    try {
      const token = await getToken();
      await axios.put(`${Host}/api/products/update/${editProduct._id}`,
        { ...formData, category: finalCategory },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowEditModal(false);
      setEditProduct(null);
      setFormData({ name: "", price: "", category: "" });
      setCustomCategory("");
      fetchProducts();
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = await getToken();
      await axios.delete(`${Host}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderFormFields = () => (
    <>
      <input
        className="form-control mb-2"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      {errors.name && <div className="text-danger">{errors.name}</div>}

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />
      {errors.price && <div className="text-danger">{errors.price}</div>}

      <select
        className="form-select mb-2"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categoryOptions.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      {errors.category && <div className="text-danger">{errors.category}</div>}

      {formData.category === "Others" && (
        <input
          className="form-control mb-2"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}
    </>
  );

  return (
    <> 
<SEO
  title="QuickBills | Manage Products"
  description="Add, edit, and manage your business products with QuickBills. Simplify inventory tracking and prepare for quick invoice creation."
  url="https://quickbills-ak.vercel.app/products"
  image="https://quickbills-ak.vercel.app/preview.png"
/>
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold display-5">Products</h2>

      <div className="input-group w-100 mb-4 shadow-sm rounded overflow-hidden">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="my-3">
        <button
          className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
          onClick={() => {
            setShowAddModal(true);
            setFormData({ name: "", price: "", category: "" });
            setCustomCategory("");
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center my-5">
          <h5 className="text-muted">
            <i className="bi bi-box-seam me-2"></i>
            Add your First Product
          </h5>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center my-5">
          <h5 className="text-muted">
            <i className="bi bi-box-seam me-2"></i>
            No products found
          </h5>
        </div>
      ) : (
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col-12 col-md-6 mb-4 m-auto" key={product._id}>
              <div className="card shadow p-3 rounded-4">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="fw-bold">{product.name}</h5>
                  <span className="badge bg-light text-muted px-3 py-1 rounded-pill small">
                    {product.category}
                  </span>
                </div>
                <p className="text-muted mb-3">₹{Number(product.price).toLocaleString("en-IN")}</p>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleEditClick(product)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger d-flex align-items-center justify-content-center"
                    style={{ width: "48px" }}
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Product</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">{renderFormFields()}</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleAddProduct}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">{renderFormFields()}</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateProduct}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Products;