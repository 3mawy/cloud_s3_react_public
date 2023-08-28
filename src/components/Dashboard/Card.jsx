import React from 'react';

const Card = ({Icon, text, num, secNum}) => {
    return (
        <div
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            {Icon &&
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                    <Icon/>
                </div>}
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {num}
                    </h4>
                    <span className="text-sm font-medium">{text}</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-meta-5">
                    {(secNum || secNum === 0) &&
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                {secNum}
                            </h4>

                            <span className="text-sm font-medium text-meta-3">Public</span>
                        </div>}
                </span>
            </div>
        </div>
    );
};

export default Card;