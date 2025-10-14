import { useUserTransactions } from "@/hooks/useUser";
import styles from "./TransactionsTabPage.module.css";
import { toFarsiNumberWithSeparator, toJalaliDate } from "@/utils/helper";
import Loader from "@/components/common/Loader/Loader";

const TransactionsTabPage = () => {
  const { data: transactions = [], isLoading, isError } = useUserTransactions();

  if (isLoading) return <Loader />;

  if (isError)
    return <p className={styles.error}>خطا در دریافت اطلاعات تراکنش‌ها</p>;

  if (transactions.length === 0)
    return <p className={styles.empty}>هیچ تراکنشی یافت نشد.</p>;

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>تاریخ و ساعت</th>
            <th>مبلغ (تومان)</th>
            <th>نوع تراکنش</th>
            <th>شماره سفارش</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{toJalaliDate(item.createdAt)}</td>
              <td>{toFarsiNumberWithSeparator(item.amount)}</td>
              <td>ثبت نام در تور گردشگری</td>
              <td>سفارش {item.id.slice(0, 6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTabPage;
