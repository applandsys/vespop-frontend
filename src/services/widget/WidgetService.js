import API from "@/utils/axiosCreate";

export const getWidget = () =>
    API.get("/widgets");

export const getWidgetById = (id) =>
    API.get(`/widgets/${id}`);

export const getWidgetBySlug = (slug) =>
    API.get(`/widgets/slug/${slug}`);

export const createWidget = (data) =>
    API.post("/widgets", data);

export const updateWidget = (id, data) =>
    API.put(`/widgets/${id}`, data);