import React from 'react';
import BannerUploadForm from "@/components/admin/ecommerce/BannerUploadForm";


const BannerEdit = ({ params }) => {

    const {bannerId} = params;
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-3 gap-2 px-2">
                    <div className="col-span-1">
                        <BannerUploadForm  bannerId={bannerId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerEdit;
