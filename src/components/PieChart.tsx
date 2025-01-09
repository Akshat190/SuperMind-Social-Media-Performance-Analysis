import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const data = {
        labels: ['Stories', 'Reels', 'Static Images', 'Carousel'],
        datasets: [
            {
                label: 'Engagement Distribution',
                data: [27.85, 26.65, 23.32, 22.16],
                backgroundColor: [
                    'rgba(236, 72, 153, 0.85)' as string,
                    'rgba(79, 70, 229, 0.85)' as string,
                    'rgba(20, 184, 166, 0.85)' as string,
                    'rgba(245, 158, 11, 0.85)' as string,
                ],
                borderColor: [
                    'rgba(236, 72, 153, 0.1)' as string,
                    'rgba(79, 70, 229, 0.1)' as string,
                    'rgba(20, 184, 166, 0.1)' as string,
                    'rgba(245, 158, 11, 0.1)' as string,
                ],
                borderWidth: 2,
                hoverOffset: 18,
                hoverBorderWidth: 0,
                offset: 8,  // Separate segments slightly
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                position: 'right' as const,
                align: 'center' as const,
                labels: {
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                    font: {
                        family: "'Inter', sans-serif",
                        size: 11,
                        // weight: 600,
                    },
                    color: '#4B5563' as string,
                    generateLabels: (chart: ChartJS) => {
                        const datasets = chart.data.datasets;
                        const labels = chart.data.labels as string[];
                    
                        // Ensure backgroundColor is an array, otherwise fallback to an empty array
                        const backgroundColor = Array.isArray(datasets[0].backgroundColor)
                            ? datasets[0].backgroundColor
                            : [];
                    
                        return labels.map((label: string, index: number) => ({
                            text: `${label} (${datasets[0].data[index]}%)`,
                            fillStyle: backgroundColor[index] || 'transparent', // Use the color or fallback to 'transparent'
                            hidden: false,
                            index: index,
                        }));
                    },
                },
            },
            title: {
                display: true,
                text: ['Content Distribution', 'Engagement Analysis'],
                font: {
                    family: "'Inter', sans-serif",
                    size: 14,
                    // weight: 600,
                },
                color: '#1F2937' as string,
                padding: { top: 10, bottom: 20 },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 20,
                top: 20,
                bottom: 10
            }
        },
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 1200,
            easing: 'easeInOutQuart',  // Use a valid easing function
        },
        elements: {
            arc: {
                borderRadius: 6,  // Rounded corners on segments
            }
        },
    };

    return (
        <div className="w-full h-96 p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl 
                        shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="h-full flex items-center justify-center">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
