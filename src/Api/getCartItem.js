export const fetchCartItem = async (cart_id,book_id) => {
    const response = await fetch(`http://127.0.0.1:5000/api/cartitems/${cart_id}/${book_id}`);
    if (!response.ok) {
      throw new Error("Tai that bai");
    }
    const data = await response.json();
    return data;
  };
  