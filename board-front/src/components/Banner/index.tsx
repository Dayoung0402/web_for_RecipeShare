import React, { useState } from 'react';
import './style.css';
import structureImage from '../../assets/images/Structure.png';

interface BannerProps {
    data?: {
        title: string;
        question: string;
        options: string[];
        initialPercentages: number[];
    };
}

export default function Banner({ data = { title: '', question: '', options: [], initialPercentages: [0, 0] } }: BannerProps) {
    const { title, question, options } = data;
    const [percentages, setPercentages] = useState([0, 0]);
    const [showPercentage, setShowPercentage] = useState([false, false]);
    const [activeButton, setActiveButton] = useState<number | null>(null);

    const handleClick = (index: number) => {
        // 고정된 값 설정
        const fixedPercentages = index === 0 ? [42, 58] : [42, 58]; // 1번 버튼과 2번 버튼의 퍼센트 값
        setPercentages(fixedPercentages);

        const newShowPercentage = [false, false];
        newShowPercentage[index] = true;
        setShowPercentage(newShowPercentage);
        setActiveButton(index); // 활성화된 버튼 업데이트
    };

    return (
        <div className='banner-container'>
            <div className='banner-under-box'>
                <div className='banner-top-box' style={{ backgroundImage: `url(${structureImage})` }}>
                    <div className='banner-title-box'>
                        <div className='banner-title'>{title}</div>
                    </div>
                    <div className='banner-content-box'>
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="curved-background"
                        >
                            <defs>
                                <filter id="inset-shadow">
                                    <feComponentTransfer in="SourceAlpha">
                                        <feFuncA type="table" tableValues="1 0" />
                                    </feComponentTransfer>
                                    <feGaussianBlur stdDeviation="15" />
                                    <feGaussianBlur stdDeviation="5" />
                                    <feOffset dx="-10" dy="-10" result="offsetblur" />
                                    <feFlood floodColor="#C5B8AB" result="color" />
                                    <feComposite in2="offsetblur" operator="in" />
                                    <feComposite in2="SourceAlpha" operator="in" />
                                    <feMerge>
                                        <feMergeNode in="SourceGraphic" />
                                        <feMergeNode />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path
                                d="M0,0 H100 Q90,50 100,100 H0 Q10,50 0,0 Z"
                                fill="#FFFFFF"
                            />
                        </svg>
                        <div className='content-wrapper'>
                            <div className='banner-content-title' style={{ fontSize: '29px', color: '#3E2E22', marginBottom: '11px', fontStyle: 'bold' }}>{question}</div>
                            <div className='banner-content' style={{ fontSize: '19px', color: '#000', marginBottom: '15px' }}>
                                {options[0]} {'\u00A0\u00A0'} {options[1]}
                            </div>
                            <div className='buttons'>
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className='button'
                                        onClick={() => handleClick(index)}
                                    >
                                        <span className={showPercentage[index] ? "active" : ""}>
                                            {showPercentage[index] ? `${percentages[index]}%` : `${index + 1}번`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
