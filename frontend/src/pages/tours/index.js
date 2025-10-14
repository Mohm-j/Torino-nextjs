import ToursPage from "@/components/templates/ToursPage/ToursPage";
import { getTours } from "@/services/tours";

const Tours = ({ tours }) => {
  return <ToursPage tours={tours} />;
};

export default Tours;

export async function getServerSideProps() {
  try {
    const tours = await getTours();
    return {
      props: { tours },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { tours: [] },
    };
  }
}
