import { Icon } from '@/app/components/Icon/Icon';
import css from './BenefitssTicker.module.css';

const benefits = [
  'Free Next-Day Delivery',
  'Quality You Can Trust',
  'Secure & Easy Checkout',
  'Carefully Selected Products',
  '30-Day Easy Returns',
];

export const BenefitsTicker = () => {
  return (
    <div className={css.ticker}>
      <div className={css.track}>
        {[...benefits, ...benefits].map((item, index) => (
          <div className={css.benefit}  key={index}>
            <Icon name='icon-lightning' width={20} height={20} className={css.icon}/>
             <span className={css.item}>
            {item}
          </span>
          </div>
        ))}
      </div>
    </div>
  );
};