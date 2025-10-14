import TourDetailPage from "@/components/templates/TourDetailPage/TourDetailPage";
import { getTourById } from "@/services/tours";

const TourDetails = ({ tour }) => {
  return <TourDetailPage tour={tour} />;
};

export default TourDetails;

export async function getServerSideProps(context) {
  try {
    const { tourId } = context.params;
    const tour = await getTourById(tourId);
    return {
      props: { tour },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
