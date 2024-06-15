import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // use a reverse geocoding API to get a description of the user's address, so can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // return an object with the data that is interested in
  // payload of fulfilled state
  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action) {
      state.userName = action.payload;
    },
    logout(state) {
      (state.userName = ""),
        (state.address = ""),
        (state.error = ""),
        (state.position = {}),
        (state.status = "idle");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.error = "";
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address.Make sure to fill this field!";
      });
  },
});

export const { setName, logout } = userSlice.actions;

export const getUserName = (store) => store.user.userName;

export default userSlice.reducer;
