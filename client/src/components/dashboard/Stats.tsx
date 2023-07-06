import { Card, Statistic } from 'antd';
import React from 'react';
import { Area, Tooltip } from '@ant-design/charts';

const Stats: React.FC = () => {
  const data = [
    { year: '2012', value: 4 },
    { year: '2013', value: 3.5 },
    { year: '2014', value: 5 },
    { year: '2015', value: 4.9 },
    { year: '2016', value: 6 },
    { year: '2018', value: 7 },
    { year: '2020', value: 9 },
    { year: '2022', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    tooltip: {
      formatter: (data: any) => ({
        name: '',
        value: data?.value,
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
      <Area {...config} />
      <Card style={{ width: '80%', textAlign: 'center', margin: 'auto' }}>
        <Statistic title="Total Users" value={1000} />
        <Statistic title="Active Users" value={800} />
        <Statistic title="New Users" value={200} />
        <Statistic title="Revenue" value={10000} prefix="$" />
        <Statistic title="Conversion Rate" value={0.75} precision={2} />
        <Statistic title="Average Rating" value={4.5} />
        <Statistic title="Adoption Orders" value={500} />
      </Card>
    </>
  );
};

export default Stats;
