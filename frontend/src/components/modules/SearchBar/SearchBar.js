import styles from "./SearchBar.module.css";
import { DatePicker } from "zaman";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomSelect from "@/components/common/CustomSelect/CustomSelect";
import Image from "next/image";

const SearchBar = ({ onSearch, tours }) => {
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const origins = Array.from(new Set(tours?.map((t) => t.origin.name)));
  const destinations = Array.from(
    new Set(tours.map((t) => t.destination.name))
  );

  const applyFilter = (originVal, destinationVal, rangeVal) => {
    const filtered = tours.filter((tour) => {
      const matchOrigin = originVal ? tour.origin.name === originVal : true;
      const matchDestination = destinationVal
        ? tour.destination.name === destinationVal
        : true;

      const tourStart = new Date(tour.startDate);
      const tourEnd = new Date(tour.endDate);

      let matchDate = true;
      if (rangeVal.from && rangeVal.to) {
        const start = new Date(rangeVal.from);
        const end = new Date(rangeVal.to);
        matchDate =
          tourStart >= start.setHours(0, 0, 0, 0) &&
          tourEnd <= end.setHours(23, 59, 59, 999);
      }

      return matchOrigin && matchDestination && matchDate;
    });

    onSearch(filtered);
  };

  const handleFilter = () => {
    const query = {};
    if (origin) query.origin = origin;
    if (destination) query.destination = destination;
    if (dateRange.from)
      query.startDate = new Date(dateRange.from).toISOString();
    if (dateRange.to) query.endDate = new Date(dateRange.to).toISOString();

    router.replace({ pathname: "/", query }, undefined, { shallow: true });

    applyFilter(origin, destination, dateRange);
  };

  useEffect(() => {
    const { origin, destination, startDate, endDate } = router.query;

    if (origin) setOrigin(origin);
    if (destination) setDestination(destination);
    if (startDate || endDate)
      setDateRange({
        from: startDate || null,
        to: endDate || null,
      });

    if (origin || destination || startDate || endDate) {
      applyFilter(origin || "", destination || "", {
        from: startDate || null,
        to: endDate || null,
      });
    } else {
      onSearch(tours);
    }
  }, [router.query]);

  return (
    <div className={styles.SearchBar}>
      <div className={styles.SearchBar__box}>
        <div className={styles.inputGroup}>
          <Image
            src="/icons/location.svg"
            alt="مبدأ"
            width={40}
            height={40}
            className={styles.icon}
          />
          <CustomSelect
            options={origins}
            value={origin}
            onChange={setOrigin}
            placeholder="مبدا"
          />
        </div>

        <div className={styles.inputGroup}>
          <Image
            src="/icons/global-search.svg"
            alt="مقصد"
            width={40}
            height={40}
            className={styles.icon}
          />
          <CustomSelect
            options={destinations}
            value={destination}
            onChange={setDestination}
            placeholder="مقصد"
          />
        </div>

        <div className={`${styles.inputGroup} ${styles.dateGroup}`}>
          <Image
            src="/icons/calendar.svg"
            alt="تاریخ"
            width={40}
            height={40}
            className={`${styles.icon} ${styles.calendarIcon}`}
          />
          <div className={styles.dateInputWrapper}>
            <DatePicker
              range
              round="x2"
              accentColor="#28A745"
              position="left"
              value={dateRange}
              onChange={(range) => {
                if (
                  dateRange.from === range.from &&
                  dateRange.to === range.to
                ) {
                  setDateRange({ from: null, to: null });
                } else {
                  setDateRange(range);
                }
              }}
            />
            {!dateRange.from && !dateRange.to && (
              <span className={styles.placeholder}>تاریخ</span>
            )}
          </div>
        </div>

        <button onClick={handleFilter}>جستجو</button>
      </div>
    </div>
  );
};

export default SearchBar;
