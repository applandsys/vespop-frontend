import React from 'react';

const ProductAttributes = ({allAttributes,selectedAttributes,addClick,attributeId}) => {
    return (
        <div>
            <div className="flex space-x-2">
                {allAttributes
                    .filter(item => item.attributeId === attributeId)
                    .map(attribute => {
                        const isSelected = selectedAttributes.some(
                            item => item.id === attribute.id
                        );

                        return (
                            <div
                                key={attribute.id}
                                onClick={() => addClick(attribute)}
                                className={`flex  min-w-[40px] p-1 rounded-md items-center justify-center text-center cursor-pointer transition ${
                                    isSelected ? 'bg-amber-600 text-white' : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                            >
                                {attribute.codeNumber}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ProductAttributes;