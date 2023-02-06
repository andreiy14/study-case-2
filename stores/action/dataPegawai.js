import axios from "axios";
export const SET_LOADING = "datapegawai/SET_LOADING";
export const SET_SUCCESS = "datapegawai/SET_SUCCESS";
export const SET_PAYLOAD = "datapegawai/SET_PAYLOAD";
export const SET_DATA_PROVINSI = "datapegawai/SET_DATA_PROVINSI";
export const SET_DATA_KOTA = "datapegawai/SET_DATA_KOTA";
export const SET_DATA_RIWAYAT = "datapegawai/SET_DATA_RIWAYAT";
export const SET_DATA_SERTIFIKASI = "datapegawai/SET_DATA_SERTIFIKASI";
export const INIT_DATA = "datapegawai/INIT_DATA";
export const SET_DATA_TEMP_RIWAYAT = "datapegawai/SET_DATA_TEMP_RIWAYAT";
export const SET_DATA_TEMP_SERTFIKASI = "datapegawai/SET_DATA_TEMP_RIWAYAT";
export const SET_PAYLOAD_EDIT = "datapegawai/SET_PAYLOAD_EDIT";

export const setDataTempEditRiwayat = (payload) => ({
  type: SET_DATA_TEMP_RIWAYAT,
  payload,
});
export const setDataTempEditSertifikasi = (payload) => ({
  type: SET_DATA_TEMP_SERTFIKASI,
  payload,
});
export const setDataProvinsi = (payload) => ({
  type: SET_DATA_PROVINSI,
  payload,
});
export const setDataKota = (payload) => ({
  type: SET_DATA_KOTA,
  payload,
});
export const setDataRiwayat = (payload) => ({
  type: SET_DATA_RIWAYAT,
  payload,
});
export const setDataSertifikasi = (payload) => ({
  type: SET_DATA_SERTIFIKASI,
  payload,
});
export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
export const setSuccessConfirmation = (payload) => ({
  type: SET_SUCCESS,
  payload,
});
export const setDataPayload = (payload) => ({
  type: SET_PAYLOAD,
  payload,
});
export const setDataPayloadEdit = (payload) => ({
  type: SET_PAYLOAD_EDIT,
  payload,
});

export const handleGetProvinsi = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "https://klinikme-test-api.herokuapp.com/api/v1/data_provinsi"
    );

    dispatch(setLoading(false));

    if (response.status === 200) {
      dispatch(setDataProvinsi(response.data?.data));
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};
export const handleGetKota = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      "https://klinikme-test-api.herokuapp.com/api/v1/data_kota/"
    );

    dispatch(setLoading(false));

    if (response.status === 200) {
      dispatch(setDataKota(response.data?.data));
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};
export const handleKirim = (payload, token) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const payloads = {
      Data: payload,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      "https://permata-test-api.herokuapp.com/api/v1/daftar_pegawai",
      payloads,
      config
    );

    dispatch(setLoading(false));

    if (response.status === 200) {
      dispatch(setSuccessConfirmation(true));
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
};
