"use client";

import React from "react";
import ColorSettingForm from "@/components/admin/ecommerce/ColorSettingForm";

const ColorSetting = () => {
    return (
        <div>
            <div className="flex-1 p-6">
                <div className="grid grid-cols-1 gap-2 px-2">
                    <h3>Color Setting</h3>
                    <div>
                        <ColorSettingForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorSetting;
