import React from 'react';

const Loader = () => {
    return (
        <div className="mx-auto flex justify-center items-center ">
            <div class="loader border-t-2 rounded-full border-gray-500 bg-transparent animate-spin
aspect-square w-12 flex justify-center items-center text-yellow-700"></div>
        </div>
    );
};

export default Loader;