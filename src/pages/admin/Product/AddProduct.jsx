// import { useEffect, useState } from "react";
// // import ReactQuill from "react-quill";
// import { useLocation, useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";

const AddProduct = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const getProductId = location.pathname.split("/")[3];

  // const [formValues, setFormValues] = useState({
  //   id: "",
  //   code: "",
  //   name: "",
  //   description: "",
  //   price: "",
  //   quantity: "",
  //   category_id: "",
  //   brand_id: "",
  //   image_url: "",
  // });

  // const brandState = useSelector((state) => state.brand.brands);
  // const catState = useSelector((state) => state.category.categories);
  // const { product } = useSelector((state) => state.product);

  // // useEffect(() => {
  // //   dispatch(getBrands());
  // //   dispatch(ListCategories());

  // //   // if (getProductId) {
  // //   //   dispatch(getAProduct(getProductId));
  // //   // }
  // // }, [dispatch, getProductId]);
  // // console.log(getProductId);
  // useEffect(() => {
  //   // Kiểm tra nếu product.result tồn tại và là một mảng
  //   const productData = product?.[0] || {}; // Lấy phần tử đầu tiên hoặc để trống nếu không có phần tử
  //   if(Object.keys(productData).length > 0){
  //     setFormValues({
  //       id: productData.id || "",
  //       code: productData.code || "",
  //       name: productData.name || "",
  //       description: productData.description || "",
  //       price: productData.price || "",
  //       quantity: productData.quantity || "",
  //       category_id: productData.category_id || "",
  //       brand_id: productData.brand_id || "",
  //       image_url: productData.image_url || "",
  //     });
  //   }
      
  //     console.log(formValues);
  // }, [product]);
  
  
  // useEffect(() => {
  //   console.log('Current formValues:', formValues);
  // }, [formValues]); 

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues((formValues) => ({
  //     ...formValues,
  //     [name]: value,  // Cập nhật giá trị của trường tương ứng
  //   }));
  // };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   // Kiểm tra nếu giá trị quan trọng nào đó bị thiếu
  //   if (!formValues.name || !formValues.price || !formValues.quantity) {
  //     toast.error("Vui lòng điền đầy đủ thông tin.");
  //     return;
  //   }
  
  //   // if (getProductId) {
  //   //   // console.log(data);
  //   //   dispatch(updateAProduct({id:getProductId, productData:formValues}));
  //   //   console.log("Dữ liệu gửi đi backend: ", formValues);
  //   //   toast.success("Cập nhật sản phẩm thành công!");
  //   // } else {
  //   //   dispatch(createProduct(formValues));
  //   //   toast.success("Thêm sản phẩm thành công!");
  //   // }
  
  //   setTimeout(() => {
  //     navigate("/admin/list-product");
  //   }, 2000);
  // };
  

  return (
    <div>
      Add Product
      </div>
  );
};

export default AddProduct;
