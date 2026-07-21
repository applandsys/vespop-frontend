import API from "@/utils/axiosCreate";

export const getShippingCosts = () =>
    API.get("/admin/setting/shipping/cost");

export const getShippingCostById = (id) =>
    API.get(`/admin/setting/shipping/cost/${id}`);

export const createShippingCost = (data) =>
    API.post("/admin/setting/shipping/cost", data);

export const updateShippingCost = (id, data) =>
    API.put(`/admin/setting/shipping/cost/${id}`, data);