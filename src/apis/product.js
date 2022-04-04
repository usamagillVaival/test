import server from "./server";

export const getProductById = async (
  id,
  setLoading,
  setProduct,
  setProductPrice
) => {
  try {
    const { data } = await server.get(`/shop/getProduct/${id}`);
    // console.log(data)
    setProduct(data);
    // if (data.category==='Ice Cream -Scoop'){

    // }
    const price = data.price ? data.price : data.regularPrice;
    setProductPrice(price);
    setLoading(false);
  } catch (e) {
    console.log(e);
  }
};
