import { Card, Statistic } from 'antd';
import React from 'react';
import { Area, Tooltip } from '@ant-design/charts';

const Stats: React.FC = () => {
  const data = [
    { month: 'Jul 2022', count: 1 },
    { month: 'Aug 2022', count: 4 },
    { month: 'Sep 2022', count: 3 },
    { month: 'Oct 2022', count: 2 },
    { month: 'Nov 2022', count: 2 },
    { month: 'Dec 2022', count: 5 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'month',
    yField: 'count',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (data: any) => ({
        name: '',
        value: data?.count,
      }),
      customContent: (name: any, data: any) => `<div>${data?.map((item: any) => `<div class="tooltip-chart" >
              <span class="tooltip-item-name">${item?.name}</span>
              <span class="tooltip-item-value">${item?.value}</span>
            </div>`)}</div>`,
      showMarkers: true,
      showContent: true,
      position: 'right',
      showCrosshairs: true,
    } as Tooltip,
  };
  return (
    <>
      <Card style={{ width: '80%', textAlign: 'center', margin: 'auto' }}>
        <Statistic title="Total Users" value={1000} />
        <Statistic title="Active Users" value={800} />
        <Statistic title="New Users" value={200} />
        <Statistic title="Adoption Orders" value={500} />
      </Card>
      <h2 className="text">Monthly Applications</h2>
      <h3 className="text">Area Chart</h3>
      <Area {...config} />
    </>
  );
};

export default Stats;
