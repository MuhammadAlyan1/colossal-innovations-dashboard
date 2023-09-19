import React from 'react';

const OverviewCard = ({
  icon,
  name,
  value,
}: {
  icon: any;
  name: string;
  value: number;
}) => {
  return (
    <div className="overview-card">
      <div className="overview-card__icon-container">
        <img src={icon} className="overview-card__icon" />
      </div>
      <p className="overview-card__name">{name}</p>
      <p className="overview-card__value">{value}</p>
    </div>
  );
};

export default OverviewCard;
