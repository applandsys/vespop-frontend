"use client";

import Image from "next/image";
import {getImageUrl} from "@/utils/R2Resolver";
import Link from 'next/link';

const FeaturedCategoryWidget = ({widget}) => {
    return (
        <div className="relative w-full  overflow-hidden  group cursor-pointer">
                <Image
                    src={getImageUrl(widget.image)}
                    alt="Panjabi Category"
                    width={600}
                    height={400}
                    className="
                              w-full h-full object-cover
                              transform transition-transform duration-500 ease-out
                              group-hover:scale-95
                            "
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-sm  font-semibold tracking-wide hover:underline">
                        {widget.title}
                    </h2>
                </div>
        </div>
    );
};

export default FeaturedCategoryWidget;