import React, {useState} from 'react';
import config from "@/config";
import TextInput from "@/components/ui/TextInput";

const CourierDeliveryForm = ({courierList, orderId,setCourierOrder}) => {

    const [loading, setLoading] = useState(false);


    const [formData,setFormData] =  useState({
            orderId: orderId,
            courierId: "",
            note: "",
            cod_amount: 0,
            address: "",
            city_id: "",
            zone_id: "",
            area_id: "",
        }
    );

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`${config.apiBaseUrl}/admin/order/send-courier`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...formData
            })
        }).then(res => res.json()).then(data => setCourierOrder(data)).catch(err => console.log(err));
        setLoading(false);
        alert("Parcel Sent Successfully 🚚");
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Select Courier
                    </label>
                    <select
                        value={formData.courierId}
                        name="courierId"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        {
                            courierList.map((courier) => (
                                <option value={courier.id} key={courier.id}>{courier.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        COD Amount (Cost of Delivery)
                    </label>
                    <TextInput placeholder="Enter COD Amount" name="cod_amount"
                               value={formData.cod_amount} required={true}
                               onChange={handleChange}/>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Note
                    </label>
                    <textarea
                        value={formData.note}
                        name="note"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        placeholder="Optional note for courier"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Select City
                    </label>
                    <select
                        value={formData.city_id}
                        name="city_id"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        {
                            courierList.map((courier) => (
                                <option value={courier.id} key={courier.id}>{courier.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Select Zone
                    </label>
                    <select
                        value={formData.zone_id}
                        name="zone_id"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        {
                            courierList.map((courier) => (
                                <option value={courier.id} key={courier.id}>{courier.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Select Area
                    </label>
                    <select
                        value={formData.area_id}
                        name="area_id"
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    >
                        {
                            courierList.map((courier) => (
                                <option value={courier.id} key={courier.id}>{courier.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-end bg-green-600 text-white p-2 rounded"
                >
                    {loading ? "Creating..." : "Create Courier Order"}
                </button>
            </form>
        </div>
    );
};

export default CourierDeliveryForm;