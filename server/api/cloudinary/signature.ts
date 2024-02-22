import { v2 as cloudinary } from "cloudinary";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: query.timestamp,
      public_id: query.public_id,
    },
    process.env.CLOUDINARY_API_SECRET!
  );
  
  return signature;
});
