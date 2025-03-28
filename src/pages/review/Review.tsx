import { useParams } from 'react-router-dom';

const Review = () => {
  const { slug } = useParams();
  return <div className="wapper">review {slug}</div>;
};

export default Review;
