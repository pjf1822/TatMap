const url = "https://server-mapbox.onrender.com";
// const url = "http://localhost:8000";

const fetchAddresses = async () => {
  try {
    const res = await fetch(`${url}/api/addresses/getall`);

    if (!res.ok) {
      throw new Error("Failed to fetch addresses");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching the transactionss:", error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};

const createAddress = async (payload) => {
  try {
    const res = await fetch(`${url}/api/addresses/create`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const deleteAddress = async (id) => {
  try {
    const res = await fetch(
      `https://server-mapbox.onrender.com/api/addresses/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete address");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error so it can be handled by the calling code
  }
};

export { fetchAddresses, createAddress, deleteAddress };
