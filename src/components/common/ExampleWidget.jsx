"use client";

import React, {useEffect, useState} from 'react';
import {getWidgetBySlug} from "@/services/widget/WidgetService";

const ExampleWidget = () => {

    const [widget, setWidget] = useState(null);

    useEffect(() => {
        getWidgetBySlug('sdf').then(data => {
            setWidget(data);
        })
    }, []);

    return (
        <div>
            {JSON.stringify(widget)}
        </div>
    );
};

export default ExampleWidget;