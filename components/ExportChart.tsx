import React, { useMemo, useState } from 'react';
import { Group } from '@visx/group';
import { BarGroup } from '@visx/shape';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { ExportCategory } from '@/lib/types';
import { formatExportValue } from '@/lib/data';

interface ExportChartProps {
  exportCategories: ExportCategory[];
  width: number;
  height: number;
}

interface TooltipData {
  name: string;
  x: number;
  y: number;
}

export default function ExportChart({ exportCategories, width, height }: ExportChartProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  
  // Sort export categories by value (descending)
  const sortedCategories = [...exportCategories].sort((a, b) => b.value - a.value);
  
  // Determine if we're on a small screen
  const isSmallScreen = width < 500;
  const isTinyScreen = width < 360;
  
  // Dimensions - adjust margins for smaller screens
  const margin = useMemo(() => ({
    top: 20,
    right: isTinyScreen ? 5 : (isSmallScreen ? 10 : 20),
    bottom: 60,
    left: isTinyScreen ? 25 : (isSmallScreen ? 40 : 80)
  }), [isSmallScreen, isTinyScreen]);
  
  // Ensure innerWidth is positive to prevent negative SVG dimensions
  const safeWidth = Math.max(width, margin.left + margin.right + 100);
  const innerWidth = safeWidth - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const categoryScale = scaleBand<string>({
    domain: sortedCategories.map(c => c.name),
    range: [0, innerWidth],
    padding: isTinyScreen ? 0.1 : (isSmallScreen ? 0.15 : 0.2),
  });

  const valueScale = scaleLinear<number>({
    domain: [0, Math.max(...sortedCategories.map(c => c.percentage)) * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: sortedCategories.map(c => c.name),
    range: ['#4299E1', '#38B2AC', '#48BB78', '#F6AD55', '#F56565'],
  });

  // Number of ticks based on screen size
  const numYTicks = isTinyScreen ? 3 : (isSmallScreen ? 5 : 10);
  
  // Handle click/touch anywhere to close tooltip
  const handleSvgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setTooltip(null);
    }
  };
  
  // Hide tooltip when mouse leaves the SVG
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <svg 
        width="100%" 
        height={height}
        viewBox={`0 0 ${safeWidth} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        onClick={handleSvgClick}
        onMouseLeave={handleMouseLeave}
      >
        <Group left={margin.left} top={margin.top}>
          {/* Y-axis */}
          <AxisLeft 
            scale={valueScale} 
            label="% of Total Exports"
            labelOffset={isTinyScreen ? 15 : (isSmallScreen ? 25 : 50)}
            tickFormat={(value) => `${value}%`}
            numTicks={numYTicks}
            tickLabelProps={() => ({
              fontSize: isTinyScreen ? 7 : (isSmallScreen ? 8 : 10),
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
          
          {/* X-axis */}
          <AxisBottom 
            top={innerHeight} 
            scale={categoryScale} 
            label={isTinyScreen ? "" : "Export Categories"}
            labelOffset={50}
            tickLabelProps={() => ({
              fontSize: 0, // Hide the default tick labels
              textAnchor: 'middle',
            })}
            hideAxisLine={isSmallScreen}
          />
          
          {/* Bars */}
          {sortedCategories.map((category) => {
            const barWidth = categoryScale.bandwidth();
            const barHeight = innerHeight - valueScale(category.percentage);
            const x = categoryScale(category.name) || 0;
            const y = innerHeight - barHeight;
            
            return (
              <Group key={category.name}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={colorScale(category.name)}
                  rx={4}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    if (svgRect) {
                      setTooltip({
                        name: category.name,
                        x: x + barWidth / 2 + margin.left,
                        y: y + margin.top - 10
                      });
                    }
                  }}
                  onMouseEnter={(e) => {
                    const svgRect = e.currentTarget.ownerSVGElement?.getBoundingClientRect();
                    if (svgRect) {
                      setTooltip({
                        name: category.name,
                        x: x + barWidth / 2 + margin.left,
                        y: y + margin.top - 10
                      });
                    }
                  }}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize={isTinyScreen ? 7 : (isSmallScreen ? 9 : 12)}
                  fill="#666"
                >
                  {category.percentage.toFixed(1)}%
                </text>
                {/* Export name labels below bars, non-rotated */}
                <text
                  x={x + barWidth / 2}
                  y={innerHeight + 20}
                  textAnchor="middle"
                  fontSize={isTinyScreen ? 6 : (isSmallScreen ? 8 : 10)}
                  fill="#666"
                  width={barWidth}
                >
                  {isTinyScreen
                    ? (category.name.length > 6 ? category.name.substring(0, 6) + '...' : category.name)
                    : isSmallScreen 
                      ? (category.name.length > 8 ? category.name.substring(0, 8) + '...' : category.name)
                      : (category.name.length > 15 ? category.name.substring(0, 15) + '...' : category.name)
                  }
                </text>
              </Group>
            );
          })}
        </Group>
      </svg>
      
      {/* Tooltip */}
      {tooltip && (
        <div 
          className="absolute bg-white px-3 py-2 rounded-lg shadow-md text-sm border border-gray-200 z-10 transform -translate-x-1/2"
          style={{ 
            left: tooltip.x, 
            top: tooltip.y, 
            maxWidth: '200px',
            pointerEvents: 'none'
          }}
        >
          <div className="font-medium text-center">{tooltip.name}</div>
          <div className="tooltip-arrow absolute bottom-0 left-1/2 w-2 h-2 bg-white transform translate-y-1/2 rotate-45 -translate-x-1/2 border-r border-b border-gray-200"></div>
        </div>
      )}
    </div>
  );
} 