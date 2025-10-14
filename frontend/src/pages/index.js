import HomePage from "@/components/templates/HomePage/HomePage";
import { getTours } from "@/services/tours";

const index = ({ tours }) => {
  return <HomePage tours={tours} />;
};

export default index;

export async function getServerSideProps({ query }) {
  try {
    const tours = await getTours(query);
    return { props: { tours } };
  } catch (error) {
    console.error(error);
    return { props: { tours: [] } };
  }
}
