// components/ecommerce/widgets/FilterSearch.jsx
"use client";

import React, { memo, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UiCard from "@/components/theme/common/UiCard";
import { Slider } from "@mui/material";
import { fetchAllocations } from "@/services/ecommerce/fetchLocations";
import { getAttributes } from "@/services/ecommerce/getAttributes";
import { fetchAllProductBrand } from "@/services/ecommerce/ProductBrand";

const FilterSearch = ({ highestPriceProduct = 0, lowestPriceProduct = 0 }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchString,setSearchString] = useState(null);

    const [value, setValue] = useState(highestPriceProduct || 0);
    const [locations, setLocations] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [brands, setBrands] = useState([]);

    const [selectedPrimaryLocation, setSelectedPrimaryLocation] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedSubCity, setSelectedSubCity] = useState(null);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState([]);

    // Initialize from services
    useEffect(() => {
        fetchAllocations()
            .then((res) => setLocations(res))
            .catch((err) => console.log(err));
        getAttributes()
            .then((res) => setAttributes(res))
            .catch((err) => console.log("Attribute load error", err));
        fetchAllProductBrand()
            .then((res) => setBrands(res))
            .catch((err) => console.log("brand load error", err));
    }, []);

    // Initialize slider and selections from URL (if present)
    useEffect(() => {
        const maxFromQuery = Number(searchParams.get("maxPrice"));
        if (Number.isFinite(maxFromQuery)) {
            setValue(maxFromQuery);
        } else {
            setValue(highestPriceProduct || 0);
        }

        const search = searchParams.get("search");
        setSearchString(search);
        const sb = searchParams.get("selectedBrands");
        const sc = searchParams.get("selectedColors");
        const ss = searchParams.get("selectedSizes");
        const sw = searchParams.get("selectedWeight");
        const locId = searchParams.get("locationId");

        try {
            if (search) setSearchString(JSON.parse(search));
            if (sb) setSelectedBrands(JSON.parse(sb));
            if (sc) setSelectedColors(JSON.parse(sc));
            if (ss) setSelectedSizes(JSON.parse(ss));
            if (sw) setSelectedWeight(JSON.parse(sw));
        } catch (e) {
            // ignore malformed
        }

        // if (locId) {
        //     // We only store the last level [bannerId] in the URL.
        //     // You might want to reconstruct the chain if your UI needs it.
        //     setSelectedPrimaryLocation(locId); // optional
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, highestPriceProduct]);

    const handleClickBrand = (brandId) => {
        setSelectedBrands((prev) =>
            prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]
        );
    };

    const handleClickColor = (colorId) => {
        setSelectedColors((prev) =>
            prev.includes(colorId) ? prev.filter((id) => id !== colorId) : [...prev, colorId]
        );
    };

    const handleClickSize = (sizeId) => {
        setSelectedSizes((prev) =>
            prev.includes(sizeId) ? prev.filter((id) => id !== sizeId) : [...prev, sizeId]
        );
    };

    const handleClickWeight = (weightId) => {
        setSelectedWeight((prev) =>
            prev.includes(weightId) ? prev.filter((id) => id !== weightId) : [...prev, weightId]
        );
    };

    const handleChange = (_event, newValue) => {
        setValue(Number(newValue));
    };

    const normalizeId = (v) => {
        if (!v || v === "") return null;
        const n = Number(v);
        return Number.isNaN(n) ? null : n;
    };

    const getLastLocationId = () =>
        normalizeId(selectedSubCity) ??
        normalizeId(selectedCity) ??
        normalizeId(selectedPrimaryLocation);

    const handleFilterSubmit = () => {
        const locationId = getLastLocationId();
        const params = new URLSearchParams(searchParams.toString());

        params.set("maxPrice", String(value));

        if (locationId) {
            params.set("locationId", String(locationId));
        } else {
            params.delete("locationId");
        }

        if (selectedBrands.length > 0) {
            params.set("selectedBrands", JSON.stringify(selectedBrands));
        } else {
            params.delete("selectedBrands");
        }

        if (selectedColors.length > 0) {
            params.set("selectedColors", JSON.stringify(selectedColors));
        } else {
            params.delete("selectedColors");
        }

        if (selectedSizes.length > 0) {
            params.set("selectedSizes", JSON.stringify(selectedSizes));
        } else {
            params.delete("selectedSizes");
        }

        if(searchString!==null){
            params.set("search", JSON.stringify(searchString));
        }else{
            params.delete("search");
        }

        if (selectedWeight.length > 0) {
            params.set("selectedWeight", JSON.stringify(selectedWeight));
        } else {
            params.delete("selectedWeight");
        }

        router.push(`?${params.toString()}`);
    };

    // keep bounds safe
    const min = Number.isFinite(lowestPriceProduct) ? lowestPriceProduct : 0;
    const max = Number.isFinite(highestPriceProduct) ? highestPriceProduct : 0;
    const sliderMin = Math.min(min, max);
    const sliderMax = Math.max(min, max);

    return (
        <UiCard className="my-4">
            {/* Price Filter */}
            <div className="mb-6">
                <label className="text-lg font-semibold">Filter by price</label>
                <Slider
                    value={Math.min(Math.max(value, sliderMin), sliderMax)}
                    valueLabelDisplay="auto"
                    min={sliderMin}
                    max={sliderMax}
                    onChange={handleChange}
                    disabled={sliderMax === sliderMin} // if only one price
                />
                <div className="flex justify-between text-sm mt-1">
                    <span>৳{sliderMin}</span>
                    <span>৳{sliderMax}</span>
                </div>
            </div>

            {/* Brands */}
            <div className="w-full my-4">
                <label className="text-lg font-semibold">Brands</label>
                <div className="flex flex-wrap gap-1">
                    {brands?.length > 0 ? (
                        brands.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                className={`flex items-center border p-1 rounded-md h-7 transition ${
                                    selectedBrands.includes(item.id)
                                        ? "border-2 border-blue-500 bg-blue-100"
                                        : "border-amber-300"
                                }`}
                                onClick={() => handleClickBrand(item.id)}
                            >
                                <span className="text-sm">{item.name}</span>
                            </button>
                        ))
                    ) : (
                        <span className="col-span-2 text-gray-400">No Brand found.</span>
                    )}
                </div>
            </div>

            {/* Colors */}
            <div className="w-full my-4">
                <label className="text-lg font-semibold">Colors</label>
                <div className="flex gap-2 flex-wrap">
                    {attributes?.length > 0 &&
                        attributes
                            .filter((attr) => attr.attribute?.name === "Color")
                            .map((color) => (
                                <button
                                    type="button"
                                    key={color.id}
                                    className={`w-6 h-6 rounded border transition ${
                                        selectedColors.includes(color.id)
                                            ? "border-2 border-gray-500"
                                            : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color.codeNumber }}
                                    title={color.codeNumber}
                                    onClick={() => handleClickColor(color.id)}
                                />
                            ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="w-full my-4">
                <label className="text-lg font-semibold">Sizes</label>
                <div className="flex gap-2 flex-wrap">
                    {attributes?.length > 0 &&
                        attributes
                            .filter((attr) => attr.attribute?.name === "Size")
                            .map((size) => (
                                <button
                                    type="button"
                                    key={size.id}
                                    className={`px-3 py-1 border rounded transition ${
                                        selectedSizes.includes(size.id)
                                            ? "border-2 border-gray-500 bg-blue-100"
                                            : "border-gray-300"
                                    }`}
                                    onClick={() => handleClickSize(size.id)}
                                >
                                    {size.codeNumber}
                                </button>
                            ))}
                </div>
            </div>

            {/* Weight */}
            <div className="w-full my-4">
                <label className="text-lg font-semibold">Weight</label>
                <div className="flex gap-2 flex-wrap">
                    {attributes?.length > 0 &&
                        attributes
                            .filter((attr) => attr.attribute?.name === "Weight")
                            .map((weight) => (
                                <button
                                    type="button"
                                    key={weight.id}
                                    className={`px-3 py-1 border rounded transition ${
                                        selectedWeight.includes(weight.id)
                                            ? "border-2 border-blue-500 bg-blue-100"
                                            : "border-gray-300"
                                    }`}
                                    onClick={() => handleClickWeight(weight.id)}
                                >
                                    {weight.codeNumber}
                                </button>
                            ))}
                </div>
            </div>

            {/* Location */}
            <div className="mb-6">
                <label className="text-lg font-semibold">Location</label>

                {/* Primary Location */}
                <select
                    className="w-full border rounded-lg px-3 py-2"
                    onChange={(e) => {
                        setSelectedPrimaryLocation(e.target.value || null);
                        setSelectedCity(null);
                        setSelectedSubCity(null);
                    }}
                    value={selectedPrimaryLocation ?? ""}
                >
                    <option value="">Select Location</option>
                    {locations
                        .filter((loc) => loc.level === "primary")
                        .map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                </select>

                {/* City */}
                {selectedPrimaryLocation && (
                    <select
                        className="w-full border rounded-lg px-3 py-2 mt-2"
                        onChange={(e) => {
                            setSelectedCity(e.target.value || null);
                            setSelectedSubCity(null);
                        }}
                        value={selectedCity ?? ""}
                    >
                        <option value="">Select City</option>
                        {locations
                            .filter((loc) => loc.parentId === Number(selectedPrimaryLocation))
                            .map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                    </select>
                )}

                {/* Sub City */}
                {selectedCity && (
                    <select
                        className="w-full border rounded-lg px-3 py-2 mt-2"
                        onChange={(e) => setSelectedSubCity(e.target.value || null)}
                        value={selectedSubCity ?? ""}
                    >
                        <option value="">Select Sub City</option>
                        {locations
                            .filter((loc) => loc.parentId === Number(selectedCity))
                            .map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                    </select>
                )}
            </div>

            {/* Button - client-side update */}
            <button
                type="button"
                onClick={handleFilterSubmit}
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
                Filter
            </button>
        </UiCard>
    );
};

export default memo(FilterSearch);
