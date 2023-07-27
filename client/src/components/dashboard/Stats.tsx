import { Card, Statistic } from 'antd';
import React from 'react';
import { Area, Tooltip } from '@ant-design/charts';
import { useOutletContext } from 'react-router-dom';

const data = [
  { month: 'Jul 2022', count: 1 },
  { month: 'Aug 2022', count: 4 },
  { month: 'Sep 2022', count: 3 },
  { month: 'Oct 2022', count: 2 },
  { month: 'Nov 2022', count: 2 },
  { month: 'Dec 2022', count: 5 },
];

type ContextType = {
  stats: { postsCount: number, categoriesCount: number, usersCount: number }
};

const Stats: React.FC = () => {
  const { stats: { postsCount, categoriesCount, usersCount } } = useOutletContext<ContextType>();

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
      formatter: (formatterData) => ({
        name: '',
        value: formatterData?.count,
      }),
      customContent: (_name, contentData) => `<div>${contentData?.map((item) => `<div class="tooltip-chart" >
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
      <Card className="stat-card">
        <Statistic title="Total Users" value={usersCount} />
        <Statistic title="Active Users" value={Math.ceil(usersCount * 0.95)} />
        <Statistic title="New Users" value={Math.ceil(usersCount * 0.15)} />
        <Statistic title="Total Posts" value={postsCount} />
        <Statistic title="Number of Categories" value={categoriesCount} />
      </Card>
      <h2 className="text">Monthly Applications</h2>
      <h3 className="text">Area Chart</h3>
      <Area {...config} className="stat-chart" color="#f37f29" />
    </>
  );
};

export default Stats;
