import {
  SET_DATA_PROVINSI,
  SET_LOADING,
  INIT_DATA,
  SET_SUCCESS,
  SET_DATA_KOTA,
  SET_DATA_RIWAYAT,
  SET_DATA_SERTIFIKASI,
  SET_DATA_TEMP_RIWAYAT,
  SET_DATA_TEMP_SERTFIKASI,
  SET_PAYLOAD,
  SET_PAYLOAD_EDIT,
} from "../action/dataPegawai";

const initialState = {
  isLoading: false,
  isSuccess: false,
  dataProvinsi: [],
  dataKota: [],
  dataRiwayat: [],
  dataSertifikasi: [],
  dataRiwayatEdit: {},
  dataSertifikasiEdit: {},
  dataPayload: [],
  dataPayloadEdit: {},
};

const dataPegawai = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case INIT_DATA:
      return {
        ...initialState,
      };

    case SET_DATA_PROVINSI:
      return {
        ...state,
        dataProvinsi: payload,
      };
    case SET_DATA_KOTA:
      return {
        ...state,
        dataKota: payload,
      };
    case SET_DATA_SERTIFIKASI:
      return {
        ...state,
        dataSertifikasi: payload,
      };
    case SET_DATA_RIWAYAT:
      return {
        ...state,
        dataRiwayat: payload,
      };
    case SET_DATA_TEMP_RIWAYAT:
      return {
        ...state,
        dataRiwayatEdit: payload,
      };
    case SET_DATA_TEMP_SERTFIKASI:
      return {
        ...state,
        dataSertifikasiEdit: payload,
      };
    case SET_SUCCESS:
      return {
        ...state,
        isSuccess: payload,
      };
    case SET_PAYLOAD:
      return {
        ...state,
        dataPayload: payload,
      };
    case SET_PAYLOAD_EDIT:
      return {
        ...state,
        dataPayloadEdit: payload,
      };
    default:
      return state;
  }
};
export default dataPegawai;
