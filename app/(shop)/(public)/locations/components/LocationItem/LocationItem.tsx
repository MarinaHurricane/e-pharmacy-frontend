import { Location } from '@/app/types/location';
import css from './LocationItem.module.css';
import { Icon } from '@/app/components/Icon/Icon';
import { isStoreOpen } from '@/app/lib/services/storeOpenHours';
import Image from 'next/image';
import clsx from 'clsx';

interface LocationItemProps {
  location: Location;
}

export default function LocationItem({ location }: LocationItemProps) {
  const isStoreOpenNow = isStoreOpen(location.openTime, location.closeTime);

  return (
    <li className={css.locationItem}>
      <div className={css.titleWrapper}>
        <h2 className={css.locationName}>{location.name}</h2>

        <div className={css.ratingAndHoursWrapper}>
          <div className={css.ratingWrapper}>
            <Icon
              name="icon-stars"
              width={16}
              height={16}
              className={css.star}
            />
            <span className={css.rating}>{location.rating}</span>
          </div>

          <span className={clsx(isStoreOpenNow ? css.isOpen : css.isClosed) }>
            {isStoreOpenNow ? 'open' : 'closed'}
          </span>
        </div>
      </div>

      <div className={css.contacts}>
        <div className={css.addressWrapper}>
          <Icon name="icon-map-pin" width={18} height={18} />
          <p className={css.address}>{location.address}</p>
        </div>

        <div className={css.addressWrapper}>
          <Icon name="icon-phone" width={18} height={18} />
          <p className={css.address}>{location.phone}</p>
        </div>
      </div>

      <Image
        className={css.decoration}
        src="/images/decoration.svg"
        alt=""
        width={100}
        height={100}
      />
    </li>
  );
}
