export const getConnectionString = () => {
  const isProduction = process.env.NODE_ENV === "production"

  return isProduction
    ? `${process.env.POSTGRES_URL}?ssl=true`
    : process.env.DEV_POSTGRES_URL!
}
