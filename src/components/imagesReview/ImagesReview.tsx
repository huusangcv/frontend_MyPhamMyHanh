import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

interface QuiltedImageListProps {
  imagesReviews: string[];
}

export default function ImagesReview({ imagesReviews }: QuiltedImageListProps) {
  return (
    <ImageList
      sx={{ maxWidth: "100%" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {imagesReviews.map((imagesReview, index) => (
        <ImageListItem
          key={index}
          cols={(index === 0 && 2) || 1}
          rows={(index === 0 && 2) || 1}
        >
          <img
            src={`http://localhost:8080${imagesReview}`}
            alt="s"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
