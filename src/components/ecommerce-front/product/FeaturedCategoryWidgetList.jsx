"use client";

import React, {useEffect, useState} from 'react';;
import FeaturedCategoryWidget from "../widgets/FeaturedCategoryWidget";
import {getWidgetBySlug} from "@/services/widget/WidgetService";

const FeaturedCategoryWidgetList = () => {

    const [widgets, setWidgets] = useState([]);

    useEffect(() => {
        getWidgetBySlug('feat-cat').then(res=>setWidgets(res.data.data)).catch(console.error);
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1200px]">
            {
                widgets.length && widgets.map(widget => (
                        <>
                            <div className="text-white p-3  text-center">
                                <FeaturedCategoryWidget widget={widget} key={widget.id} />
                            </div>
                        </>
                    )
                )
            }
        </div>
    );
};

export default FeaturedCategoryWidgetList;