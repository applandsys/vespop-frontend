"use client";

import React, {useEffect, useRef, useState} from 'react';
import config from "@/config";
import {getAllCategories, getCategories} from "@/services/ecommerce/getCategories";
import {getAttributes} from "@/services/ecommerce/getAttributes";
import UiCard from "@/components/theme/common/UiCard";
import {TrashIcon} from "@heroicons/react/16/solid";
import {getProductLabels} from "@/services/ecommerce/getProductLabels";
import Editor from 'react-simple-wysiwyg';
import {getProductDetail} from "@/services/ecommerce/getProductDetail";
import Image from "next/image";
import ProductAttributes from "@/components/admin/ecommerce/ProductAttributes";
import {fetchAllocations} from "@/services/ecommerce/fetchLocations";
import {fetchAllProductBrand} from "@/services/ecommerce/ProductBrand";
import { useRouter } from 'next/navigation';
// import {router} from "next/client";

const ProductAddEditForm = ({ productId }) => {
    const router = useRouter();  // Initialize the router
    const [isSize,setIsSize] = useState(false);
    const [isColor,setIsColor] = useState(false);
    const [isWeight,setIsWeight] = useState(false);
    const attributeQuantityInput = useRef(0);
    const attributeBuyPriceInput =  useRef(0);
    const attributeSellPriceInput = useRef(0);
    const attributeSkuInput = useRef('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);
    const [allAttributes, setAllAttributes] = useState({});
    const [addedProductAttributes, setAddedProductAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [attributeQuantity, setAttributeQuantity] = useState(null);
    const [attributeBuyPrice, setAttributeBuyPrice] = useState(null);
    const [attributeSellPrice, setAttributeSellPrice] = useState(null);
    const [attributeSku, setAttributeSku] = useState(null);
    const [productLabels,setProductLabels] = useState([]);
    const [allProductLabels,setAllProductLabels] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState({
        images: [],
    });

    const [selectedBrand,setSelectedBrand] = useState([]);

    const [locationEnabled, setLocationEnabled] = useState(false);
    const [allLocations, setLocations] = useState([]);
    const [productBrand, setProductBrand] = useState([]);

    const [formDataPrime, setFormDataPrime] = useState(null);
    const [formDataCity, setFormDataCity] = useState(null);
    const [formDataSubCity, setFormDataSubCity] = useState(null);

    const handleChangePrime = (e) => {
        setFormDataPrime(e.target.value);
    };

    const handleChangeCity = (e) => {
        setFormDataCity(e.target.value);
    };

    const handleChangeSubCity = (e) => {
        setFormDataSubCity(e.target.value);
    };

    const formInputs = {
        name: '',
        description: '',
        shortDescription: '',
        specification: '',
        categoryId: [], // Changed from '' to an empty array
        images: [],
        buyPrice: 0,
        sellPrice: 0,
        discount: 0,
        point: 0,
        isFeatured: false,
        tags: [],
        brand: null,
        modelNumber: null,
        visibility: 'published'
    };
    const [formData, setFormData] = useState(formInputs);

    useEffect(() => {
        if (productId) {
            getProductDetail(productId).then((res) => {
                const productDetail = res.data;
                console.log(productDetail);
                setFormData({
                    ...productDetail,
                    categoryId: productDetail.categories.map(cat => cat.id),
                   // images: productDetail.images.map(img => img.name),
                });

                setExistingImages(
                     productDetail.images.map(img => img),
                );

                setAddedProductAttributes(productDetail.productVariant || []);

                const hasSize = productDetail.productVariant.some(variant =>
                    variant.variantAttributes.some(attr => attr.attribute.name === 'Size')
                );
                const hasColor = productDetail.productVariant.some(variant =>
                    variant.variantAttributes.some(attr => attr.attribute.name === 'Color')
                );

                const hasWeight = productDetail.productVariant.some(variant =>
                    variant.variantAttributes.some(attr => attr.attribute.name === 'Weight')
                );

                setIsSize(hasSize);
                setIsColor(hasColor);
                setIsWeight(hasWeight);
            }).catch(error => console.log(error)).finally(setLoading(false));
        }
    }, []);

    useEffect(() => {
        Array.isArray(addedProductAttributes) && addedProductAttributes.length && addedProductAttributes.map(item=>item.type==="size")
    }, [addedProductAttributes]);

    useEffect(() => {
        getAllCategories().then((res) => { setCategories(res) }).catch(error => setError(error)).finally(setLoading(false));
        getAttributes().then((res) => { setAllAttributes(res) }).catch(error => setError(error)).finally(setLoading(false));
        getProductLabels().then((res) => { setAllProductLabels(res) }).catch(error => setError(error)).finally(setLoading(false));
        fetchAllocations().then((res) => { setLocations(res) }).catch(error => setError(error)).finally(setLoading(false));
        fetchAllProductBrand().then((res) => { setProductBrand(res)}).catch(error => setError(error)).finally(setLoading(false));
    }, []);

    const addSelectedAttributes = (newAttribute) => {
        setSelectedAttributes((prevState) => {
            const filtered = prevState.filter(item => item.attribute.name !== newAttribute.attribute.name);
            return [...filtered, { ...newAttribute }];
        });
    };

    const [serial,setSerial] = useState(0);

    const addSelectedProductAttribute = () => {
        if (selectedAttributes.length === 0) return;

        const hasSize = selectedAttributes.some(item => item.attribute.name === 'Size');
        const hasColor = selectedAttributes.some(item => item.attribute.name === 'Color');
        const hasWeight = selectedAttributes.some(item => item.attribute.name === 'Weight');

        if (isSize && !hasSize) {
            alert('Size Needs to Be Checked');
            return;
        }

        if (isColor && !hasColor) {
            alert('Color Needs to Be Checked');
            return;
        }

        if (isWeight && !hasWeight) {
            alert('Weight Needs to Be Checked');
            return;
        }

        if (attributeQuantity < 1 || attributeBuyPrice < 1 || attributeSellPrice < 1) {
            alert("All Fields Need to Be Filled Out");
            return;
        }

        const productAttributeMap =
            {
                id: serial,
                sku: attributeSku,
                model: formInputs.modelNumber,
                quantity: attributeQuantity,
                buyPrice: attributeBuyPrice,
                sellPrice: attributeSellPrice,
                productId: productId,
                variantAttributes: selectedAttributes.map((item, index) => {
                    return {
                        id: index + 1,  // Just assigning an incremental ID for each attribute
                        productVariantId: null,  // You can change this to dynamically match each product variant
                        attributeValueId: item.id,  // Assuming `[bannerId]` in selectedAttributes is the `attributeValueId`
                        attributeValue: {
                            id: item.id,
                            value: item.value,
                            codeNumber: item.codeNumber,
                            attributeId: item.attributeId,
                            attribute: {
                                id: item.attribute.id,
                                name: item.attribute.name
                            }
                        }
                    };
                })
            };

        setSerial(prevSerial => prevSerial + 1);
        setAddedProductAttributes((prevState) => {
            return [...prevState, {...productAttributeMap}];
        });

        setSelectedAttributes([]);
        setAttributeQuantity(null);
        setAttributeBuyPrice(null);
        setAttributeSellPrice(null);
        setAttributeSku(null);

        attributeQuantityInput.current.value = 0;
        attributeBuyPriceInput.current.value = 0;
        attributeSellPriceInput.current.value = 0;
        attributeSkuInput.current.value = 0;
    };

    const removeSelectedProductAttribute = (index) => {
        setAddedProductAttributes((prevState) => prevState.filter((_, idx) => idx !== index));
    };

    const handleChangeVisibility = (visibilty) =>{
        formInputs.visibility = visibilty;
    }

    const resetForm = () => {
        setFormData(formInputs);
        setFormDataPrime(null);
        setFormDataCity(null);
        setFormDataSubCity(null);
    };

    const handleChange = (e) => {
        const { name, value, files, checked, type } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: Array.from(files) });
        } else if (name === 'categoryId' && type === 'select-multiple') {
            const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
            setFormData({ ...formData, [name]: selectedCategories });
        } else if (name === 'isFeatured') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleChangeBrand = (e) =>{
        setSelectedBrand(e.target.value)
    }

    const handleAddLabels = (label) => {
        setProductLabels((prevLabels) => {
            if (!prevLabels.some(item => item.id === label.id)) {
                return [...prevLabels, label];
            }
            return prevLabels.filter((item) => item.id !== label.id);
        });
    };

    const filterVariantName = (variantAttributes, attributeType) =>{
        const sizeAttribute = variantAttributes.find(
            attr => attr.attributeValue.attribute.name === attributeType
        );
        return sizeAttribute ? sizeAttribute.attributeValue.codeNumber : 'N/A';
    }

    const handleRemoveImage = (index) => {
        setNewImages((prevState) => ({
            images: prevState.images.filter((_, i) => i !== index), // Filter out the image at the specified index
        }));
    };

    const handleRemoveExistingImage = (id) => {
        const filteredExistingImages = existingImages.filter((image) => image.id !== id);
        setExistingImages(filteredExistingImages);
    }

    // Handle image file input change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        const { name, value, checked, type } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, [name]: files });
        }

        const imagePreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Instead of pushing the whole imagePreviews array, push each individual image
                imagePreviews.push(reader.result);

                // Update the state with the new image previews
                setNewImages((prevState) => ({
                    images: [...prevState.images, reader.result],
                }));
            };

            reader.readAsDataURL(file); // Converts image file to Base64
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!existingImages.length && !formData.image.length) {
            alert('At least one image needs to be uploaded');
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('modelNumber', formData.modelNumber);
        form.append('shortDescription', formData.shortDescription);
        form.append('description', formData.description);
        form.append('specification', formData.specification);
        form.append('categoryId', formData.categoryId);
        form.append('buyPrice', formData.buyPrice);
        form.append('sellPrice', formData.sellPrice);
        form.append('discount', formData.discount || 0);
        form.append('point', formData.point || 0);
        form.append('isFeatured', formData.isFeatured || false);
        form.append('attributeProducts', JSON.stringify(addedProductAttributes));
        form.append('tags', formData.tags || '');
        form.append('visibility', formData.visibility);
        form.append('productLabels', JSON.stringify(productLabels));
        form.append('existingImages', JSON.stringify(existingImages));
        form.append('brandId', selectedBrand);

        if (locationEnabled) {
            form.append('locations', JSON.stringify({
                primary: formDataPrime,
                city: formDataCity,
                subcity: formDataSubCity
            }));
        }

        if (formData.image) {
            formData.image.forEach((file) => {
                form.append('image', file);
            });
        }

        try {
            const response = await fetch(`${config.apiBaseUrl}/admin/product/${productId ? 'edit-product/' + productId : 'add-product'}`, {
                method: productId ? 'PUT' : 'POST',
                body: form,
            });

            const data = await response.json();
            if (response.ok) {
                alert(productId ? 'Product updated successfully' : 'Product added successfully');
                resetForm();
                router.push('/admin/product/product-list'); // Redirect to the product list page
            } else {
                alert('Error occurred while saving the product');
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) return <div className="p-4">Fetching Data ...</div>;
    if (error) return <div className="p-4 text-red-500">Error Happened contact Admin</div>;

    return (
        <>
        <form onSubmit={handleSubmit} className=" mx-auto p-2   space-y-2">
            <div className="grid grid-cols-[1fr_3fr] gap-2 h-screen m-10">
                <aside>
                   <UiCard>

                       <div className="">
                           <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                           <input
                               type="text"
                               name="tags"
                               value={formData.tags}
                               onChange={handleChange}
                               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                           />
                       </div>

                       <div className="">
                           <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                           <input
                               type="text"
                               name="modelNumber"
                               value={formData.modelNumber}
                               onChange={handleChange}
                               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                           />
                       </div>

                       <div className="my-4">
                           <label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label>
                           <div className="flex ">
                               <div className="flex items-center">
                                   <input
                                       type="radio"
                                       name="visibility"
                                       value="published"
                                       onChange={(e)=>handleChangeVisibility(e.target.value)}
                                       className="w-4 h-4 px-2"
                                   /> <label className="block text-sm font-medium text-gray-700  px-2">Published</label>
                               </div>

                               <div className="flex items-center">
                                   <input
                                       type="radio"
                                       name="visibility"
                                       value="unlisted"
                                       onChange={(e)=>handleChangeVisibility(e.target.value)}
                                       className="w-4 h-4 px-2"
                                   /> <label className="block text-sm font-medium text-gray-700 px-2">Unlisted</label>
                               </div>
                           </div>
                       </div>

                        <div className="my-4">
                           <label className="block text-sm font-medium text-gray-700 mb-1">Labels</label>
                           <div className="">
                               {allProductLabels.map(label => (
                                   <div className="flex items-center gap-1" key={label.id}>
                                       <input
                                           type="checkbox"
                                           name="labels"
                                           onChange={(e) => handleAddLabels(label)}  // Pass the entire label object
                                           className="w-4 h-4 px-2"
                                       />
                                       <label className="block text-sm font-medium text-gray-700 px-2">{label.name}</label>
                                   </div>
                               ))}
                           </div>
                       </div>

                       <hr/>

                       <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1 text-center"> Brand </label>
                           <select
                               name="brand"
                               value={formData.brand}
                               onChange={handleChangeBrand}
                               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           >
                               <option  value="">
                                   Select Brand
                               </option>
                               {Array.isArray(productBrand) && productBrand.length && productBrand.map((brand) => (
                                   <option key={brand.id} value={brand.id}>
                                       {brand.name}
                                   </option>
                               ))}
                           </select>
                       </div>
                       <hr/>


                       <div className="my-4">
                           <div className="flex items-center gap-1">
                               <input
                                   type="checkbox"
                                   name="location"
                                   onChange={(e) => setLocationEnabled((prev)=>!prev)}
                                   className="w-4 h-4 px-2"
                               />
                               <span>Is Location</span>
                           </div>
                           {locationEnabled && (
                               <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1 text-center">Primary Location </label>
                                   <select
                                       name="primaryLocation"
                                       value={formDataPrime}
                                       onChange={handleChangePrime}
                                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                       <option  value="">
                                           Select Prime Location
                                       </option>
                                       {Array.isArray(allLocations) && allLocations.length && allLocations.filter(loc=>loc.level==='primary').map((location) => (
                                           <option key={location.id} value={location.id}>
                                               {location.name}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                           )}


                           {formDataPrime && (
                               <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1 text-center"> City  </label>
                                   <select
                                       name="city"
                                       value={formDataCity}
                                       onChange={handleChangeCity}
                                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                       <option  value="">
                                           Select City
                                       </option>
                                       {Array.isArray(allLocations) && allLocations.length && allLocations.filter(loc=>loc.parentId===parseInt(formDataPrime)).map((location) => (
                                           <option key={location.id} value={location.id}>
                                               {location.name}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                           )}

                           {formDataCity && (
                               <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1 text-center"> Sub City  </label>
                                   <select
                                       name="city"
                                       value={formDataSubCity}
                                       onChange={handleChangeSubCity}
                                       className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   >
                                       <option  value="">
                                           Select Sub City
                                       </option>
                                       {Array.isArray(allLocations) && allLocations.length && allLocations.filter(loc=>loc.parentId===parseInt(formDataCity)).map((location) => (
                                           <option key={location.id} value={location.id}>
                                               {location.name}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                           )}
                           

                       </div>

                   </UiCard>
                </aside>

                <main className="bg-white ">
                    <UiCard>
                        <div className="border-b border-gray-300 mb-4">
                            <label className="font-bold text-gray-600">Product Info:</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>


                        <div className="my-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                rows="4"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="my-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Detail Description</label>
                            <Editor     containerProps={{ style: { resize: 'vertical' } }}  name="description"  value={formData.description} onChange={handleChange} />
                        </div>

                        <div className="my-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Specification</label>
                            <Editor     containerProps={{ style: { resize: 'vertical' } }}  name="specification"  value={formData.specification} onChange={handleChange} />
                        </div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        multiple
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured Images</label>

                                    <div className="my-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Images</label>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            multiple

                                        />

                                        <div className="grid grid-cols-3 gap-1 mt-4">
                                            {
                                                existingImages && existingImages.length > 0 && existingImages.map((file, index) => (
                                                    <div key={index} className="relative flex justify-center items-center">
                                                        <Image
                                                            src={`${config.publicPath}/images/products/${file.name}`}
                                                            alt={`Product Image ${index + 1}`}
                                                            width={100}
                                                            height={100}
                                                            className="w-[60px] h-[60px] object-cover rounded-md"
                                                        />
                                                        <div
                                                            onClick={() => handleRemoveExistingImage(file.id)}
                                                            className="absolute top-0 right-0 p-1 bg-black text-white rounded-full"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <hr className="mt-2"/>
                                        {/* Display selected images with cross to remove */}
                                        <div className="grid grid-cols-3 gap-2 mt-4">
                                            {newImages.images.map((image, index) => (
                                                <div key={index} className="relative flex justify-center items-center">
                                                    <img
                                                        src={image} // Display the base64 image
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-[60px] h-[60px] object-cover rounded-md"
                                                    />
                                                    {/* Cross icon for removing the image */}
                                                    <div
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="absolute top-0 right-0 p-1 bg-black text-white rounded-full"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="border-b border-gray-300 mb-4">
                                <label className="font-bold text-gray-600">Default Price:</label>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price</label>
                                    <input
                                        type="number"
                                        name="buyPrice"
                                        value={formData.buyPrice}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">D.Sell Price</label>
                                    <input
                                        type="number"
                                        name="sellPrice"
                                        value={formData.sellPrice}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Point</label>
                                    <input
                                        type="number"
                                        name="point"
                                        value={formData.point}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 mx-4 my-10">

                            <div className="flex space-x-2 items-center">
                                <input
                                    type="checkbox"
                                    name="isWeight"
                                    checked={isWeight}
                                    onChange={() => setIsWeight(prev => !prev)} // Toggle the `isSize` state
                                    className="w-4 h-4"
                                />
                                <label className="block text-sm font-medium text-gray-700">Is Weight</label>
                            </div>

                            <div className="flex space-x-2 items-center">
                                <input
                                    type="checkbox"
                                    name="isSize"
                                    checked={isSize}
                                    onChange={() => setIsSize(prev => !prev)} // Toggle the `isSize` state
                                    className="w-4 h-4"
                                />
                                <label className="block text-sm font-medium text-gray-700">Is Size</label>
                            </div>

                            <div className="flex space-x-2 items-center">
                                <input
                                    type="checkbox"
                                    name="isColor"
                                    checked={isColor}
                                    onChange={() => setIsColor(prev => !prev)}
                                    className="w-4 h-4"
                                />
                                <label className="block text-sm font-medium text-gray-700">Is Color</label>
                            </div>

                            <div className="flex space-x-2 items-center text-right">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="w-4 h-4"
                                /> <label className="block text-sm font-medium text-gray-700 ">Featured</label>
                            </div>
                        </div>
                        { addedProductAttributes && addedProductAttributes.length > 0 &&(
                            <div className="mb-8">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th  className="px-1 py-1 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">Size</th>
                                        <th  className="px-1 py-1 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">Color</th>
                                        <th  className="px-1 py-1 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">Quantity</th>
                                        <th  className="px-1 py-1 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">B.Price</th>
                                        <th  className="px-1 py-1 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r">S.Price</th>
                                        <th  className="px-1 py-1  text-xs font-medium text-gray-700 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                        addedProductAttributes.map((product,index) => (
                                            <tr className="odd:bg-white even:bg-gray-50" key={index}>
                                                <td className="px-1 py-1 whitespace-nowrap border-r">{filterVariantName(product.variantAttributes, 'Size')}</td>
                                                <td className="px-1 py-1 whitespace-nowrap border-r">
                                                    <div
                                                        className="w-5 h-5 rounded"
                                                        style={{ backgroundColor: filterVariantName(product.variantAttributes, 'Color') }}
                                                    />
                                                </td>
                                                <td className="px-1 py-1 whitespace-nowrap border-r"> {product.quantity}</td>
                                                <td className="px-1 py-1 whitespace-nowrap border-r">{product.buyPrice}</td>
                                                <td className="px-1 py-1 whitespace-nowrap border-r">{product.sellPrice}</td>
                                                <td className="px-1 py-1 whitespace-nowrap text-center">
                                                    <TrashIcon className="w-5 h-5" onClick={()=>removeSelectedProductAttribute(index)}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            )
                        }

                        <div className="flex flex-col gap-1">
                            {(isColor || isSize || isWeight) && (
                                <>
                                    <div className="border-b border-gray-300 mb-4">
                                        <label className="font-bold text-gray-600">Attributes:</label>
                                    </div>

                                    <div className="flex flex-col space-y-6 mb-16">
                                        {isSize && (
                                            <ProductAttributes
                                                allAttributes={allAttributes}
                                                selectedAttributes={selectedAttributes}
                                                addClick={(att) => addSelectedAttributes(att)}
                                                attributeId={1}
                                            />
                                        )}

                                        {isWeight  && (
                                            <ProductAttributes allAttributes={allAttributes} selectedAttributes={selectedAttributes} addClick={(att) => addSelectedAttributes(att)} attributeId={3} />
                                        )}

                                        {isColor && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                                <div className="flex  space-y-1">
                                                    {allAttributes
                                                        .filter(item => item.attributeId === 2)
                                                        .map(attribute => {
                                                            const isSelected = selectedAttributes.some(
                                                                item => item.id === attribute.id
                                                            );

                                                            return (
                                                                <div
                                                                    key={attribute.id}
                                                                    onClick={() => addSelectedAttributes(attribute)}
                                                                    className={`flex p-1 border rounded-md cursor-pointer transition ${
                                                                        isSelected ? 'border-black' : 'border-transparent hover:border-gray-400'
                                                                    }`}
                                                                    title={attribute.value}
                                                                >
                                                                    <div
                                                                        className="w-5 h-5 rounded"
                                                                        style={{ backgroundColor: attribute.codeNumber }}
                                                                    />
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Sku</label>
                                                <input
                                                    ref={attributeSkuInput}
                                                    type="text"
                                                    name="sku"
                                                    onChange={(e) => setAttributeSku(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                                                <input
                                                    ref={attributeQuantityInput}
                                                    type="number"
                                                    name="attributeQuantity"
                                                    placeholder={0}
                                                    onChange={(e) => setAttributeQuantity(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price</label>
                                                <input
                                                    ref={attributeBuyPriceInput}
                                                    type="number"
                                                    name="attributeBuyPrice"
                                                    placeholder={0}
                                                    onChange={(e) => setAttributeBuyPrice(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Sell Price</label>
                                                <input
                                                    ref={attributeSellPriceInput}
                                                    type="number"
                                                    name="attributeSellPrice"
                                                    placeholder={0}
                                                    onChange={(e) => setAttributeSellPrice(e.target.value)}
                                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    className="p-2 bg-green-300 mt-6 rounded-md cursor-pointer"
                                                    onClick={addSelectedProductAttribute}
                                                >
                                                    Add
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end items-end space-y-8">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`py-3 px-4 rounded-lg transition ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {submitting ? 'Submitting...' : productId ? 'Update Product' : 'Add Product'}
                            </button>
                        </div>
                    </UiCard>
                </main>
            </div>
        </form>
        </>
    );
};

export default ProductAddEditForm;
