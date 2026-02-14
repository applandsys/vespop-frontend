import UiCard from "@/components/theme/common/UiCard";
import {getCategories} from "@/services/ecommerce/getCategories";
import Image from "next/image";
import config from "@/config";
import Link from "next/link";

export const SidebarCategory = ({categories}) => {

    return (
        <>
            <UiCard>
                <div className="py-4">
                    <h2 className="font-bold text-xl mb-2 ">Category</h2>
                    <div className="space-y-1 overflow-y-auto max-h-[200px] custom-scroll">
                        {categories?.length > 0 ? (
                            categories.map((item, idx) => (
                                <div  key={idx}>
                                    <Link href={`/category/${item.slug}`}>
                                        <div className="flex justify-between items-center hover:border-[#3bb77e] hover:bg-[#f1fcf7] py-[2px]">
                                            <div className="flex items-center space-x-2 ">
                                                <Image
                                                    src={`${config.publicPath}/icons/categories/icons/${item.icon}`}
                                                    alt="..."
                                                    width={50}
                                                    height={50}
                                                    key={item.id}
                                                    className="w-6 h-6 rounded"
                                                />
                                                <span className="text-sm">{item.name} ({item._count.products})</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <span className="col-span-2 text-gray-400">No categories found.</span>
                        )}
                    </div>
                </div>
            </UiCard>
        </>
    );
};

export default SidebarCategory;